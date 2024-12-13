import type { Context } from "telegraf";

export type ProductMetadata = {
	productId: string;
};

export const getProductMetadata = (ctx: Context): ProductMetadata => {
	//@ts-ignore
	const productId = ctx?.match[1];

	if (!productId) {
		throw new Error("Could not extract product id from the state");
	}

	return {
		productId,
	};
};
