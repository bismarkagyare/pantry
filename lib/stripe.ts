import Stripe from "stripe";
import { env } from "@/env";

//new stripe instance
export const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-02-24.acacia",
})