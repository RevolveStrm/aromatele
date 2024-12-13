import type { Context } from "telegraf";
import { getBackToMainMenuButton } from "../buttons/back-to-main-menu";
import { cacheService } from "../cache/cache-service";
import { databaseService } from "../database/database-service";
import { loggerService } from "../logger/logger-service";
import { calcCartTotalAmount } from "../utils/calc-cart-total-amount";
import { getCart } from "../utils/get-cart";
import { getUserMetadata } from "../utils/get-user-ctx-metadata";

export const checkoutAction = async (ctx: Context): Promise<unknown> => {
	try {
		const { userId, cartId } = getUserMetadata(ctx);

		const cart = await getCart(cartId);

		if (!cart || !cart.length) {
			//TODO: Localization
			return ctx.reply("Ваш кошик порожній, будь ласка, додайте товари.");
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

		//TODO: Localization
		return ctx.editMessageText(`Order created with ID: ${createdOrder.id}`, {
			reply_markup: {
				inline_keyboard: [getBackToMainMenuButton()],
			},
		});
	} catch (error: unknown) {
		if (error instanceof Error) {
			loggerService.error(`Error in action []: ${error.message}`);
		} else {
			loggerService.error("Unknown error occurred in action [].");
		}
		return ctx.reply("An error occurred in action [].");
	}
};
