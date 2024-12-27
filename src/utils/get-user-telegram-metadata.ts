import type { Context } from "telegraf";

export type UserTelegramMetadata = {
  telegramUserId: number;
  telegramUserName: string | null;
};

export const getUserTelegramMetadata = (ctx: Context): UserTelegramMetadata => {
  const telegramUserId = ctx.from?.id;
  const telegramUserName = ctx.from?.username ?? null;

  if (!telegramUserId) {
    throw new Error("Could not extract user telegram metadata from the state");
  }

  return {
    telegramUserId,
    telegramUserName,
  };
};
