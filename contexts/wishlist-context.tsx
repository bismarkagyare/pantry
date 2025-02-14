"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface WishlistItem {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
}

interface WishlistContextType {
  items: WishlistItem[];
  addItem: (item: WishlistItem) => void;
  removeItem: (id: string) => void;
  isInWishlist: (id: string) => boolean;
  getWishlistCount: () => number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>(() => {
    if (typeof window !== "undefined") {
      const savedItems = localStorage.getItem("wishlist");
      return savedItems ? JSON.parse(savedItems) : [];
    }
    return [];
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("wishlist", JSON.stringify(items));
    }
  }, [items]);

  const addItem = (item: WishlistItem) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) return prevItems;
      return [...prevItems, item];
    });
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const isInWishlist = (id: string) => {
    return items.some((item) => item.id === id);
  };

  const getWishlistCount = () => items.length;

  return (
    <WishlistContext.Provider value={{ items, addItem, removeItem, isInWishlist, getWishlistCount }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
} 