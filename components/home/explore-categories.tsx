import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { peachImage, vegetableImage, strawberryImage, appleImage, potatoImage, carrotImage } from "@/assets";

type Category = {
  name: string;
  itemCount: string;
  bgColor: string;
  image: StaticImageData;
};

const categories: Category[] = [
  {
    name: "Fruits",
    itemCount: "20 items",
    bgColor: "bg-[#FEEFEA]",
    image: peachImage,
  },
  {
    name: "Vegetables",
    itemCount: "220 items",
    bgColor: "bg-[#FFF3FF]",
    image: vegetableImage,
  },
  {
    name: "Diary",
    itemCount: "40 items",
    bgColor: "bg-[#F2FCE4]",
    image: strawberryImage,
  },
  {
    name: "Meat",
    itemCount: "30 items",
    bgColor: "bg-[#FEEFEA]",
    image: appleImage,
  },
  {
    name: "Bakery",
    itemCount: "15 items",
    bgColor: "bg-[#FFFCEB]",
    image: potatoImage,
  },
  {
    name: "Beverages",
    itemCount: "25 items",
    bgColor: "bg-[#DEF9EC]",
    image: carrotImage,
  },
];

export function ExploreCategories() {
  return (
    <div className="container py-16">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold text-brand-black whitespace-nowrap">Explore Categories</h2>
        <nav role="navigation" className="flex flex-wrap items-center gap-4 sm:gap-6">
          <Link href="/category/all" className="text-brand-green">
            All
          </Link>
          {categories.map((category) => (
            <div key={category.name} className="text-brand-black cursor-pointer font-medium hover:text-brand-green">
              {category.name}
            </div>
          ))}
        </nav>
      </div>

      <div role="grid" className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        {categories.map((category) => (
          <Link
            key={category.name}
            href={`/category/${category.name.toLowerCase()}`}
            className={`group flex flex-col items-center rounded-lg ${category.bgColor} p-6 transition-transform hover:scale-105`}
          >
            <div className="relative h-24 w-24">
              <Image src={category.image} alt={category.name} fill className="object-contain" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-brand-black">{category.name}</h3>
            <p className="text-sm text-brand-grey">{category.itemCount}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
