import type { Order } from "@prisma/client";
import type { Context } from "telegraf";
import { getBackToMainMenuButton } from "../buttons/back-to-main-menu";
import { calcCartTotalAmount, getCart, nullifyCart } from "../cart/cart";
import { TranslationKeys } from "../dictionary/constants";
import { dictionaryService } from "../dictionary/dictionary-service";
import { environmentService } from "../env/env-service";
import { loggerService } from "../logger/logger-service";
import { createOrderTransaction } from "../order/order";
import { stripeService } from "../payment/stripe-service";
import { catchActionError } from "../utils/catch-action-error";
import { getLanguageMetadata } from "../utils/get-language-ctx-metadata";
import { getUserMetadata } from "../utils/get-user-ctx-metadata";
import type { CartItem } from "./constants";

export const checkoutAction = async (ctx: Context): Promise<unknown> => {
  try {
    const { userId, cartId, chatId } = getUserMetadata(ctx);

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

    const lineItems = cart.map((item: CartItem) => ({
      price_data: {
        currency: "uah",
        product_data: { name: item.title },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    const session = await stripeService.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${environmentService.get("ORIGIN_URL")}/success.html`,
      cancel_url: `${environmentService.get("ORIGIN_URL")}/cancel.html`,
      metadata: {
        userId,
        chatId,
      },
    });

    if (!session?.id) {
      throw new Error("Could not receive payment identifier");
    }

    if (!session?.url) {
      throw new Error("Could not generate payment session link");
    }

    const totalAmount: number = calcCartTotalAmount(cart);

    const createdOrder: Order | null = await createOrderTransaction(
      cart,
      totalAmount,
      userId,
      session.id,
    );

    if (createdOrder) {
      await nullifyCart(cartId);
    }

    return ctx.editMessageText(
      `🎉 ${dictionaryService.getTranslation(TranslationKeys.ORDER_CREATED_WITH_ID, language)} #${createdOrder.id}`,
      {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "💵🌐 Посилання для оплати",
                url: session?.url,
              },
            ],
            [...getBackToMainMenuButton(language)],
          ],
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
