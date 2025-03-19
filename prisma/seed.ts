import { db } from "./db";

// define products with their corresponding images
const productsData = {
  Fruits: [
    { name: "Apple", image: "https://images.unsplash.com/photo-1606757389723-23c4bf501fba?q=80&w=500" },
    { name: "Banana", image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=500&q=80" },
    { name: "Orange", image: "https://images.unsplash.com/photo-1643996322171-7a94b7acc9a7?q=80&w=500" },
    { name: "Mango", image: "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=500&q=80" },
  ],
  Vegetables: [
    {
      name: "Carrot",
      image:
        "https://images.unsplash.com/photo-1633380110125-f6e685676160?q=80&w=500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    { name: "Broccoli", image: "https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c?w=500&q=80" },
    { name: "Tomato", image: "https://images.unsplash.com/photo-1561136594-7f68413baa99?q=80&w=500" },
    { name: "Potato", image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=500&q=80" },
  ],
  Dairy: [
    { name: "Milk", image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=500&q=80" },
    { name: "Cheese", image: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=500&q=80" },
    { name: "Yogurt", image: "https://images.unsplash.com/photo-1604095853918-1a1823a63dd5?q=80&w=500" },
    { name: "Butter", image: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=500&q=80" },
  ],
  Meat: [
    { name: "Chicken", image: "https://images.unsplash.com/photo-1587593810167-a84920ea0781?q=80&w=500" },
    { name: "Beef", image: "https://images.unsplash.com/photo-1690983322025-aab4f95a0269?w=500&q=80" },
    {
      name: "Fish",
      image:
        "https://images.unsplash.com/photo-1498654200943-1088dd4438ae?q=80&w=500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Lamb",
      image:
        "https://images.unsplash.com/photo-1588347818036-558601350947?q=80&w=500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ],
  Bakery: [
    { name: "Bread", image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&q=80" },
    { name: "Croissant", image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=500&q=80" },
    { name: "Muffin", image: "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=500&q=80" },
    { name: "Bagel", image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=500&q=80" },
  ],
};

const productDescriptions = {
  Fruits: "Fresh and juicy, picked at peak ripeness for the best flavor and nutrition.",
  Vegetables: "Farm-fresh vegetables, locally sourced when possible, perfect for healthy meals.",
  Dairy: "High-quality dairy products from trusted local farms.",
  Meat: "Premium quality meat, carefully selected and properly stored for the best taste.",
  Bakery: "Freshly baked goods made daily with premium ingredients.",
};

async function main() {
  console.log("seeding database...");

  // clear existing data
  await db.product.deleteMany();
  await db.category.deleteMany();

  // create categories and their products
  for (const [categoryName, products] of Object.entries(productsData)) {
    // create category
    const category = await db.category.create({
      data: {
        name: categoryName,
        description:
          productDescriptions[categoryName as keyof typeof productDescriptions] || `${categoryName} products`,
      },
    });

    // create products for this category
    for (const product of products) {
      await db.product.create({
        data: {
          name: product.name,
          description: `Fresh ${product.name.toLowerCase()} from trusted suppliers. ${
            productDescriptions[categoryName as keyof typeof productDescriptions]
          }`,
          price: Number((Math.random() * (20 - 2) + 2).toFixed(2)), 
          imageUrl: product.image,
          categoryId: category.id,
          stock: Math.floor(Math.random() * (100 - 10) + 10), 
        },
      });
    }
  }

  console.log("seeding completed");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
