import "./globals.css";
import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Pantry",
  description: "E-commerce Store",
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
