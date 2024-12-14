import type { Context } from "telegraf";
import { getBackToMainMenuButton } from "../buttons/back-to-main-menu";
import { TranslationKeys } from "../dictionary/constants";
import { dictionaryService } from "../dictionary/dictionary-service";
import { getLanguageMetadata } from "./get-language-ctx-metadata";

export const catchActionError = (ctx: Context) => {
	const language = getLanguageMetadata(ctx);

	return ctx.reply(
		dictionaryService.getTranslation(TranslationKeys.ERROR_GENERIC, language),
		{
			reply_markup: {
				inline_keyboard: [getBackToMainMenuButton(language)],
			},
		},
	);
};
