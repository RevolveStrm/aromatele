import type { UserLanguage } from "@prisma/client";
import { ACTION_PATH } from "../actions/constants";
import { TranslationKeys } from "../dictionary/constants";
import { dictionaryService } from "../dictionary/dictionary-service";

export const getMainMenuButtons = (lang: UserLanguage) => [
	[
		{
			text: dictionaryService.getTranslation(
				TranslationKeys.ESTABLISHMENT_MENU,
				lang,
			),
			callback_data: ACTION_PATH.VIEW_ESTABLISHMENT_MENU,
		},
	],
	[
		{
			text: dictionaryService.getTranslation(TranslationKeys.CART, lang),
			callback_data: ACTION_PATH.VIEW_CART,
		},
	],
	[
		{
			text: dictionaryService.getTranslation(TranslationKeys.ORDERS, lang),
			callback_data: ACTION_PATH.VIEW_ORDERS,
		},
	],
	[
		{
			text: dictionaryService.getTranslation(TranslationKeys.MAP, lang),
			callback_data: ACTION_PATH.VIEW_MAP,
		},
	],
	// [
	// 	{
	// 		text: dictionaryService.getTranslation(TranslationKeys.SUPPORT, lang),
	// 		callback_data: ACTION_PATH.VIEW_SUPPORT,
	// 	},
	// ],
];
