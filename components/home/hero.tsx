"use client";

import Image from "next/image";
import HeroImage from "@/assets/hero-image.png";
import HeroBackground from "@/assets/pantry-hero-bg.png";
import { Mail } from "lucide-react";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative h-[400px] w-full overflow-hidden sm:h-[477px]">
      <Image src={HeroBackground} alt="" fill className="absolute inset-0 object-cover" priority />

      <div className="container relative flex h-full items-center">
        <motion.div
          className="max-w-xl px-4 sm:px-0"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <h1 className="mb-6 text-3xl font-bold text-brand-black sm:text-4xl md:text-5xl">
            Don&apos;t miss our daily amazing deals.
          </h1>
          <p className="mb-8 text-base text-brand-grey sm:text-lg">Save up to 60% off on your first order</p>
          <div className="flex flex-col gap-4 sm:flex-row lg:gap-0">
            <div className="relative flex w-full sm:w-auto">
              <div className="pointer-events-none absolute left-6 top-1/2 -translate-y-1/2">
                <Mail className="h-5 w-5 text-brand-grey" />
              </div>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border border-brand-grey bg-white py-3 pl-14 pr-6 focus:border-brand-green focus:outline-none sm:w-96"
              />
            </div>
            <button className="w-full border border-brand-green bg-brand-green px-8 py-3 text-white transition hover:bg-brand-green/90 sm:w-auto sm:border-l-0">
              Subscribe
            </button>
          </div>
        </motion.div>

        {/* <div className="absolute -bottom-10 -right-20 h-[120%] w-3/5">
          <Image
            src={HeroImage}
            alt="Fresh groceries"
            fill
            className="object-contain object-bottom"
            priority
          />
        </div> */}

        <motion.div
          className="absolute -right-20 bottom-0 hidden h-[110%] w-[50%] md:block"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
        >
          <Image src={HeroImage} alt="Fresh groceries" fill className="object-contain object-right-bottom" priority />
        </motion.div>
      </div>
    </section>
  );
}
