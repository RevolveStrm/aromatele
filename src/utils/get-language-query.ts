import type { UserLanguage } from "@prisma/client";
import type { Context } from "telegraf";

export type LanguageMetadata = "UA" | "EN";

export const getLanguageQuery = (ctx: Context): UserLanguage => {
	//@ts-ignore
	const languageCode = ctx?.match[1];

	if (!languageCode) {
		throw new Error("Could not extract language code from the query");
	}

	return languageCode;
};
