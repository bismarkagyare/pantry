import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/ksp/logo.png";
import payment from "@/assets/ksp/payment.png";
import facebook from "@/assets/ksp/facebook.png";
import twitter from "@/assets/ksp/twitter.png";
import instagram from "@/assets/ksp/instagram.png";
import linkedin from "@/assets/ksp/linkedin.png";

const footerLinks = {
  Account: ["Wishlist", "Cart", "Track Order", "Shipping Details"],
  "Useful links": ["About Us", "Contact", "Hot deals", "Promotions", "New products"],
  "Help Center": ["Payments", "Refund", "Checkout", "Shipping", "Privacy Policy"],
};

const socialLinks = [
  { name: "Facebook", href: "#", icon: facebook },
  { name: "LinkedIn", href: "#", icon: linkedin },
  { name: "Instagram", href: "#", icon: instagram },
  { name: "Twitter", href: "#", icon: twitter },
];

export function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="container py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Company Info */}
          <div className="lg:col-span-5">
            <Link href="/" className="mb-6 flex items-center gap-3">
              <Image src={logo} alt="Pantry Logo" width={40} height={40} priority />
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-brand-black sm:text-3xl">Pantry</span>
                <span className="text-xs text-brand-grey">GROCERY STORE</span>
              </div>
            </Link>
            <div className="space-y-4 text-sm text-brand-grey">
              <div className="flex items-start gap-2">
                <span>Address:</span>
                <span>1762 School House Road</span>
              </div>
              <div className="flex items-center gap-2">
                <span>Call Us:</span>
                <span>1233-777</span>
              </div>
              <div className="flex items-center gap-2">
                <span>Email:</span>
                <span>pantry@contact.com</span>
              </div>
              <div className="flex items-center gap-2">
                <span>Work hours:</span>
                <span>8:00 - 20:00, Sunday - Thursday</span>
              </div>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="lg:col-span-2">
              <h3 className="mb-6 text-lg font-semibold text-brand-black">{title}</h3>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link}>
                    <Link href="#" className="text-sm text-brand-grey hover:text-brand-green">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-16 flex flex-col items-center justify-between gap-8 border-t pt-8 md:flex-row">
          <p className="text-sm text-brand-grey">© 2025, All rights reserved</p>

          <Image src={payment} alt="Payment methods" width={250} height={30} className="h-auto" />

          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <Link
                key={social.name}
                href={social.href}
                className="rounded-full bg-[#DEF9EC] p-2 transition-colors hover:bg-brand-green"
              >
                <Image src={social.icon} alt={social.name} width={24} height={24} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
