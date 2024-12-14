import type { Context } from "telegraf";
import { getBackToMainMenuButton } from "../buttons/back-to-main-menu";
import { getCartButtons } from "../buttons/cart-buttons";
import { loggerService } from "../logger/logger-service";
import { catchActionError } from "../utils/catch-action-error";
import { getCart } from "../utils/get-cart";
import { getLanguageMetadata } from "../utils/get-language-ctx-metadata";
import { getUserMetadata } from "../utils/get-user-ctx-metadata";
import { getCartMessage } from "./constants";

export const viewCartAction = async (ctx: Context): Promise<unknown> => {
	try {
		const { cartId } = getUserMetadata(ctx);

		const language = getLanguageMetadata(ctx);

		const cart = await getCart(cartId);

		const cartMessage = getCartMessage(cart, language);

		const cartButtons = getCartButtons(cart, language);

		return ctx.editMessageText(cartMessage, {
			reply_markup: {
				inline_keyboard: [...cartButtons, getBackToMainMenuButton(language)],
			},
		});
	} catch (error: unknown) {
		if (error instanceof Error) {
			loggerService.error(`Error in action [viewCartAction]: ${error.message}`);
		} else {
			loggerService.error("Unknown error occurred in action [viewCartAction].");
		}
		catchActionError(ctx);
	}
};
