import type { Context, MiddlewareFn } from "telegraf";
import { cacheService } from "../cache/cache-service";
import { loggerService } from "../logger/logger-service";
import { getUserMetadata } from "../utils/get-user-ctx-metadata";

export const cartMiddleware: MiddlewareFn<Context> = async (
	ctx: Context,
	next: () => Promise<void>,
): Promise<unknown> => {
	try {
		if (!ctx.state.user) {
			loggerService.error("User not found in context state.");
			await ctx.reply("An error occurred. Please try again later.");
			return;
		}

		const { userId, cartId } = getUserMetadata(ctx);

		const existingCart: string | null = await cacheService.get(cartId);

		if (!existingCart) {
			loggerService.info(
				`Cart not found for user ID: ${userId}. Creating a new one.`,
			);
			const createdCart: never[] = [];

			await cacheService.set(cartId, JSON.stringify(createdCart), {
				EX: 3600, // 1 HOUR
			});

			loggerService.info(`New cart created and cached for user ID: ${userId}`);
			ctx.state.cart = createdCart;
		} else {
			const parsedCart = JSON.parse(existingCart);
			ctx.state.cart = parsedCart;
		}

		return next();
	} catch (error) {
		if (error instanceof Error) {
			loggerService.error(`Error in cartMiddleware: ${error.message}`);
		} else {
			loggerService.error("Unknown error occurred in cartMiddleware.");
		}
		return ctx.reply("An error occurred while setting your cart.");
	}
};
