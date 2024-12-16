import { PrismaClient } from "@prisma/client";
import { loggerService } from "../logger/logger-service";

export const databaseService = new PrismaClient();

databaseService
	.$connect()
	.then(() => loggerService.info("Prisma successfully connected"))
	.catch((err) => {
		console.error(err);
		loggerService.error(`Prisma connection failed: ${err}`);
		process.exit(1);
	});
