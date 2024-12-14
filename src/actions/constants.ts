import exp from "constants";
import type { Order, OrderStatus, Product, UserLanguage } from "@prisma/client";
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
	CHOOSE_LANGUAGE = "language_(.+)",
	CHOOSE_PRODUCT = "product_(.+)",
}

export const getCartMessage = (
	cart: CartItem[],
	lang: UserLanguage,
): string => {
	if (!cart || !cart.length) {
		return dictionaryService.getTranslation(TranslationKeys.CART_EMPTY, lang);
	}

	let cartMessage = `🛒 ${dictionaryService.getTranslation(TranslationKeys.CART, lang)}:\n\n`;

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

export const getOrdersMessage = (orders: Order[]): string => {
	let ordersMessage = "Історія ваших замовлень:\n\n";

	orders.forEach((order: Order, index) => {
		ordersMessage += `Номер замовлення: #${order.id}\n`;
		ordersMessage += `    └ Загальна вартість: ${order.totalAmount} грн\n`;
		ordersMessage += `    └ Статус: ${getOrderStatus(order.status)}\n`;
		ordersMessage += `    └ Дата: ${new Date(order.createdAt).toLocaleString("uk-UA")}\n`;
		ordersMessage += "\n---\n";
	});

	return ordersMessage;
};

const getOrderStatus = (status: OrderStatus) => {
	return status === "CREATED" ? "очікує в закладі" : "в обробці";
};
