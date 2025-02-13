"use client";

import { useCart } from "@/contexts/cart-context";
import Image from "next/image";
import { Trash2, Plus, Minus } from "lucide-react";
import Link from "next/link";

export default function CartPage() {
  const { items, removeItem, updateQuantity, getCartTotal } = useCart();

  if (items.length === 0) {
    return (
      <div className="container py-16 text-center">
        <h1 className="mb-4 text-2xl font-bold">Your cart is empty</h1>
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
    <div className="container py-16">
      <h1 className="mb-8 text-2xl font-bold">Shopping Cart</h1>
      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <div className="hidden md:grid md:grid-cols-12 mb-4 text-sm text-brand-grey">
            <div className="md:col-span-6">Product</div>
            <div className="md:col-span-2 text-center">Quantity</div>
            <div className="md:col-span-2 text-center">Price</div>
            <div className="md:col-span-2 text-right">Total</div>
          </div>
          {items.map((item) => (
            <div key={item.id} className="mb-4 rounded-lg border p-4">
              <div className="grid md:grid-cols-12 gap-4 items-center">
                <div className="md:col-span-6 flex items-center gap-4">
                  <div className="relative h-24 w-24 flex-shrink-0">
                    <Image src={item.imageUrl} alt={item.name} fill className="object-contain" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-sm text-red-500 hover:text-red-600 flex items-center gap-1 mt-1"
                    >
                      <Trash2 className="h-4 w-4" />
                      Remove
                    </button>
                  </div>
                </div>

                <div className="md:col-span-2 flex justify-center">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="rounded-full p-1 hover:bg-gray-100"
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="rounded-full p-1 hover:bg-gray-100"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="md:col-span-2 text-center">${item.price.toFixed(2)}</div>

                <div className="md:col-span-2 text-right font-medium">${(item.price * item.quantity).toFixed(2)}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="lg:col-span-4">
          <div className="rounded-lg border p-6 sticky top-4">
            <h2 className="mb-4 text-lg font-semibold">Order Summary</h2>
            <div className="mb-4 flex justify-between border-b pb-4">
              <span>Subtotal</span>
              <span className="font-medium">${getCartTotal().toFixed(2)}</span>
            </div>
            <button className="w-full rounded-md bg-brand-green py-2 text-white transition-colors hover:bg-brand-green/90">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
