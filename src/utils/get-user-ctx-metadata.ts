import type { Context } from "telegraf";

export type UserMetadata = {
  userId: string;
  cartId: string;
  chatId: string;
};

export const getUserMetadata = (ctx: Context): UserMetadata => {
  const userId = ctx.state.user.id;
  const chatId = ctx.state.user.telegramUserId;

  if (!userId) {
    throw new Error("Could not extract user id from the state");
  }

  const cartId = `cart:${userId}`;

  return {
    userId,
    chatId,
    cartId,
  };
};
