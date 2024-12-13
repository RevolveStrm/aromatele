import type { Context } from "telegraf";
import { databaseService } from "../database/database-service";
import { loggerService } from "../logger/logger-service";
import { getCategoryMetadata } from "../utils/get-category-metadata";
import { ACTION_PATH } from "./constants";

export const chooseCategoryAction = async (ctx: Context): Promise<unknown> => {
	try {
		const { categoryId } = getCategoryMetadata(ctx);

		const category = await databaseService.category.findUnique({
			where: { id: categoryId },
			include: { products: true },
		});

		//TODO: Localization
		if (!category || category.products.length === 0) {
			return ctx.reply("У цій категорії поки що немає товарів.");
		}

		//TODO: Localization
		const productMenu = category.products.map((product) => [
			{
				text: `${product.title} - ${product.price} грн`,
				callback_data: `product_${product.id}`,
			},
		]);

		//TODO: Localization
		productMenu.push([
			{
				text: "⬅️ Назад до категорій",
				callback_data: ACTION_PATH.VIEW_ESTABLISHMENT_MENU,
			},
		]);

		//TODO: Localization
		return await ctx.editMessageText(
			`Категорія: ${category.title}\nОберіть товар:`,
			{
				reply_markup: {
					inline_keyboard: productMenu,
				},
			},
		);
	} catch (error: unknown) {
		if (error instanceof Error) {
			loggerService.error(
				`Error in action [CHOOSE_CATEGORY_ACTION]: ${error.message}`,
			);
		} else {
			loggerService.error(
				"Unknown error occurred in action [CHOOSE_CATEGORY_ACTION].",
			);
		}
		return ctx.reply("An error occurred in action [CHOOSE_CATEGORY_ACTION].");
	}
};
