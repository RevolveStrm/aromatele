import type { Context } from "telegraf";
import { databaseService } from "../database/database-service";
import { loggerService } from "../logger/logger-service";
import { getUserMetadata } from "../utils/get-user-ctx-metadata";

export const viewOrdersAction = async (ctx: Context): Promise<unknown> => {
	try {
		const { userId } = getUserMetadata(ctx);

		const orders = await databaseService.order.findMany({
			where: {
				userId,
			},
		});

		console.log(orders);

		await ctx.reply("Ви ще не зробили жодного замовлення");

		return ctx.answerCbQuery();
	} catch (error: unknown) {
		if (error instanceof Error) {
			loggerService.error(`Error in action []: ${error.message}`);
		} else {
			loggerService.error("Unknown error occurred in action [].");
		}
		return ctx.reply("An error occurred in action [].");
	}
};
