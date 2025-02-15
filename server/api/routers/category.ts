import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const categoryRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const categories = await ctx.db.category.findMany({
      orderBy: { name: "asc" },
      select: {
        id: true,
        name: true,
      },
    });

    // create a mapping of names to IDs
    const categoryMap = Object.fromEntries(categories.map((cat) => [cat.name.toLowerCase(), cat.id]));

    //console.log("Category Map", categoryMap)

    return {
      categories,
      categoryMap,
    };
  }),
});
