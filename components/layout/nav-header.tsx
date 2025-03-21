"use client";

import { Grid, Phone, Home, Flame, Gift, Sparkles } from "lucide-react";

export function NavHeader() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="hidden border-b bg-white lg:block">
      <div className="container flex items-center justify-between py-3">
        <button className="flex items-center gap-2 bg-brand-green px-4 py-2 text-white">
          <Grid className="h-5 w-5" />
          <span>Browse All Categories</span>
        </button>

        <nav className="flex items-center gap-8">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2 text-brand-black hover:text-brand-green"
          >
            <Home className="h-4 w-4" />
            Home
          </button>
          <button
            onClick={() => scrollToSection("hot-deals")}
            className="flex items-center gap-2 text-brand-black hover:text-brand-green"
          >
            <Flame className="h-4 w-4" />
            Hot deals
          </button>
          <button
            onClick={() => scrollToSection("promotions")}
            className="flex items-center gap-2 text-brand-black hover:text-brand-green"
          >
            <Gift className="h-4 w-4" />
            Promotions
          </button>
          <button
            onClick={() => scrollToSection("new-products")}
            className="flex items-center gap-2 text-brand-black hover:text-brand-green"
          >
            <Sparkles className="h-4 w-4" />
            New products
          </button>
        </nav>

        <div className="hidden items-center gap-2 text-brand-green lg:flex">
          <Phone className="h-5 w-5" />
          <span className="font-semibold">1233-7777</span>
          <span className="text-sm text-brand-grey">24/7 support center</span>
        </div>
      </div>
    </div>
  );
}
