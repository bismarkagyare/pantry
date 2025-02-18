"use client";

import { api } from "@/trpc/react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShoppingCart, Heart } from "lucide-react";
import { useCart } from "@/contexts/cart-context";
import { useWishlist } from "@/contexts/wishlist-context";
import { cn } from "@/lib/utils";
import { toast } from "react-toastify";
import { ProductLoadingSkeleton } from "@/components/ui/loading-skeleton";

export default function ProductDetails() {
  const { id } = useParams();
  const { data: product, isLoading } = api.product.getProductById.useQuery(id as string);
  const { addItem, isInCart, removeItem } = useCart();
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist();

  if (isLoading) return <ProductLoadingSkeleton />;
  if (!product) return <NotFound />;

  const handleAddToCart = () => {
    if (isInCart(product.id)) {
      removeItem(product.id);
      toast.success("Removed from cart");
    } else {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
      });
      toast.success("Added to cart");
    }
  };

  const handleWishlist = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      toast.success("Removed from wishlist");
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
        category: product.category.name,
      });
      toast.success("Added to wishlist");
    }
  };

  return (
    <div className="container py-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative aspect-[5/3] rounded-lg bg-gray-100 p-8"
        >
          <Image src={product.imageUrl} alt={product.name} fill className="object-contain" priority />
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-brand-black">{product.name}</h1>
            <p className="mt-2 text-sm text-brand-grey">Category: {product.category.name}</p>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-3xl font-bold text-brand-green">${product.price.toFixed(2)}</span>
          </div>

          <p className="text-brand-grey">{product.description}</p>

          <div className="text-sm text-brand-grey">
            {product.stock > 0 ? (
              <span className="text-brand-green">In Stock ({product.stock} available)</span>
            ) : (
              <span className="text-red-500">Out of Stock</span>
            )}
          </div>

          {/* add to cart and wishlist */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={cn(
                "flex items-center justify-center gap-2 rounded-lg px-8 py-3 text-white transition-colors",
                product.stock === 0
                  ? "bg-gray-300 cursor-not-allowed"
                  : isInCart(product.id)
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-brand-green hover:bg-brand-green/90"
              )}
            >
              <ShoppingCart className="h-5 w-5" />
              {isInCart(product.id) ? "Remove from Cart" : "Add to Cart"}
            </button>
            <button onClick={handleWishlist} className="rounded-lg border border-gray-200 p-3 hover:bg-gray-50">
              <Heart
                className={cn("h-5 w-5", isInWishlist(product.id) ? "fill-red-500 text-red-500" : "text-gray-400")}
              />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function NotFound() {
  return (
    <div className="container py-16 text-center">
      <h1 className="mb-4 text-2xl font-bold text-brand-black">Product Not Found</h1>
      <p className="text-brand-grey">The product you&apos;re looking for doesn&apos;t exist or has been removed.</p>
    </div>
  );
}
