import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { stripe } from "@/lib/stripe";
import { TRPCError } from "@trpc/server";

const lineItemSchema = z.object({
  productId: z.string(),
  quantity: z.number(),
  price: z.number(),
});

export const paymentRouter = createTRPCRouter({
  createCheckoutSession: publicProcedure
    .input(
      z.object({
        lineItems: z.array(lineItemSchema),
        userId: z.string(),
        email: z.string().email(),
        totalAmount: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        // first, ensure user exists in our database
        let user = await ctx.db.user.findUnique({
          where: { clerkUserId: input.userId },
        });

        // if user doesn't exist, create them
        if (!user) {
          user = await ctx.db.user.create({
            data: {
              clerkUserId: input.userId,
              email: input.email,
            },
          });
        }

        // create order in database using the user's database ID
        const order = await ctx.db.order.create({
          data: {
            userId: user.id, // Use the database user ID, not the Clerk ID
            items: input.lineItems,
            total: input.totalAmount,
            status: "pending",
            paymentStatus: "pending",
          },
        });

        // create Stripe checkout session
        const session = await stripe.checkout.sessions.create({
          line_items: input.lineItems.map((item) => ({
            price_data: {
              currency: "usd",
              product_data: {
                name: item.productId, // you might want to fetch product name from database
              },
              unit_amount: Math.round(item.price * 100), // converts to cents
            },
            quantity: item.quantity,
          })),
          mode: "payment",
          success_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/cancel`,
          customer_email: input.email,
          metadata: {
            orderId: order.id,
            userId: user.id, // Use the database user ID in metadata
          },
        });

        // update order with payment intent ID
        await ctx.db.order.update({
          where: { id: order.id },
          data: { paymentIntentId: session.payment_intent as string },
        });

        return { url: session.url };
      } catch (error) {
        console.error("Checkout session creation failed:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create checkout session",
        });
      }
    }),
});
