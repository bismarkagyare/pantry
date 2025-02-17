"use client";

import { Mail, Phone } from "lucide-react";

export function TopHeader() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="hidden bg-brand-green py-2 text-white sm:block">
      <div className="container flex items-center justify-between">
        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4" />
            <span className="text-sm">(+233) 54 567 8901</span>
          </div>
          <div className="hidden items-center gap-2 sm:flex">
            <Mail className="h-4 w-4" />
            <span className="text-sm">support@pantry.com</span>
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <button onClick={() => scrollToSection("about")} className="hover:underline cursor-pointer">
            About Us
          </button>
          <button onClick={() => scrollToSection("contact")} className="hover:underline cursor-pointer">
            Contact
          </button>
        </div>
      </div>
    </div>
  );
}
