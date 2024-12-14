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
});

export type Env = z.infer<typeof envSchema>;
