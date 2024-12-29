import path from "node:path";
import type { Context } from "telegraf";
import { getMainMenuButtons } from "../buttons/main-menu-buttons";
import { TranslationKeys } from "../dictionary/constants";
import { dictionaryService } from "../dictionary/dictionary-service";
import { environmentService } from "../env/env-service";
import { getLanguageMetadata } from "../utils/get-language-ctx-metadata";

export const startAction = async (ctx: Context) => {
  const language = getLanguageMetadata(ctx);

  const imagePath = path.resolve(__dirname, "../../public/aromatele.png");

  const welcomeMessage = `${dictionaryService.getTranslation(TranslationKeys.WELCOME_TO, language)} ${environmentService.get("ESTABLISHMENT_NAME")}!`;

  const descriptionMessage = dictionaryService.getTranslation(
    TranslationKeys.CAFE_DESCRIPTION,
    language,
  );

  await ctx.sendPhoto({ source: imagePath });

  await ctx.reply(welcomeMessage);

  await ctx.reply(descriptionMessage);

  return ctx.reply(
    dictionaryService.getTranslation(TranslationKeys.CHOOSE_OPTION, language),
    {
      reply_markup: {
        inline_keyboard: getMainMenuButtons(language),
      },
    },
  );
};
