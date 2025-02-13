"use client";

import { api } from "@/trpc/react";
import { ProductCard } from "./product-card";
import LoadingSkeleton from "../ui/loading-skeleton";

export default function ProductsGrid() {
  const { data: products, isLoading } = api.product.getAll.useQuery();

  if (isLoading) return <LoadingSkeleton />;

  return (
    <div className="container py-8">
      <h2 className="mb-8 text-2xl font-bold text-brand-black">Popular Products</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products?.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            imageUrl={product.imageUrl}
            category={product.category.name}
          />
        ))}
      </div>
    </div>
  );
}
