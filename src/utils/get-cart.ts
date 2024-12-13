import type { CartItem } from "../actions/constants";
import { cacheService } from "../cache/cache-service";

export const getCart = async (cartId: string): Promise<CartItem[]> => {
	const cartCacheData = await cacheService.get(cartId);

	return cartCacheData ? JSON.parse(cartCacheData) : [];
};
