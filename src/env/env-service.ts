import { ZodError } from "zod";
import { envSchema } from "./env-schema.js";

class EnvironmentService {
	private static instance: EnvironmentService;
	private envConfig: Record<string, string | number> = {};

	private constructor() {
		this.validate();
	}

	public static getInstance(): EnvironmentService {
		if (!EnvironmentService.instance) {
			EnvironmentService.instance = new EnvironmentService();
		}
		return EnvironmentService.instance;
	}

	public validate(): void {
		try {
			this.envConfig = envSchema.parse(process.env);
		} catch (error) {
			if (error instanceof ZodError) {
				console.error("Invalid environment variables:", error.format());
			} else {
				console.error(error);
			}
			process.exit(1);
		}
	}

	public get(key: string): string | number {
		const value = this.envConfig[key];
		if (!value) {
			throw new Error(`Environment variable ${key} is not defined`);
		}
		return value;
	}
}

export const environmentService = EnvironmentService.getInstance();
