import {
  getLanguageMetadata,
  type LanguageMetadata,
} from "../../src/utils/get-language-ctx-metadata";
import type { Context } from "telegraf";
import type { UserLanguage } from "@prisma/client";

describe("getLanguageMetadata", () => {
  it("should return the correct language when it exists in the context state", () => {
    const mockCtx = {
      state: {
        language: "EN",
      },
    } as unknown as Context;

    const result: LanguageMetadata = getLanguageMetadata(mockCtx);

    expect(result).toBe("EN");
  });

  it("should throw an error when the language is not defined in the context state", () => {
    const mockCtx = {
      state: {},
    } as unknown as Context;

    expect(() => getLanguageMetadata(mockCtx)).toThrow(
      "Could not extract language from the state",
    );
  });
});
