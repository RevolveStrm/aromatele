import type { Context } from "telegraf";
import { getBackToMainMenuButton } from "../buttons/back-to-main-menu";
import { getCartButtons } from "../buttons/cart-buttons";
import { TranslationKeys } from "../dictionary/constants";
import { dictionaryService } from "../dictionary/dictionary-service";
import { loggerService } from "../logger/logger-service";
import { getCart } from "../utils/get-cart";
import { getUserMetadata } from "../utils/get-user-ctx-metadata";
import { getCartMessage } from "./constants";

export const viewCartAction = async (ctx: Context): Promise<unknown> => {
	try {
		const { cartId } = getUserMetadata(ctx);

		const cart = await getCart(cartId);

		const cartMessage = getCartMessage(cart);

		const cartButtons = getCartButtons(cart);

		return await ctx.editMessageText(cartMessage, {
			reply_markup: {
				inline_keyboard: [...cartButtons, getBackToMainMenuButton()],
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
