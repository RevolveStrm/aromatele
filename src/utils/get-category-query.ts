import type { Context } from "telegraf";

export type CategoryQuery = {
	categoryId: string;
};

export const getCategoryQuery = (ctx: Context): CategoryQuery => {
	//@ts-ignore
	const categoryId = ctx?.match[1];

	if (!categoryId) {
		throw new Error("Could not extract category id from the query");
	}

	return {
		categoryId,
	};
};
