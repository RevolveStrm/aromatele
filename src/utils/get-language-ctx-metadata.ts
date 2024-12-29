import type { UserLanguage } from "@prisma/client";
import type { Context } from "telegraf";

export type LanguageMetadata = UserLanguage;

export const getLanguageMetadata = (ctx: Context): LanguageMetadata => {
  const language: LanguageMetadata = ctx.state.language;

  if (!language) {
    throw new Error("Could not extract language from the state");
  }

  return language;
};
