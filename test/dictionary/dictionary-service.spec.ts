import { dictionaryService } from "../../src/dictionary/dictionary-service";
import { TranslationKeys } from "../../src/dictionary/constants";
import type { UserLanguage } from "@prisma/client";

describe("DictionaryService", () => {
  it("should return the correct translation for a valid key and language", () => {
    const key: TranslationKeys = TranslationKeys.MAIN_MENU;
    const language: UserLanguage = "EN";

    const translation = dictionaryService.getTranslation(key, language);

    expect(translation).toBe("Main menu");
  });

  it("should throw an error for an invalid key", () => {
    const invalidKey = "INVALID_KEY" as TranslationKeys;
    const language: UserLanguage = "EN";

    expect(() =>
      dictionaryService.getTranslation(invalidKey, language),
    ).toThrow("Translation not found for key: INVALID_KEY");
  });

  it("should throw an error if a valid key is missing translations for the specified language", () => {
    const key: string = "INVALID_KEY";
    const invalidLanguage = "DE" as UserLanguage;

    expect(() =>
      dictionaryService.getTranslation(key as TranslationKeys, invalidLanguage),
    ).toThrow();
  });

  it("should handle multi-language translations correctly", () => {
    const key: TranslationKeys = TranslationKeys.CART;
    const ukTranslation = dictionaryService.getTranslation(key, "UK");
    const frTranslation = dictionaryService.getTranslation(key, "FR");

    expect(ukTranslation).toBe("Мій кошик");
    expect(frTranslation).toBe("Mon panier");
  });

  it("should handle keys with no translation gracefully", () => {
    const key = "UNSUPPORTED_KEY" as TranslationKeys;
    const language: UserLanguage = "EN";

    expect(() => dictionaryService.getTranslation(key, language)).toThrow(
      `Translation not found for key: ${key}`,
    );
  });
});
