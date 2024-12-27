import type { Context } from "telegraf";

export type ProductQuery = {
  productId: string;
};

export const getProductQuery = (ctx: Context): ProductQuery => {
  //@ts-ignore
  const productId = ctx?.match[1];

  if (!productId) {
    throw new Error("Could not extract product id from the state");
  }

  return {
    productId,
  };
};
