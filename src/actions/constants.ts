import type { Product } from "@prisma/client";
import { TranslationKeys } from "../dictionary/constants";
import { dictionaryService } from "../dictionary/dictionary-service";

export type CartItem = Pick<Product, "id" | "title" | "price"> & {
	quantity: number;
};

export enum ACTION_PATH {
	CHECKOUT = "checkout",
	VIEW_MAP = "view_map",
	VIEW_MAIN_MENU = "view_main_menu",
	VIEW_ESTABLISHMENT_MENU = "view_establishment_menu",
	VIEW_CART = "view_cart",
	CLEAR_CART = "clear_cart",
	VIEW_ORDERS = "view_orders",
	VIEW_SUPPORT = "view_support",
	CHOOSE_CATEGORY = "category_(.+)",
	CHOOSE_PRODUCT = "product_(.+)",
}

export const getMainMenu = (lang: "EN" | "UA") => [
	[
		{
			text: dictionaryService.getTranslation(
				TranslationKeys.ESTABLISHMENT_MENU,
				lang,
			),
			callback_data: ACTION_PATH.VIEW_ESTABLISHMENT_MENU,
		},
	],
	[
		{
			text: dictionaryService.getTranslation(TranslationKeys.CART, lang),
			callback_data: ACTION_PATH.VIEW_CART,
		},
	],
	[
		{
			text: dictionaryService.getTranslation(TranslationKeys.ORDERS, lang),
			callback_data: ACTION_PATH.VIEW_ORDERS,
		},
	],
	[
		{
			text: dictionaryService.getTranslation(TranslationKeys.MAP, lang),
			callback_data: ACTION_PATH.VIEW_MAP,
		},
	],
	[
		{
			text: dictionaryService.getTranslation(TranslationKeys.SUPPORT, lang),
			callback_data: ACTION_PATH.VIEW_SUPPORT,
		},
	],
];

export const getCartMessage = (cart: CartItem[]): string => {
	if (!cart || !cart.length) {
		return dictionaryService.getTranslation(TranslationKeys.CART_EMPTY, "UA");
	}

	let cartMessage = "🛒 Ваш кошик:\n\n";

	let totalAmount = 0;

	cart.forEach((item: CartItem, index) => {
		const itemTotal = item.price * item.quantity;
		totalAmount += itemTotal;

		cartMessage += `${index + 1}. ${item.title}\n`;
		cartMessage += `    └ Вартість: ${item.price.toFixed(2)} грн\n`;
		cartMessage += `    └ Кількість: ${item.quantity}\n\n`;
	});

	cartMessage += `Загальна вартість: ${totalAmount.toFixed(2)} грн\n`;

	return cartMessage;
};
