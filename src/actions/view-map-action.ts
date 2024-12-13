import type { Context } from "telegraf";

export const viewMapAction = (ctx: Context) => {
	const latitude: number = 50.4501;
	const longitude: number = 30.5234;
	//TODO: Localization
	const address: string =
		"вул. Хрещатик, 1, Київ, Україна. Станція метро Майдан Незалежності";
	const mapLink: string = `https://www.google.com/maps?q=${latitude},${longitude}`;

	//TODO: Localization
	ctx.reply(`Адреса нашого нашого закладу:\n\n${address}`, {
		reply_markup: {
			inline_keyboard: [
				[
					{
						text: "🌍 Переглянути на Google Maps",
						url: mapLink,
					},
				],
			],
		},
	});

	return ctx.answerCbQuery();
};
