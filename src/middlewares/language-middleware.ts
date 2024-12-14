import type { UserLanguage } from "@prisma/client";
import type { Context, MiddlewareFn } from "telegraf";
import { getLanguageButtons } from "../buttons/language-buttons";
import { loggerService } from "../logger/logger-service";
import { catchActionError } from "../utils/catch-action-error";

export const languageMiddleware: MiddlewareFn<Context> = async (
	ctx: Context,
	next: () => Promise<void>,
): Promise<unknown> => {
	try {
		const lang: UserLanguage = ctx.state.user?.language;

		if (!lang) {
			//@ts-ignore
			if (ctx.update?.callback_query?.data?.includes("language")) {
				return next();
			}

			return ctx.reply("Language? Мова? Langue?", {
				reply_markup: {
					inline_keyboard: getLanguageButtons(),
				},
			});
		}

		ctx.state.language = lang as UserLanguage;

		return next();
	} catch (error: unknown) {
		if (error instanceof Error) {
			loggerService.error(`Error in languageMiddleware: ${error.message}`);
		} else {
			loggerService.error("Unknown error occurred in languageMiddleware.");
		}
		catchActionError(ctx);
	}
};
