import type { Context } from "telegraf";
import { databaseService } from "../database/database-service";
import { TranslationKeys } from "../dictionary/constants";
import { dictionaryService } from "../dictionary/dictionary-service";
import { loggerService } from "../logger/logger-service";
import { catchActionError } from "../utils/catch-action-error";
import { getLanguageMetadata } from "../utils/get-language-ctx-metadata";
import { ACTION_PATH } from "./constants";

export const viewEstablishmentMenuAction = async (
  ctx: Context,
): Promise<unknown> => {
  try {
    const language = getLanguageMetadata(ctx);

    const categories = await databaseService.category.findMany({
      include: {
        products: true,
      },
    });

    if (!categories || categories.length === 0) {
      return ctx.reply(
        dictionaryService.getTranslation(
          TranslationKeys.NO_CATEGORIES_AVAILABLE,
          language,
        ),
      );
    }

    const categoryMenu = categories.map((category) => [
      { text: category.title, callback_data: `category_${category.id}` },
    ]);

    categoryMenu.push([
      {
        text: `⬅️ ${dictionaryService.getTranslation(TranslationKeys.BACK_TO_MENU, language)}`,
        callback_data: ACTION_PATH.VIEW_MAIN_MENU,
      },
    ]);

    return ctx.editMessageText(
      dictionaryService.getTranslation(
        TranslationKeys.SELECT_CATEGORY,
        language,
      ),
      {
        reply_markup: {
          inline_keyboard: categoryMenu,
        },
      },
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      loggerService.error(
        `Error in action [viewEstablishmentMenuAction]: ${error.message}`,
      );
    } else {
      loggerService.error(
        "Unknown error occurred in action [viewEstablishmentMenuAction].",
      );
    }
    catchActionError(ctx);
  }
};
