import type { Context } from "telegraf";
import { getBackToMainMenuButton } from "../buttons/back-to-main-menu";
import { cacheService } from "../cache/cache-service";
import { TranslationKeys } from "../dictionary/constants";
import { dictionaryService } from "../dictionary/dictionary-service";
import { loggerService } from "../logger/logger-service";
import { catchActionError } from "../utils/catch-action-error";
import { getLanguageMetadata } from "../utils/get-language-ctx-metadata";
import { getUserMetadata } from "../utils/get-user-ctx-metadata";

export const clearCartAction = async (ctx: Context): Promise<unknown> => {
	try {
		const { cartId } = getUserMetadata(ctx);

		const language = getLanguageMetadata(ctx);

		await cacheService.set(cartId, JSON.stringify([]), { EX: 3600 }); // TTL 1 HOUR

		return ctx.editMessageText(
			dictionaryService.getTranslation(TranslationKeys.CART_CLEARED, language),
			{
				reply_markup: {
					inline_keyboard: [getBackToMainMenuButton(language)],
				},
			},
		);
	} catch (error: unknown) {
		if (error instanceof Error) {
			loggerService.error(
				`Error in action [clearCartAction]: ${error.message}`,
			);
		} else {
			loggerService.error(
				"Unknown error occurred in action [clearCartAction].",
			);
		}
		catchActionError(ctx);
	}
};
