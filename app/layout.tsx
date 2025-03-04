import "./globals.css";
import { Quicksand } from "next/font/google";
import { type Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { TRPCReactProvider } from "@/trpc/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { CartProvider } from "@/contexts/cart-context";
import { WishlistProvider } from "@/contexts/wishlist-context";

const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-quicksand",
  display: "swap",
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: "Pantry - Fresh Grocery Store",
  description: "Your one-stop shop for fresh groceries, fruits, vegetables, and daily essentials.",
  applicationName: "Pantry",
  authors: [{ name: "Bismark Agyare" }],
  keywords: ["Next.js", "React", "Tailwind CSS", "Server Components"],
  manifest: "/site.webmanifest",
  icons: [
    { rel: "icon", url: "/favicon.ico" },
    {
      rel: "icon",
      url: "/favicon-16x16.png",
      sizes: "16x16",
      type: "image/png",
    },
    {
      rel: "icon",
      url: "/favicon-32x32.png",
      sizes: "32x32",
      type: "image/png",
    },
    {
      rel: "mask-icon",
      url: "/safari-pinned-tab.svg",
      color: "#3BB77E",
    },
  ],
  other: {
    "msapplication-TileColor": "#3BB77E",
    "msapplication-config": "/browserconfig.xml",
    "theme-color": "#ffffff",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en" className={quicksand.className} suppressHydrationWarning>
        <body className="font-quicksand">
          <TRPCReactProvider>
            <CartProvider>
              <WishlistProvider>
                <Header />
                {children}
                <Footer />
              </WishlistProvider>
            </CartProvider>
          </TRPCReactProvider>
          <ToastContainer />
        </body>
      </html>
    </ClerkProvider>
  );
}
