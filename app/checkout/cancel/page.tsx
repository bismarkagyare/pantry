"use client";

import { XCircle, RefreshCcw, ShoppingCart, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function CancelPage() {
  const router = useRouter();

  return (
    <div className="min-h-[80vh] bg-gray-50">
      <div className="container mx-auto max-w-3xl px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-lg bg-white p-6 shadow-lg md:p-8"
        >
          {/* Cancel Icon */}
          <div className="mb-6 flex justify-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
            >
              <XCircle className="h-16 w-16 text-red-500 md:h-20 md:w-20" />
            </motion.div>
          </div>

          {/* Cancel Message */}
          <div className="mb-8 text-center">
            <h1 className="mb-3 text-2xl font-bold text-gray-900 md:text-3xl">Payment Cancelled</h1>
            <p className="text-gray-600">Your payment was cancelled. Don&apos;t worry - your cart is still saved.</p>
          </div>

          {/* Common Issues */}
          <div className="mb-8 rounded-lg bg-gray-50 p-4">
            <h2 className="mb-3 text-lg font-semibold text-gray-900">Common Issues</h2>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-gray-400"></div>
                Payment method declined or insufficient funds
              </li>
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-gray-400"></div>
                Network connection issues during payment
              </li>
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-gray-400"></div>
                Browser session timed out
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-4 sm:flex-row">
            <button
              onClick={() => router.push("/checkout")}
              className="flex flex-1 items-center justify-center gap-2 rounded-md bg-brand-green px-6 py-3 text-white transition-colors hover:bg-brand-green/90"
            >
              <RefreshCcw className="h-5 w-5" />
              Try Again
            </button>
            <Link
              href="/cart"
              className="flex flex-1 items-center justify-center gap-2 rounded-md border border-gray-300 px-6 py-3 text-gray-700 transition-colors hover:bg-gray-50"
            >
              <ShoppingCart className="h-5 w-5" />
              Review Cart
            </Link>
            <Link
              href="/"
              className="flex flex-1 items-center justify-center gap-2 rounded-md border border-gray-300 px-6 py-3 text-gray-700 transition-colors hover:bg-gray-50"
            >
              <ArrowLeft className="h-5 w-5" />
              Continue Shopping
            </Link>
          </div>

          <p className="mt-6 text-center text-sm text-gray-500">
            Need help?{" "}
            <Link href="/contact" className="text-brand-green hover:underline">
              Contact our support team
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
