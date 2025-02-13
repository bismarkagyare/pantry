"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, ShoppingCart, Heart, Menu, X, Home } from "lucide-react";
import logo from "@/assets/logo.png";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { UserButton, useUser } from "@clerk/nextjs";
import { useCart } from "@/contexts/cart-context";

export function MainHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isSignedIn } = useUser();
  const { items, getCartTotal } = useCart();

  return (
    <div className="border-b py-4">
      <div className="container flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image src={logo} alt="Pantry Logo" width={40} height={40} priority />
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-brand-black sm:text-3xl">Pantry</span>
            <span className="text-xs text-brand-grey">GROCERY STORE</span>
          </div>
        </Link>

        <button className="ml-auto p-2 lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        <div className="mx-8 ml-24 hidden max-w-3xl flex-1 items-center gap-4 lg:flex">
          <div className="relative flex flex-1">
            <div className="flex items-center">
              <select className="h-full border-y border-l border-brand-grey bg-[#F3F3F3] px-4 py-3 text-brand-black focus:border-brand-green focus:outline-none">
                <option>All Categories</option>
                {/* Add categories here */}
              </select>
            </div>
            <input
              type="text"
              placeholder="Search for items..."
              className="w-full border border-brand-grey bg-[#F3F3F3] px-6 py-3 focus:border-brand-green focus:outline-none"
            />
            <button className="bg-brand-green p-3 transition-colors hover:bg-[#2e8e5f]">
              <Search className="h-5 w-5 text-white" />
            </button>
          </div>
        </div>

        <div className="hidden items-center gap-6 lg:flex">
          <div className="flex items-center gap-1">
            <div className="relative">
              <button aria-label="Wishlist">
                <Heart className="h-6 w-6 text-brand-black" />
                <div className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-brand-green text-xs text-white">
                  0
                </div>
              </button>
            </div>
            <span className="text-sm text-brand-grey">Wishlist</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="relative">
              <Link href="/cart" aria-label="Shopping cart">
                <ShoppingCart className="h-6 w-6 text-brand-black" />
                <div className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-brand-green text-xs text-white">
                  {items.length}
                </div>
              </Link>
            </div>
            <span className="text-sm text-brand-grey">${getCartTotal().toFixed(2)}</span>
          </div>
          <div className="flex items-center gap-3">
            {isSignedIn ? (
              <UserButton showName />
            ) : (
              <>
                <SignInButton>
                  <button className="rounded-full bg-brand-green px-6 py-2 text-white transition hover:bg-brand-green/90">
                    Login
                  </button>
                </SignInButton>
                <SignUpButton>
                  <button className="rounded-full border-2 border-dashed border-brand-green px-6 py-2 font-semibold text-brand-green transition hover:bg-brand-green/5">
                    Sign Up
                  </button>
                </SignUpButton>
              </>
            )}
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="fixed inset-0 top-[73px] z-50 bg-white p-4 lg:hidden">
          <div className="flex flex-col gap-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for items..."
                className="w-full rounded-lg border border-brand-grey bg-[#F3F3F3] px-6 py-3 focus:border-brand-green focus:outline-none"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md bg-brand-green p-2">
                <Search className="h-5 w-5 text-white" />
              </button>
            </div>

            <nav className="flex flex-col gap-4">
              <Link href="/" className="flex items-center gap-2 text-brand-black">
                <Home className="h-4 w-4" />
                Home
              </Link>
              {/* Add other nav links */}
            </nav>

            <div className="mt-auto flex flex-col gap-3">
              {isSignedIn ? (
                <UserButton showName />
              ) : (
                <>
                  <SignInButton mode="modal">
                    <button className="w-full rounded-full bg-brand-green py-2 text-center text-white">Login</button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <button className="w-full rounded-full border-2 border-dashed border-brand-green py-2 text-center font-semibold text-brand-green">
                      Sign Up
                    </button>
                  </SignUpButton>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
