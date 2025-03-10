import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { db } from "@/server/db";
import { env } from "@/env";
import Stripe from "stripe";

// this is your stripe webhook secret for testing your endpoint locally.
const webhookSecret = env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const headersList = await headers();
    const signature = headersList.get("stripe-signature") as string;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      const error = err as Error;
      console.error(`⚠️  Webhook signature verification failed.`, error.message);
      return new Response(`Webhook Error: ${error.message}`, { status: 400 });
    }

    // handle the event
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;

        // update the order
        if (session.metadata?.orderId) {
          await db.order.update({
            where: { id: session.metadata.orderId },
            data: {
              status: "confirmed",
              paymentStatus: "paid",
            },
          });
        }
        break;
      }

      case "payment_intent.payment_failed": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;

        // find order by payment intent and update status
        const order = await db.order.findFirst({
          where: { paymentIntentId: paymentIntent.id },
        });

        if (order) {
          await db.order.update({
            where: { id: order.id },
            data: {
              status: "failed",
              paymentStatus: "failed",
            },
          });
        }
        break;
      }

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    return new Response(null, { status: 200 });
  } catch (err) {
    const error = err as Error;
    console.error("Webhook error:", error.message);
    return new Response(`Webhook Error: ${error.message}`, { status: 400 });
  }
}
