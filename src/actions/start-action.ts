import type { Context } from "telegraf";
import { getMainMenuButtons } from "../buttons/main-menu-buttons";
import { TranslationKeys } from "../dictionary/constants";
import { dictionaryService } from "../dictionary/dictionary-service";
import { getLanguageMetadata } from "../utils/get-language-ctx-metadata";

export const startAction = async (ctx: Context) => {
	const language = getLanguageMetadata(ctx);

	//TODO: Localization
	await ctx.reply("Ласкаво просимо до Aromatele!");

	await ctx.reply(
		dictionaryService.getTranslation(TranslationKeys.CHOOSE_OPTION, language),
		{
			reply_markup: {
				inline_keyboard: getMainMenuButtons(language),
			},
		},
	);
};
