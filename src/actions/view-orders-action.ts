import type { Context } from "telegraf";
import { getBackToMainMenuButton } from "../buttons/back-to-main-menu";
import { TranslationKeys } from "../dictionary/constants";
import { dictionaryService } from "../dictionary/dictionary-service";
import { loggerService } from "../logger/logger-service";
import { getUserOrders } from "../order/order";
import { catchActionError } from "../utils/catch-action-error";
import { getLanguageMetadata } from "../utils/get-language-ctx-metadata";
import { getUserMetadata } from "../utils/get-user-ctx-metadata";
import { getOrdersMessage } from "./constants";

export const viewOrdersAction = async (ctx: Context): Promise<unknown> => {
  try {
    const { userId } = getUserMetadata(ctx);

    const language = getLanguageMetadata(ctx);

    const orders = await getUserOrders(userId);

    if (!orders?.length) {
      return ctx.editMessageText(
        dictionaryService.getTranslation(
          TranslationKeys.NO_ORDERS_MADE,
          language,
        ),
        {
          reply_markup: {
            inline_keyboard: [getBackToMainMenuButton(language)],
          },
        },
      );
    }

    const ordersMessage = getOrdersMessage(orders, language);

    return ctx.editMessageText(ordersMessage, {
      reply_markup: {
        inline_keyboard: [getBackToMainMenuButton(language)],
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      loggerService.error(
        `Error in action [viewOrdersAction]: ${error.message}`,
      );
    } else {
      loggerService.error(
        "Unknown error occurred in action [viewOrdersAction].",
      );
    }
    catchActionError(ctx);
  }
};
