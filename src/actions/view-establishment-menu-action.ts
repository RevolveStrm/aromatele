import type { Context } from "telegraf";
import { databaseService } from "../database/database-service";
import { loggerService } from "../logger/logger-service";
import { ACTION_PATH } from "./constants";

export const viewEstablishmentMenuAction = async (
	ctx: Context,
): Promise<unknown> => {
	try {
		const categories = await databaseService.category.findMany({
			include: {
				products: true,
			},
		});

		//TODO: Localization
		if (!categories || categories.length === 0) {
			return ctx.reply("Наразі немає доступних категорій.");
		}

		const categoryMenu = categories.map((category) => [
			{ text: category.title, callback_data: `category_${category.id}` },
		]);

		//TODO: Localization
		categoryMenu.push([
			{
				text: "⬅️ Назад до головного меню",
				callback_data: ACTION_PATH.VIEW_MAIN_MENU,
			},
		]);

		//TODO: Localization
		return await ctx.editMessageText("Виберіть категорію:", {
			reply_markup: {
				inline_keyboard: categoryMenu,
			},
		});
	} catch (error: unknown) {
		if (error instanceof Error) {
			loggerService.error(`Error in action [VIEW_PRODUCTS]: ${error.message}`);
		} else {
			loggerService.error("Unknown error occurred in action [VIEW_PRODUCTS].");
		}
		return ctx.reply("An error occurred in action [VIEW_PRODUCTS].");
	}
};
