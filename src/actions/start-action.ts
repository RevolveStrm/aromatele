import type { Context } from "telegraf";
import { getMainMenu } from "./constants";

export const startAction = async (ctx: Context) => {
	//TODO: Localization
	await ctx.reply("Ласкаво просимо до Aromatele!");

	//TODO: Localization
	await ctx.reply("Виберіть одну з опцій:", {
		reply_markup: {
			inline_keyboard: getMainMenu("UA"), //TODO:
		},
	});
};
