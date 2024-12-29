import {
  type Order,
  OrderStatus,
  type Product,
  type UserLanguage,
} from "@prisma/client";
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
  language: UserLanguage,
): string => {
  if (!cart || !cart.length) {
    return dictionaryService.getTranslation(
      TranslationKeys.CART_EMPTY,
      language,
    );
  }

  let cartMessage = `🛒 ${dictionaryService.getTranslation(TranslationKeys.YOUR_CART, language)}:\n\n`;

  let totalAmount = 0;

  cart.forEach((item: CartItem, index) => {
    const itemTotal = item.price * item.quantity;
    totalAmount += itemTotal;

    cartMessage += `${index + 1}. ${item.title}\n`;
    cartMessage += `   -${dictionaryService.getTranslation(TranslationKeys.PRICE, language)}: ${item.price.toFixed(2)} ₴\n`;
    cartMessage += `   -${dictionaryService.getTranslation(TranslationKeys.QUANTITY, language)}: ${item.quantity}\n\n`;
  });

  cartMessage += `${dictionaryService.getTranslation(TranslationKeys.TOTAL_AMOUNT, language)}: ${totalAmount.toFixed(2)} ₴\n`;

  return cartMessage;
};

export const getOrdersMessage = (
  orders: Order[],
  language: UserLanguage,
): string => {
  let ordersMessage = `${dictionaryService.getTranslation(TranslationKeys.ORDERS_HISTORY, language)}:\n\n`;

  orders.forEach((order: Order, index) => {
    ordersMessage += `${dictionaryService.getTranslation(TranslationKeys.ORDER_ID, language)}: #${order.id}\n`;
    ordersMessage += `   - ${dictionaryService.getTranslation(TranslationKeys.TOTAL_AMOUNT, language)}: ${order.totalAmount} грн\n`;
    ordersMessage += `   - ${dictionaryService.getTranslation(TranslationKeys.ORDER_STATUS, language)}: ${getOrderStatus(order.status, language).toLowerCase()}\n`;
    ordersMessage += `   - ${dictionaryService.getTranslation(TranslationKeys.ORDER_DATE, language)}: ${new Date(order.createdAt).toLocaleString("uk-UA")}\n`;

    ordersMessage += "\n\n";
  });

  return ordersMessage;
};

const getOrderStatus = (status: OrderStatus, language: UserLanguage) => {
  //TODO: fix later
  return status === OrderStatus.CREATED
    ? dictionaryService.getTranslation(
        TranslationKeys.WAITING_IN_STORE,
        language,
      )
    : dictionaryService.getTranslation(
        TranslationKeys.ORDER_PROCESSING,
        language,
      );
};
