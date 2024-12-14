import type { User } from "@prisma/client";
import type { Context, MiddlewareFn } from "telegraf";
import { databaseService } from "../database/database-service";
import { loggerService } from "../logger/logger-service";
import { catchActionError } from "../utils/catch-action-error";
import { getUserTelegramMetadata } from "../utils/get-user-telegram-metadata";

export const authMiddleware: MiddlewareFn<Context> = async (
	ctx: Context,
	next: () => Promise<void>,
): Promise<unknown> => {
	try {
		const { telegramUserId, telegramUserName } = getUserTelegramMetadata(ctx);

		if (!telegramUserId) {
			loggerService.warn("Telegram user ID not found in the context.");
			return ctx.reply("Unable to identify your Telegram ID.");
		}

		const existingUser: User | null = await databaseService.user.findUnique({
			where: { telegramUserId },
		});

		if (!existingUser) {
			loggerService.info(
				`User not found. Creating a new user with Telegram ID: ${telegramUserId}.`,
			);

			const createdUser = await databaseService.user.create({
				data: {
					telegramUserId,
					telegramUserName,
				},
			});

			loggerService.info(
				`New user created successfully with ID: ${createdUser.id}.`,
			);

			ctx.state.user = createdUser;

			return next();
		}

		ctx.state.user = existingUser;

		return next();
	} catch (error: unknown) {
		if (error instanceof Error) {
			loggerService.error(`Error in authMiddleware: ${error.message}`);
		} else {
			loggerService.error("Unknown error occurred in authMiddleware.");
		}
		catchActionError(ctx);
	}
};
