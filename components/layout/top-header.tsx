import Link from "next/link";
import { Mail, Phone } from "lucide-react";

export function TopHeader() {
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
          <Link href="/about" className="hover:underline">
            About Us
          </Link>
          <Link href="/contact" className="hover:underline">
            Contact
          </Link>
        </div>
      </div>
    </div>
  );
}
