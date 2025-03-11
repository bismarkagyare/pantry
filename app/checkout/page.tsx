"use client";

import { useCart } from "@/contexts/cart-context";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { toast } from "react-toastify";
import Image from "next/image";
import { Lock, ShieldCheck, Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CheckoutPage() {
  const { items, getCartTotal } = useCart();
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);

  //create checkout mutation
  const createCheckoutSession = api.payment.createCheckoutSession.useMutation({
    onSuccess: (data) => {
      //redirect to stripe checkout
      window.location.href = data.url as string;
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to create checkout session");
      setIsProcessing(false);
    },
  });

  const handleCheckout = async () => {
    if (!user) {
      toast.error("Please login to continue");
      router.push("/sign-in");
      return;
    }

    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    setIsProcessing(true);

    //create line items for stripe
    const lineItems = items.map((item) => ({
      productId: item.id,
      quantity: item.quantity,
      price: item.price,
      name: item.name,
    }));

    //create checkout session
    createCheckoutSession.mutate({
      lineItems,
      userId: user.id,
      email: user.primaryEmailAddress?.emailAddress as string,
      totalAmount: getCartTotal(),
    });
  };

  if (!isLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-brand-green border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto max-w-7xl px-4 py-8">
        {/* Back to Cart Link */}
        <Link href="/cart" className="mb-6 inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
          <ArrowLeft className="h-4 w-4" />
          Back to Cart
        </Link>

        <div className="grid gap-8 lg:grid-cols-12">
          {/* Left Column - Order Details */}
          <div className="lg:col-span-8">
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h1 className="mb-6 text-2xl font-bold text-gray-900">Checkout</h1>

              {/* Order Items */}
              <div className="divide-y divide-gray-200">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 py-4">
                    {/* Product Image */}
                    <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border bg-gray-50">
                      <Image src={item.imageUrl} alt={item.name} fill className="object-cover object-center" />
                    </div>

                    {/* Product Details */}
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900">{item.name}</h3>
                        <p className="mt-1 text-sm text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-sm font-medium text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Trust Badges */}
              <div className="mt-8 grid grid-cols-1 gap-4 border-t border-gray-200 pt-8 sm:grid-cols-3">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-brand-lightGreen p-2">
                    <Lock className="h-5 w-5 text-brand-green" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Secure Checkout</h3>
                    <p className="text-xs text-gray-500">Protected by Stripe</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-brand-lightGreen p-2">
                    <ShieldCheck className="h-5 w-5 text-brand-green" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Money-Back Guarantee</h3>
                    <p className="text-xs text-gray-500">30 day return policy</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-brand-lightGreen p-2">
                    <Clock className="h-5 w-5 text-brand-green" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Fast Delivery</h3>
                    <p className="text-xs text-gray-500">2-3 business days</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-4">
            <div className="sticky top-8 rounded-lg bg-white p-6 shadow-sm">
              <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>

              {/* Price Breakdown */}
              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>Subtotal</span>
                  <span>${getCartTotal().toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>Shipping</span>
                  <span className="text-brand-green">Free</span>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-base font-medium text-gray-900">Total</span>
                    <span className="text-xl font-semibold text-brand-green">${getCartTotal().toFixed(2)}</span>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">Including taxes and shipping</p>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                disabled={isProcessing || items.length === 0}
                className="mt-6 w-full rounded-md bg-brand-green py-3 text-white transition-all hover:bg-brand-green/90 disabled:cursor-not-allowed disabled:bg-gray-300"
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    Processing...
                  </div>
                ) : (
                  "Proceed to Payment"
                )}
              </button>

              {/* Payment Methods */}
              <div className="mt-6 flex items-center justify-center gap-2">
                <Image src="/visa.svg" alt="Visa" width={40} height={25} className="h-6 w-auto opacity-75" />
                <Image
                  src="/mastercard.svg"
                  alt="Mastercard"
                  width={40}
                  height={25}
                  className="h-6 w-auto opacity-75"
                />
                <Image
                  src="/amex.svg"
                  alt="American Express"
                  width={40}
                  height={25}
                  className="h-6 w-auto opacity-75"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
