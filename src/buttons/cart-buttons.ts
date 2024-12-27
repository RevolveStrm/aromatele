import type { UserLanguage } from "@prisma/client";
import { ACTION_PATH, type CartItem } from "../actions/constants";
import { TranslationKeys } from "../dictionary/constants";
import { dictionaryService } from "../dictionary/dictionary-service";

export const getCartButtons = (
  cart: CartItem[],
  language: UserLanguage,
): Array<Array<{ text: string; callback_data: string }>> => {
  const buttons = [];

  if (cart?.length) {
    buttons.push([
      {
        text: `✅ ${dictionaryService.getTranslation(TranslationKeys.PLACE_ORDER, language)}`,
        callback_data: ACTION_PATH.CHECKOUT,
      },
    ]);
    buttons.push([
      {
        text: `❌ ${dictionaryService.getTranslation(TranslationKeys.CLEAR_CART, language)}`,
        callback_data: ACTION_PATH.CLEAR_CART,
      },
    ]);
  }

  return buttons;
};
