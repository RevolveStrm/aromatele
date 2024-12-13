import type { Context } from "telegraf";

export type CategoryMetadata = {
	categoryId: string;
};

export const getCategoryMetadata = (ctx: Context): CategoryMetadata => {
	//@ts-ignore
	const categoryId = ctx?.match[1];

	if (!categoryId) {
		throw new Error("Could not extract category id from the state");
	}

	return {
		categoryId,
	};
};
