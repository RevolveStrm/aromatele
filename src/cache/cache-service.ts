import { createClient } from "redis";
import { environmentService } from "../env/env-service";
import { loggerService } from "../logger/logger-service";

export const cacheService = createClient({
	url: environmentService.get("REDIS_URL"),
});

cacheService.on("error", (err) =>
	loggerService.error(`Redis connection error: ${err}`),
);

cacheService
	.connect()
	.then(() => loggerService.info("Redis successfully connected"))
	.catch((err) => {
		loggerService.error(`Redis connection failed: ${err}`);
		process.exit(1);
	});
