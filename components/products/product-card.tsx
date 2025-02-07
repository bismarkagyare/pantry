"use client";

import Image from "next/image";
import { Star, ShoppingCart } from "lucide-react";

interface ProductCardProps {
  name: string;
  price: number;
  oldPrice?: number;
  imageUrl: string;
  category: string;
  rating?: number;
  vendor?: string;
}

export function ProductCard({
  name,
  price,
  oldPrice,
  imageUrl,
  category,
  rating = 4,
  vendor = "Mr.food",
}: ProductCardProps) {
  return (
    <div className="group rounded-lg border p-4 transition-all hover:shadow-lg">
      <div className="relative mb-3">
        <div className="relative h-48 w-full">
          <Image src={imageUrl} alt={name} fill className="object-contain" />
        </div>
        <button className="absolute right-2 top-2 rounded-full bg-white p-2 opacity-0 shadow-md transition-opacity group-hover:opacity-100">
          <Star className="h-5 w-5 text-brand-grey" />
        </button>
      </div>

      <div className="space-y-2">
        <p className="text-sm text-brand-grey">{category}</p>
        <h3 className="font-semibold text-brand-black">{name}</h3>
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={`h-4 w-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
          ))}
          <span className="text-sm text-brand-grey">({rating})</span>
        </div>
        <p className="text-sm text-brand-grey">By {vendor}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-brand-green">${price.toFixed(2)}</span>
            {oldPrice && <span className="text-sm text-brand-grey line-through">${oldPrice.toFixed(2)}</span>}
          </div>
          <button className="flex items-center gap-2 rounded-md bg-brand-lightGreen px-4 py-2 text-brand-green transition-colors hover:bg-brand-green hover:text-white">
            <ShoppingCart className="h-4 w-4" />
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
