import type { Context } from "telegraf";
import { loggerService } from "../logger/logger-service";
import { getMainMenu } from "./constants";

export const viewMainMenuAction = async (ctx: Context): Promise<unknown> => {
	try {
		//TODO: Localization

		await ctx.editMessageText("Виберіть одну з опцій:", {
			reply_markup: {
				inline_keyboard: getMainMenu("UA"), //TODO:
			},
		});
	} catch (error: unknown) {
		if (error instanceof Error) {
			loggerService.error(`Error in action []: ${error.message}`);
		} else {
			loggerService.error("Unknown error occurred in action [].");
		}
		return ctx.reply("An error occurred in action [].");
	}
};
