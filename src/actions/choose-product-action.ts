import type { Context } from "telegraf";
import { getBackToMainMenuButton } from "../buttons/back-to-main-menu";
import { cacheService } from "../cache/cache-service";
import { databaseService } from "../database/database-service";
import { TranslationKeys } from "../dictionary/constants";
import { dictionaryService } from "../dictionary/dictionary-service";
import { loggerService } from "../logger/logger-service";
import { catchActionError } from "../utils/catch-action-error";
import { getLanguageMetadata } from "../utils/get-language-ctx-metadata";
import { getProductQuery } from "../utils/get-product-query";
import { getUserMetadata } from "../utils/get-user-ctx-metadata";
import { ACTION_PATH, type CartItem } from "./constants";

export const chooseProductAction = async (ctx: Context): Promise<unknown> => {
	try {
		const { productId } = getProductQuery(ctx);

		const { cartId } = getUserMetadata(ctx);

		const language = getLanguageMetadata(ctx);

		const product = await databaseService.product.findUnique({
			where: { id: productId },
		});

		if (!product) {
			return ctx.reply(
				dictionaryService.getTranslation(
					TranslationKeys.ITEM_UNAVAILABLE,
					language,
				),
			);
		}

		const cartCacheData = await cacheService.get(cartId);
		const cart: CartItem[] = cartCacheData ? JSON.parse(cartCacheData) : [];

		const existingCartItem = cart.find(
			(cartItem: CartItem) => cartItem.id === productId,
		);

		if (!existingCartItem) {
			cart.push({
				id: product.id,
				title: product.title,
				price: product.price,
				quantity: 1,
			});
		} else {
			existingCartItem.quantity += 1;
		}

		await cacheService.set(cartId, JSON.stringify(cart), { EX: 3600 }); // TTL 1 HOUR

		return ctx.editMessageText(
			`✅ ${dictionaryService.getTranslation(TranslationKeys.ITEM_ADDED, language)} ${product.title}`,
			{
				reply_markup: {
					inline_keyboard: [
						[
							{
								text: `🛒 ${dictionaryService.getTranslation(TranslationKeys.CART, language)}`,
								callback_data: ACTION_PATH.VIEW_CART,
							},
						],
						[
							{
								text: `⬅️ ${dictionaryService.getTranslation(TranslationKeys.ESTABLISHMENT_MENU, language)}`,
								callback_data: ACTION_PATH.VIEW_ESTABLISHMENT_MENU,
							},
						],
						getBackToMainMenuButton(language),
					],
				},
			},
		);
	} catch (error: unknown) {
		if (error instanceof Error) {
			loggerService.error(
				`Error in action [chooseProductAction]: ${error.message}`,
			);
		} else {
			loggerService.error(
				"Unknown error occurred in action [chooseProductAction].",
			);
		}
		catchActionError(ctx);
	}
};
