import { z } from "zod";

export const envSchema = z.object({
  BOT_TOKEN: z.string().min(1, {
    message: "BOT_TOKEN is required",
  }),
  ORIGIN_URL: z.string().min(1, {
    message: "ORIGIN_URL is required",
  }),
  DATABASE_URL: z.string().url({
    message: "DATABASE_URL must be a valid URL",
  }),
  REDIS_URL: z.string().url({
    message: "REDIS_URL must be a valid URL",
  }),
  STRIPE_SECRET_KEY: z.string().min(1, {
    message: "STRIPE_SECRET_KEY must be a valid string",
  }),
  STRIPE_WEBHOOK_SIGNING_SECRET: z.string().min(1, {
    message: "STRIPE_WEBHOOK_SIGNING_SECRET must be a valid string",
  }),
  NODE_ENV: z.enum(["development", "production"], {
    message: 'NODE_ENV must be either "development" or "production"',
  }),
  ESTABLISHMENT_NAME: z.string({
    message: "ESTABLISHMENT_NAME must be a valid string",
  }),
  ESTABLISHMENT_ADDRESS: z.string({
    message: "ESTABLISHMENT_ADDRESS must be a valid address string",
  }),
  ESTABLISHMENT_LATITUDE: z.string().transform((val) => {
    const numberVal = Number(val);
    if (Number.isNaN(numberVal)) {
      throw new Error("ESTABLISHMENT_LATITUDE must be a valid number");
    }
    return numberVal;
  }),
  ESTABLISHMENT_LONGITUDE: z.string().transform((val) => {
    const numberVal = Number(val);
    if (Number.isNaN(numberVal)) {
      throw new Error("ESTABLISHMENT_LONGITUDE must be a valid number");
    }
    return numberVal;
  }),
  SERVER_PORT: z.string().transform((val) => {
    const numberVal = Number(val);
    if (Number.isNaN(numberVal)) {
      throw new Error("SERVER_PORT must be a valid number");
    }
    return numberVal;
  }),
});

export type Env = z.infer<typeof envSchema>;
