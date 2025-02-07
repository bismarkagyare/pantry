import { faker } from "@faker-js/faker";
import { db } from "./db";

// Define image URLs for each category
const categoryImages = {
  Fruits: [
    "https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?w=500&q=80", // Apple
    "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=500&q=80", // Bananas
    "https://images.unsplash.com/photo-1557800636-894a64c1696f?w=500&q=80", // Oranges
    "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=500&q=80", // Mango
  ],
  Vegetables: [
    "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=500&q=80", // Carrots
    "https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c?w=500&q=80", // Broccoli
    "https://images.unsplash.com/photo-1566842600175-97dca489844f?w=500&q=80", // Tomatoes
    "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=500&q=80", // Potatoes
  ],
  Diary: [
    "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=500&q=80", // Milk
    "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=500&q=80", // Cheese
    "https://images.unsplash.com/photo-1571217668979-f46db8864f75?w=500&q=80", // Yogurt
    "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=500&q=80", // Butter
  ],
  Bakery: [
    "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&q=80", // Bread
    "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=500&q=80", // Croissant
    "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=500&q=80", // Muffins
    "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=500&q=80", // Bagels
  ],
  Meat: [
    "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=500&q=80", // Chicken
    "https://images.unsplash.com/photo-1603048297172-c92544798d1e?w=500&q=80", // Beef
    "https://images.unsplash.com/photo-1602470520998-f4a52199a3d6?w=500&q=80", // Fish
    "https://images.unsplash.com/photo-1615627121117-e3278bc8b1db?w=500&q=80", // Lamb
  ],
  Snacks: [
    "https://images.unsplash.com/photo-1621447504864-d8686e12698c?w=500&q=80", // Chips
    "https://images.unsplash.com/photo-1578020190125-f4f7c18bc9cb?w=500&q=80", // Popcorn
    "https://images.unsplash.com/photo-1536591375667-f9806674a5a5?w=500&q=80", // Nuts
    "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=500&q=80", // Pretzels
  ],
  Beverages: [
    "https://images.unsplash.com/photo-1553531384-cc64ac80f931?w=500&q=80", // Water
    "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=500&q=80", // Coffee
    "https://images.unsplash.com/photo-1544125945-f4d9866f2be5?w=500&q=80", // Tea
    "https://images.unsplash.com/photo-1596803244535-925769f389fc?w=500&q=80", // Juice
  ],
};

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
    const images = categoryImages[category.name as keyof typeof categoryImages];

    return {
      name: faker.helpers.arrayElement(items),
      description: faker.commerce.productDescription(),
      price: parseFloat(faker.commerce.price({ min: 1, max: 100, dec: 2 })),
      imageUrl: faker.helpers.arrayElement(images),
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
