import type { User } from "@prisma/client";
import type { Context, MiddlewareFn } from "telegraf";
import { databaseService } from "../database/database-service";
import { loggerService } from "../logger/logger-service";
import { getUserTelegramMetadata } from "../utils/get-user-telegram-metadata";

export const languageMiddleware: MiddlewareFn<Context> = async (
	ctx: Context,
	next: () => Promise<void>,
): Promise<unknown> => {
	try {
		ctx.state.language = "UA" as string;

		return next();
	} catch (error: unknown) {
		if (error instanceof Error) {
			loggerService.error(`Error in languageMiddleware: ${error.message}`);
		} else {
			loggerService.error("Unknown error occurred in languageMiddleware.");
		}
		return ctx.reply("An error occurred while identifying your Telegram ID.");
	}
};
