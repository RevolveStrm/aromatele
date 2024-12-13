import { z } from "zod";

export const envSchema = z.object({
	BOT_TOKEN: z.string().min(1, {
		message: "BOT_TOKEN is required",
	}),
	DATABASE_URL: z.string().url({
		message: "DATABASE_URL must be a valid URL",
	}),
	REDIS_URL: z.string().url({
		message: "REDIS_URL must be a valid URL",
	}),
	NODE_ENV: z.enum(["development", "production"], {
		message: 'NODE_ENV must be either "development" or "production"',
	}),
});

export type Env = z.infer<typeof envSchema>;
