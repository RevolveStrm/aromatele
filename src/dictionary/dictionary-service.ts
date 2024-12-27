import type { UserLanguage } from "@prisma/client";
import {
  type Translation,
  type TranslationKeys,
  translations,
} from "./constants";

export class DictionaryService {
  private translations: Record<TranslationKeys, Translation> = translations;

  public getTranslation(key: TranslationKeys, language: UserLanguage): string {
    const translation = this.translations[key];
    if (!translation) {
      throw new Error(`Translation not found for key: ${key}`);
    }
    return translation[language];
  }
}

export const dictionaryService = new DictionaryService();
