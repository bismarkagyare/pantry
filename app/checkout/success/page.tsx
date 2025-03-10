"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, ShoppingBag, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/contexts/cart-context";
import { motion } from "framer-motion";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const { clearCart } = useCart();
  const [isCleared, setIsCleared] = useState(false);

  useEffect(() => {
    if (!isCleared) {
      clearCart();
      setIsCleared(true);
    }
  }, [clearCart, isCleared]);

  return (
    <div className="min-h-[80vh] bg-gray-50">
      <div className="container mx-auto max-w-3xl px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-lg bg-white p-6 shadow-lg md:p-8"
        >
          {/* Success Icon */}
          <div className="mb-6 flex justify-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
            >
              <CheckCircle2 className="h-16 w-16 text-brand-green md:h-20 md:w-20" />
            </motion.div>
          </div>

          {/* Success Message */}
          <div className="mb-8 text-center">
            <h1 className="mb-3 text-2xl font-bold text-gray-900 md:text-3xl">Payment Successful!</h1>
            <p className="text-gray-600">Thank you for your purchase. Your order has been confirmed.</p>
            {sessionId && <p className="mt-2 text-sm text-gray-500">Order ID: {sessionId.slice(-8).toUpperCase()}</p>}
          </div>

          {/* Divider */}
          <div className="my-8 border-t border-gray-200"></div>

          {/* Next Steps */}
          <div className="mb-8 rounded-lg bg-green-50 p-4">
            <h2 className="mb-3 text-lg font-semibold text-gray-900">What&apos;s Next?</h2>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-brand-green"></div>
                You will receive an order confirmation email shortly
              </li>
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-brand-green"></div>
                Your items will be processed and shipped within 1-3 business days
              </li>
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-brand-green"></div>
                You can track your order status in your account dashboard
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              href="/"
              className="flex flex-1 items-center justify-center gap-2 rounded-md bg-brand-green px-6 py-3 text-white transition-colors hover:bg-brand-green/90"
            >
              <ShoppingBag className="h-5 w-5" />
              Continue Shopping
            </Link>
            <Link
              href="/orders"
              className="flex flex-1 items-center justify-center gap-2 rounded-md border border-gray-300 px-6 py-3 text-gray-700 transition-colors hover:bg-gray-50"
            >
              <ArrowLeft className="h-5 w-5" />
              View Orders
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
