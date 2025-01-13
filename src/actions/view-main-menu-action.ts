import type { Context } from "telegraf";
import { getMainMenuButtons } from "../buttons/main-menu-buttons";
import { TranslationKeys } from "../dictionary/constants";
import { dictionaryService } from "../dictionary/dictionary-service";
import { loggerService } from "../logger/logger-service";
import { catchActionError } from "../utils/catch-action-error";
import { getLanguageMetadata } from "../utils/get-language-ctx-metadata";

export const viewMainMenuAction = async (ctx: Context): Promise<unknown> => {
  try {
    const language = getLanguageMetadata(ctx);

    return ctx.reply(
      dictionaryService.getTranslation(TranslationKeys.CHOOSE_OPTION, language),
      {
        reply_markup: {
          inline_keyboard: getMainMenuButtons(language),
        },
      },
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      loggerService.error(
        `Error in action [viewMainMenuAction]: ${error.message}`,
      );
    } else {
      loggerService.error(
        "Unknown error occurred in action [viewMainMenuAction].",
      );
    }
    catchActionError(ctx);
  }
};
