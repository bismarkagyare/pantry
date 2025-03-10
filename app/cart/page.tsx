"use client";

import { useCart } from "@/contexts/cart-context";
import Image from "next/image";
import { X, Plus, Minus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const router = useRouter()
  const { items, removeItem, updateQuantity, getCartTotal } = useCart();

  if (items.length === 0) {
    return (
      <div className="container py-8 md:py-16 text-center">
        <h1 className="mb-4 text-xl md:text-2xl font-bold">Your cart is empty</h1>
        <p className="mb-8 text-brand-grey">Add some items to your cart to see them here</p>
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
      <h1 className="mb-4 md:mb-8 text-xl md:text-2xl font-bold">Shopping Cart</h1>
      <div className="grid gap-6 lg:gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
            {/* Header - Hidden on mobile */}
            <div className="hidden md:grid grid-cols-12 border-b border-gray-200 py-4 px-6 text-sm font-medium text-gray-600">
              <div className="col-span-6">Products</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-right">Subtotal</div>
            </div>

            {/* Items */}
            <div className="divide-y divide-gray-200">
              {items.map((item) => (
                <div key={item.id} className="relative">
                  {/* Mobile Layout */}
                  <div className="md:hidden p-4">
                    <div className="flex gap-4">
                      {/* Product Image & Remove Button */}
                      <div className="relative">
                        <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <Image src={item.imageUrl} alt={item.name} fill className="object-cover object-center" />
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="absolute -left-2 -top-2 rounded-full bg-white p-1 text-gray-400 shadow-md transition-colors hover:bg-gray-100 hover:text-gray-600"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>

                      {/* Product Details */}
                      <div className="flex flex-1 flex-col">
                        <h3 className="text-sm font-medium text-gray-700">{item.name}</h3>
                        <div className="mt-1 text-sm text-gray-500">${item.price.toFixed(2)}</div>

                        {/* Quantity Controls */}
                        <div className="mt-2">
                          <div className="inline-flex items-center rounded-md border border-gray-200">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="px-3 py-1 text-gray-600 transition-colors hover:bg-gray-50 disabled:text-gray-400"
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="w-10 border-x border-gray-200 py-1 text-center text-sm">
                              {item.quantity.toString().padStart(2, "0")}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="px-3 py-1 text-gray-600 transition-colors hover:bg-gray-50"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                        </div>

                        {/* Subtotal */}
                        <div className="mt-2 text-sm font-medium text-gray-900">
                          Subtotal: ${(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Desktop Layout */}
                  <div className="hidden md:grid grid-cols-12 items-center py-6 px-6">
                    {/* Remove Button */}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                    >
                      <X className="h-4 w-4" />
                    </button>

                    {/* Product Info */}
                    <div className="col-span-6 flex items-center gap-4 pl-4">
                      <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <Image src={item.imageUrl} alt={item.name} fill className="object-cover object-center" />
                      </div>
                      <h3 className="text-sm font-medium text-gray-700">{item.name}</h3>
                    </div>

                    {/* Price */}
                    <div className="col-span-2 text-center text-sm text-gray-700">${item.price.toFixed(2)}</div>

                    {/* Quantity Controls */}
                    <div className="col-span-2 flex justify-center">
                      <div className="flex items-center rounded-md border border-gray-200">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-3 py-1 text-gray-600 transition-colors hover:bg-gray-50 disabled:text-gray-400"
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-10 border-x border-gray-200 py-1 text-center text-sm">
                          {item.quantity.toString().padStart(2, "0")}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-3 py-1 text-gray-600 transition-colors hover:bg-gray-50"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </div>

                    {/* Subtotal */}
                    <div className="col-span-2 text-right text-sm font-medium text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-4">
          <div className="rounded-lg border border-gray-200 bg-white p-4 md:p-6 shadow-sm">
            <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                <span className="text-base text-gray-600">Total</span>
                <span className="text-base font-medium text-gray-900">${getCartTotal().toFixed(2)}</span>
              </div>
              <button
                onClick={() => router.push("/checkout")}
                className="w-full rounded-md bg-brand-green py-3 text-sm font-medium text-white transition-colors hover:bg-brand-green/90"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
