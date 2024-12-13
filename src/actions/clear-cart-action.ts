import type { Context } from "telegraf";
import { cacheService } from "../cache/cache-service";
import { TranslationKeys } from "../dictionary/constants";
import { dictionaryService } from "../dictionary/dictionary-service";
import { loggerService } from "../logger/logger-service";
import { getUserMetadata } from "../utils/get-user-ctx-metadata";
import { ACTION_PATH, type CartItem, getCartMessage } from "./constants";

export const clearCartAction = async (ctx: Context): Promise<unknown> => {
	try {
		const { cartId } = getUserMetadata(ctx);

		await cacheService.set(cartId, JSON.stringify([]), { EX: 3600 }); // TTL 1 HOUR

		//TODO: Localization
		return await ctx.editMessageText("Кошик був очищений", {
			reply_markup: {
				inline_keyboard: [
					[
						{
							text: "⬅️ Назад до меню",
							callback_data: ACTION_PATH.VIEW_MAIN_MENU,
						},
					],
				],
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
