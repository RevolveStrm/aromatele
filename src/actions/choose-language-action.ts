import type { Context } from "telegraf";
import { getMainMenuButtons } from "../buttons/main-menu-buttons";
import { databaseService } from "../database/database-service";
import { TranslationKeys } from "../dictionary/constants";
import { dictionaryService } from "../dictionary/dictionary-service";
import { loggerService } from "../logger/logger-service";
import { catchActionError } from "../utils/catch-action-error";
import { getLanguageQuery } from "../utils/get-language-query";
import { getUserMetadata } from "../utils/get-user-ctx-metadata";

export const chooseLanguageAction = async (ctx: Context): Promise<unknown> => {
	try {
		const { userId } = getUserMetadata(ctx);

		const language = getLanguageQuery(ctx);

		await databaseService.user.update({
			where: {
				id: userId,
			},
			data: {
				language,
			},
		});

		return ctx.reply(
			dictionaryService.getTranslation(TranslationKeys.CHOOSE_OPTION, language),
			{
				reply_markup: {
					inline_keyboard: getMainMenuButtons(language),
				},
			},
		);
	} catch (error: unknown) {
		if (error instanceof Error) {
			loggerService.error(
				`Error in action [chooseLanguageAction]: ${error.message}`,
			);
		} else {
			loggerService.error(
				"Unknown error occurred in action [chooseLanguageAction].",
			);
		}
		catchActionError(ctx);
	}
};
