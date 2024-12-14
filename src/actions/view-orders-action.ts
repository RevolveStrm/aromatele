import type { Context } from "telegraf";
import { getBackToMainMenuButton } from "../buttons/back-to-main-menu";
import { databaseService } from "../database/database-service";
import { loggerService } from "../logger/logger-service";
import { catchActionError } from "../utils/catch-action-error";
import { getLanguageMetadata } from "../utils/get-language-ctx-metadata";
import { getUserMetadata } from "../utils/get-user-ctx-metadata";
import { getOrdersMessage } from "./constants";

export const viewOrdersAction = async (ctx: Context): Promise<unknown> => {
	try {
		const { userId } = getUserMetadata(ctx);

		const language = getLanguageMetadata(ctx);

		const orders = await databaseService.order.findMany({
			where: {
				userId,
			},
		});

		//TODO: Localization
		if (!orders?.length) {
			return ctx.editMessageText("Ви ще не зробили жодного замовлення", {
				reply_markup: {
					inline_keyboard: [getBackToMainMenuButton(language)],
				},
			});
		}

		const ordersMessage = getOrdersMessage(orders);

		return ctx.editMessageText(ordersMessage, {
			reply_markup: {
				inline_keyboard: [getBackToMainMenuButton(language)],
			},
		});
	} catch (error: unknown) {
		if (error instanceof Error) {
			loggerService.error(`Error in action []: ${error.message}`);
		} else {
			loggerService.error("Unknown error occurred in action [].");
		}
		catchActionError(ctx);
	}
};
