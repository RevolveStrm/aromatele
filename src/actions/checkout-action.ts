import type { Order } from "@prisma/client";
import type { Context } from "telegraf";
import { getBackToMainMenuButton } from "../buttons/back-to-main-menu";
import { calcCartTotalAmount, getCart, nullifyCart } from "../cart/cart";
import { TranslationKeys } from "../dictionary/constants";
import { dictionaryService } from "../dictionary/dictionary-service";
import { loggerService } from "../logger/logger-service";
import { createOrderTransaction } from "../order/order";
import { catchActionError } from "../utils/catch-action-error";
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

    const createdOrder: Order | null = await createOrderTransaction(
      cart,
      totalAmount,
      userId,
    );

    if (createdOrder) {
      await nullifyCart(cartId);
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
