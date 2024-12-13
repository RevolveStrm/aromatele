import { ACTION_PATH, type CartItem } from "../actions/constants";

export const getCartButtons = (
	cart: CartItem[],
): Array<Array<{ text: string; callback_data: string }>> => {
	const buttons = [];

	if (cart?.length) {
		buttons.push([
			{ text: "✅ Оформити замовлення", callback_data: ACTION_PATH.CHECKOUT },
		]);
		buttons.push([
			{ text: "❌ Очистити кошик", callback_data: ACTION_PATH.CLEAR_CART },
		]);
	}

	return buttons;
};
