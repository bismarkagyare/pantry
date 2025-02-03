import "./globals.css";
import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={quicksand.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
