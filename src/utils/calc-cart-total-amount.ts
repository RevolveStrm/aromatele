import type { CartItem } from "../actions/constants";

export const calcCartTotalAmount = (cart: CartItem[]) =>
	cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
