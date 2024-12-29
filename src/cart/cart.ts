import type { Product } from "@prisma/client";
import type { CartItem } from "../actions/constants";
import { cacheService } from "../cache/cache-service";
import { REDIS_CART_EX } from "./constants";

export const getCart = async (cartId: string): Promise<CartItem[]> => {
  const cartCacheData: string | null = await cacheService.get(cartId);

  return cartCacheData ? JSON.parse(cartCacheData) : [];
};

export const addItemToCart = async (
  cartId: string,
  cart: CartItem[],
  product: Product,
): Promise<void> => {
  const existingCartItem = cart.find(
    (cartItem: CartItem) => cartItem.id === product.id,
  );

  if (!existingCartItem) {
    const newCartItem = {
      id: product.id,
      title: product.title,
      price: product.price,
      quantity: 1,
    };

    cart.push(newCartItem);
  } else {
    existingCartItem.quantity += 1;
  }

  await cacheService.set(cartId, JSON.stringify(cart), {
    EX: REDIS_CART_EX,
  });
};

export const nullifyCart = async (cartId: string) => {
  const clearedCart = JSON.stringify([]);

  await cacheService.set(cartId, clearedCart, {
    EX: REDIS_CART_EX,
  });
};

export const calcCartTotalAmount = (cart: CartItem[]) =>
  cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
