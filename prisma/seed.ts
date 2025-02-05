import { faker } from "@faker-js/faker";
import { db } from "./db";

async function main() {
  console.log("seeding database...");

  // Clear existing products first
  await db.product.deleteMany({});

  const categories = ["Fruits", "Vegetables", "Diary", "Bakery", "Meat", "Snacks", "Beverages"];
  for (const categoryName of categories) {
    await db.category.upsert({
      where: { name: categoryName },
      update: {},
      create: {
        name: categoryName,
        description: `${categoryName} category for our category store`,
      },
    });
  }

  //fetch all categories
  const allCategories = await db.category.findMany();

  // Define grocery items per category
  const categoryItems = {
    Fruits: ["Apple", "Banana", "Orange", "Mango", "Strawberry", "Grapes", "Pear"],
    Vegetables: ["Carrot", "Broccoli", "Spinach", "Tomato", "Potato", "Onion"],
    Diary: ["Milk", "Cheese", "Yogurt", "Butter", "Cream", "Eggs"],
    Bakery: ["Bread", "Croissant", "Muffin", "Bagel", "Cookie", "Cake"],
    Meat: ["Chicken", "Beef", "Pork", "Fish", "Lamb", "Turkey"],
    Snacks: ["Chips", "Popcorn", "Nuts", "Pretzels", "Crackers", "Trail Mix"],
    Beverages: ["Water", "Soda", "Coffee", "Tea", "Juice", "Energy Drink"],
  };

  //generate products with valid data
  const products = Array.from({ length: 20 }, () => {
    const category = faker.helpers.arrayElement(allCategories);
    const items = categoryItems[category.name as keyof typeof categoryItems];

    return {
      name: faker.helpers.arrayElement(items),
      description: faker.commerce.productDescription(),
      price: parseFloat(faker.commerce.price({ min: 1, max: 100, dec: 2 })),
      imageUrl: faker.image.urlLoremFlickr({ category: "food" }),
      categoryId: category.id,
      stock: faker.number.int({ min: 10, max: 100 }),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  });

  await db.product.createMany({
    data: products,
  });

  // Add this to verify the relationships
  // const productsWithCategories = await db.product.findMany({
  //   include: {
  //     category: true,
  //   },
  // });

  // console.log("Products with their categories:");
  // productsWithCategories.forEach((product) => {
  //   console.log(`${product.name} -> ${product.category.name}`);
  // });

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
