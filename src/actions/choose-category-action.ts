import type { Context } from "telegraf";
import { databaseService } from "../database/database-service";
import { TranslationKeys } from "../dictionary/constants";
import { dictionaryService } from "../dictionary/dictionary-service";
import { loggerService } from "../logger/logger-service";
import { catchActionError } from "../utils/catch-action-error";
import { getCategoryQuery } from "../utils/get-category-query";
import { getLanguageMetadata } from "../utils/get-language-ctx-metadata";
import { ACTION_PATH } from "./constants";

export const chooseCategoryAction = async (ctx: Context): Promise<unknown> => {
	try {
		const { categoryId } = getCategoryQuery(ctx);

		const language = getLanguageMetadata(ctx);

		const category = await databaseService.category.findUnique({
			where: { id: categoryId },
			include: { products: true },
		});

		if (!category || category.products.length === 0) {
			return ctx.reply(
				dictionaryService.getTranslation(
					TranslationKeys.NO_ITEMS_IN_CATEGORY,
					language,
				),
			);
		}

		const productMenu = category.products.map((product) => [
			{
				text: `${product.title} - ${product.price} ₴`,
				callback_data: `product_${product.id}`,
			},
		]);

		productMenu.push([
			{
				text: `⬅️ ${dictionaryService.getTranslation(TranslationKeys.BACK_TO_CATEGORIES, language)}`,
				callback_data: ACTION_PATH.VIEW_ESTABLISHMENT_MENU,
			},
		]);

		const categoryTranslation = dictionaryService.getTranslation(
			TranslationKeys.CATEGORY,
			language,
		);

		const selectProductTranslation = dictionaryService.getTranslation(
			TranslationKeys.SELECT_ITEM,
			language,
		);

		return ctx.editMessageText(
			`${categoryTranslation}: ${category.title}\n${selectProductTranslation}:`,
			{
				reply_markup: {
					inline_keyboard: productMenu,
				},
			},
		);
	} catch (error: unknown) {
		if (error instanceof Error) {
			loggerService.error(
				`Error in action [chooseCategoryAction]: ${error.message}`,
			);
		} else {
			loggerService.error(
				"Unknown error occurred in action [chooseCategoryAction].",
			);
		}
		catchActionError(ctx);
	}
};
