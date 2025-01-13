import Stripe from "stripe";
import type { Env } from "../env/env-schema";
import { environmentService } from "../env/env-service";

export const stripeService = new Stripe(
  environmentService.get("STRIPE_SECRET_KEY") as Env["STRIPE_SECRET_KEY"],
);
