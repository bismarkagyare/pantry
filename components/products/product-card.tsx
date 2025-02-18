"use client";

import Image from "next/image";
import { Star, ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/cart-context";
import { useWishlist } from "@/contexts/wishlist-context";
import { cn } from "@/lib/utils";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import { toast } from "react-toastify";
import Link from "next/link";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  imageUrl: string;
  category: string;
  rating?: number;
  vendor?: string;
}

export function ProductCard({
  id,
  name,
  price,
  oldPrice,
  imageUrl,
  category,
  rating = 4,
  vendor = "Mr.food",
}: ProductCardProps) {
  const { addItem, isInCart, removeItem } = useCart();
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist();
  const inCart = isInCart(id);
  const inWishlist = isInWishlist(id);

  const handleCartClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log("product id", id);
    e.preventDefault();
    e.stopPropagation();
    if (isInCart(id)) {
      removeItem(id);
      toast.success(`${name} removed from cart`, {
        position: "top-right",
        autoClose: 3000,
      });
    } else {
      addItem({ id, name, price, imageUrl });
      toast.success(`${name} added to cart`, {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const handleWishlistClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInWishlist(id)) {
      removeFromWishlist(id);
      toast.success(`${name} removed from wishlist`);
    } else {
      addToWishlist({ id, name, price, imageUrl, category });
      toast.success(`${name} added to wishlist`);
    }
  };

  return (
    <Link href={`/products/${id}`} className="group rounded-lg border p-4 transition-all hover:shadow-lg">
      <div className="relative mb-3">
        <div className="relative h-48 w-full">
          <Image src={imageUrl} alt={name} fill className="object-contain" />
        </div>
        <button
          onClick={handleWishlistClick}
          className={cn(
            "absolute right-2 top-2 rounded-full bg-white p-2 shadow-md transition-all",
            inWishlist ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          )}
        >
          <Star className={cn("h-5 w-5", inWishlist ? "fill-yellow-400 text-yellow-400" : "text-brand-grey")} />
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
          <button
            onClick={handleCartClick}
            className={cn(
              "flex items-center gap-2 rounded-md px-4 py-2 transition-colors",
              inCart
                ? "bg-red-100 text-red-600 hover:bg-red-200"
                : "bg-brand-lightGreen text-brand-green hover:bg-brand-green hover:text-white"
            )}
          >
            {inCart ? (
              <>
                <MdOutlineRemoveShoppingCart className="h-4 w-4" />
                Remove
              </>
            ) : (
              <>
                <ShoppingCart className="h-4 w-4" />
                Add
              </>
            )}
          </button>
        </div>
      </div>
    </Link>
  );
}
