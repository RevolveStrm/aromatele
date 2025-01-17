import {
  getUserTelegramMetadata,
  type UserTelegramMetadata,
} from "../../src/utils/get-user-telegram-metadata";
import type { Context } from "telegraf";

describe("getUserTelegramMetadata", () => {
  it("should return user telegram metadata when ctx.from contains valid data", () => {
    const mockCtx = {
      from: {
        id: 12345,
        username: "testuser",
      },
    } as unknown as Context;

    const result: UserTelegramMetadata = getUserTelegramMetadata(mockCtx);

    expect(result).toEqual({
      telegramUserId: 12345,
      telegramUserName: "testuser",
    });
  });

  it("should return user telegram metadata with null username if username is missing", () => {
    const mockCtx = {
      from: {
        id: 67890,
      },
    } as unknown as Context;

    const result: UserTelegramMetadata = getUserTelegramMetadata(mockCtx);

    expect(result).toEqual({
      telegramUserId: 67890,
      telegramUserName: null,
    });
  });

  it("should throw an error when ctx.from is undefined", () => {
    const mockCtx = {
      from: undefined,
    } as unknown as Context;

    expect(() => getUserTelegramMetadata(mockCtx)).toThrow(
      "Could not extract user telegram metadata from the state",
    );
  });

  it("should throw an error when ctx.from.id is undefined", () => {
    const mockCtx = {
      from: {
        username: "testuser",
      },
    } as unknown as Context;

    expect(() => getUserTelegramMetadata(mockCtx)).toThrow(
      "Could not extract user telegram metadata from the state",
    );
  });
});
