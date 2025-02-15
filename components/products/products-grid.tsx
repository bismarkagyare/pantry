"use client";

import { api } from "@/trpc/react";
import { ProductCard } from "./product-card";
import LoadingSkeleton from "../ui/loading-skeleton";
import { useSearchParams } from "next/navigation";

export default function ProductsGrid() {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const categoryName = searchParams.get("category");

  const { data: products, isLoading } = api.product.getAll.useQuery();

  if (isLoading) return <LoadingSkeleton />;

  const filteredProducts = products?.filter((product) => {
    const matchesSearch = search ? product.name.toLowerCase().includes(search.toLowerCase()) : true;
    const matchesCategory =
      categoryName && categoryName !== "all"
        ? product.category.name.toLowerCase() === categoryName.toLowerCase()
        : true;
    return matchesSearch && matchesCategory;
  });

  if (!filteredProducts?.length) {
    return (
      <div className="container py-8 text-center">
        <h2 className="text-xl font-medium text-gray-900">No products found</h2>
        <p className="mt-2 text-gray-500">Try adjusting your search or filter to find what you&apos;re looking for.</p>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <h2 className="mb-8 text-2xl font-bold text-brand-black">
        {search ? `Search Results for "${search}"` : "Popular Products"}
      </h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredProducts?.map((product) => (
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
