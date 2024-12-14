import type { Context } from "telegraf";
import { getBackToMainMenuButton } from "../buttons/back-to-main-menu";
import { TranslationKeys } from "../dictionary/constants";
import { dictionaryService } from "../dictionary/dictionary-service";
import type { Env } from "../env/env-schema";
import { environmentService } from "../env/env-service";
import { catchActionError } from "../utils/catch-action-error";
import { getLanguageMetadata } from "../utils/get-language-ctx-metadata";

export const viewMapAction = (ctx: Context) => {
	try {
		const language = getLanguageMetadata(ctx);
		const latitude: number = Number(
			environmentService.get(
				"ESTABLISHMENT_LATITUDE",
			) as Env["ESTABLISHMENT_LATITUDE"],
		);
		const longitude: number = Number(
			environmentService.get(
				"ESTABLISHMENT_LONGITUDE",
			) as Env["ESTABLISHMENT_LONGITUDE"],
		);
		const address: string = environmentService.get(
			"ESTABLISHMENT_ADDRESS",
		) as Env["ESTABLISHMENT_ADDRESS"];
		const mapLink: string = `https://www.google.com/maps?q=${latitude},${longitude}`;

		return ctx.editMessageText(
			`${dictionaryService.getTranslation(TranslationKeys.ADDRESS, language)}:\n\n${address}`,
			{
				reply_markup: {
					inline_keyboard: [
						[
							{
								text: `🌍 ${dictionaryService.getTranslation(TranslationKeys.VIEW_ON_GOOGLE_MAPS, language)}`,
								url: mapLink,
							},
						],
						getBackToMainMenuButton(language),
					],
				},
			},
		);
	} catch (error) {
		catchActionError(ctx);
	}
};
