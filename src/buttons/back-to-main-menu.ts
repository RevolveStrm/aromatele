import type { UserLanguage } from "@prisma/client";
import { ACTION_PATH } from "../actions/constants";
import { TranslationKeys } from "../dictionary/constants";
import { dictionaryService } from "../dictionary/dictionary-service";

export const getBackToMainMenuButton = (lang: UserLanguage) => {
	return [
		{
			text: `⬅️ ${dictionaryService.getTranslation(TranslationKeys.BACK_TO_MENU, lang)}`,
			callback_data: ACTION_PATH.VIEW_MAIN_MENU,
		},
	];
};
