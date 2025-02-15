"use client";

import { useWishlist } from "@/contexts/wishlist-context";
import { useCart } from "@/contexts/cart-context";
import Image from "next/image";
import { X, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { toast } from "react-toastify";

export default function WishlistPage() {
  const { items, removeItem } = useWishlist();
  const { addItem: addToCart, isInCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="container py-8 md:py-16 text-center">
        <h1 className="mb-4 text-xl md:text-2xl font-bold">Your wishlist is empty</h1>
        <p className="mb-8 text-brand-grey">Add items to your wishlist to save them for later</p>
        <Link
          href="/"
          className="inline-block rounded-md bg-brand-green px-6 py-2 text-white transition-colors hover:bg-brand-green/90"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container max-w-[1200px] py-6 md:py-16">
      <h1 className="mb-4 md:mb-8 text-xl md:text-2xl font-bold">Wishlist</h1>
      <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
        {/* Header - Hidden on mobile */}
        <div className="hidden md:grid md:grid-cols-12 border-b border-gray-200 py-4 px-6 text-sm font-medium text-gray-600">
          <div className="md:col-span-6">Products</div>
          <div className="md:col-span-2 text-center">Price</div>
          <div className="md:col-span-2 text-center">Stock Status</div>
          <div className="md:col-span-2 text-right">Actions</div>
        </div>

        <div className="divide-y divide-gray-200">
          {items.map((item) => (
            <div key={item.id} className="flex flex-col md:grid md:grid-cols-12 gap-4 p-4 md:p-6">
              {/* Product Info - Full width on mobile */}
              <div className="flex items-start md:items-center gap-4 md:col-span-6">
                <button
                  onClick={() => {
                    removeItem(item.id);
                    toast.success(`${item.name} removed from wishlist`);
                  }}
                  className="rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                >
                  <X className="h-4 w-4" />
                </button>
                <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                  <Image src={item.imageUrl} alt={item.name} fill className="object-cover object-center" />
                </div>
                <h3 className="font-medium text-gray-700">{item.name}</h3>
              </div>

              {/* Mobile Layout - Price and Stock Status in a row */}
              <div className="flex justify-between items-center md:hidden">
                <div className="text-gray-700">
                  <span className="text-sm text-gray-500 mr-2">Price:</span>${item.price.toFixed(2)}
                </div>
                <span className="inline-block rounded-md bg-green-100 px-3 py-1 text-sm text-green-800">
                  In Stock
                </span>
              </div>

              {/* Desktop Layout - Price and Stock Status in columns */}
              <div className="hidden md:block md:col-span-2 text-center text-gray-700">${item.price.toFixed(2)}</div>

              <div className="hidden md:block md:col-span-2 text-center">
                <span className="inline-block rounded-md bg-green-100 px-3 py-1 text-sm text-green-800">
                  In Stock
                </span>
              </div>

              {/* Add to Cart Button - Full width on mobile */}
              <div className="md:col-span-2 md:text-right">
                <button
                  onClick={() => {
                    addToCart({ id: item.id, name: item.name, price: item.price, imageUrl: item.imageUrl });
                    removeItem(item.id);
                    toast.success(`${item.name} added to cart`);
                  }}
                  disabled={isInCart(item.id)}
                  className="w-full md:w-auto rounded-md bg-brand-green px-4 py-2 text-sm text-white transition-colors hover:bg-brand-green/90 disabled:bg-gray-200"
                >
                  <span className="flex items-center justify-center md:justify-start gap-2">
                    <ShoppingCart className="h-4 w-4" />
                    {isInCart(item.id) ? "In Cart" : "Add to Cart"}
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
