import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const productRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.product.findMany({
      include: {
        category: true,
      },
    });
  }),

  //prettier-ignore
  getByCategory: publicProcedure
    .input(z.string())
    .query(async({ctx, input}) => {
      return await ctx.db.product.findMany({
        where: {
          category: {
            name: input,
          }
        },
        include: {
          category: true,
        }
      })
    }),
});
