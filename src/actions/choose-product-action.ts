import type { Context } from "telegraf";
import { cacheService } from "../cache/cache-service";
import { databaseService } from "../database/database-service";
import { loggerService } from "../logger/logger-service";
import { getProductMetadata } from "../utils/get-product-metadata";
import { getUserMetadata } from "../utils/get-user-ctx-metadata";
import type { CartItem } from "./constants";

export const chooseProductAction = async (ctx: Context): Promise<unknown> => {
	try {
		const { productId } = getProductMetadata(ctx);

		const { cartId } = getUserMetadata(ctx);

		const product = await databaseService.product.findUnique({
			where: { id: productId },
		});

		//TODO: Localization
		if (!product) {
			return ctx.reply("Цей товар більше недоступний.");
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

		//TODO: Localization
		await ctx.editMessageText(`✅ ${product.title} додано до корзини!`, {
			reply_markup: {
				inline_keyboard: [
					[{ text: "🛒 Переглянути корзину", callback_data: "view_cart" }],
					[
						{
							text: "⬅️ Назад до товарів",
							callback_data: `category_${product.categoryId}`,
						},
					],
				],
			},
		});

		return ctx.answerCbQuery();
	} catch (error: unknown) {
		if (error instanceof Error) {
			loggerService.error(`Error in action []: ${error.message}`);
		} else {
			loggerService.error("Unknown error occurred in action [].");
		}
		return ctx.reply("An error occurred in action [].");
	}
};
