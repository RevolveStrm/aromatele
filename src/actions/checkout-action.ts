import type { Context } from "telegraf";
import { getBackToMainMenuButton } from "../buttons/back-to-main-menu";
import { cacheService } from "../cache/cache-service";
import { databaseService } from "../database/database-service";
import { TranslationKeys } from "../dictionary/constants";
import { dictionaryService } from "../dictionary/dictionary-service";
import { loggerService } from "../logger/logger-service";
import { calcCartTotalAmount } from "../utils/calc-cart-total-amount";
import { catchActionError } from "../utils/catch-action-error";
import { getCart } from "../utils/get-cart";
import { getLanguageMetadata } from "../utils/get-language-ctx-metadata";
import { getUserMetadata } from "../utils/get-user-ctx-metadata";

export const checkoutAction = async (ctx: Context): Promise<unknown> => {
	try {
		const { userId, cartId } = getUserMetadata(ctx);

		const language = getLanguageMetadata(ctx);

		const cart = await getCart(cartId);

		if (!cart || !cart.length) {
			return ctx.reply(
				dictionaryService.getTranslation(
					TranslationKeys.CART_EMPTY_ADD_ITEMS,
					language,
				),
			);
		}

		const totalAmount: number = calcCartTotalAmount(cart);

		const createdOrder = await databaseService.$transaction(async (prisma) => {
			const order = await prisma.order.create({
				data: {
					userId,
					totalAmount,
				},
			});

			const orderProducts = cart.map((item) => ({
				orderId: order.id,
				productId: item.id,
			}));

			await prisma.orderProduct.createMany({
				data: orderProducts,
			});

			return order;
		});

		if (createdOrder) {
			await cacheService.set(cartId, JSON.stringify([]), {
				EX: 3600, // 1 HOUR
			});
		}

		return ctx.editMessageText(
			`${dictionaryService.getTranslation(TranslationKeys.ORDER_CREATED_WITH_ID, language)}: ${createdOrder.id}`,
			{
				reply_markup: {
					inline_keyboard: [getBackToMainMenuButton(language)],
				},
			},
		);
	} catch (error: unknown) {
		if (error instanceof Error) {
			loggerService.error(`Error in action [checkoutAction]: ${error.message}`);
		} else {
			loggerService.error("Unknown error occurred in action [checkoutAction].");
		}
		catchActionError(ctx);
	}
};
