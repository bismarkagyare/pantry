import Image from "next/image";
import bestPriceIcon from "@/assets/ksp/best-price.png";
import refundableIcon from "@/assets/ksp/refundable.png";
import freeDeliveryIcon from "@/assets/ksp/free.png";

const sellingPoints = [
  {
    icon: bestPriceIcon,
    title: "Best Prices & Deals",
    description: "Don't miss our daily amazing deals and prices",
  },
  {
    icon: refundableIcon,
    title: "Refundable",
    description: "If your items have damage we agree to refund it",
  },
  {
    icon: freeDeliveryIcon,
    title: "Free delivery",
    description: "Do purchase over $50 and get free delivery anywhere",
  },
];

export function KeySellingPoints() {
  return (
    <div className="container py-16">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {sellingPoints.map((point) => (
          <div key={point.title} className="flex items-center gap-4 rounded-lg border border-gray-100 p-6 shadow-sm">
            <div className="relative h-12 w-12">
              <Image src={point.icon} alt={point.title} fill className="object-contain" />
            </div>
            <div>
              <h3 className="font-semibold text-brand-black">{point.title}</h3>
              <p className="text-sm text-brand-grey">{point.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
