import type { Context } from "telegraf";
import { authMiddleware } from "../../src/middlewares/auth-middleware";

const createMockTelegrafContext = (
  override: Partial<Context> = {},
): Context => {
  const ctx = {
    state: { language: "en" },
    message: null,
    reply: jest.fn(),
    ...override,
  } as unknown as Context;
  return ctx;
};

describe("authMiddleware", () => {
  it("should handle missing Telegram ID gracefully", async () => {
    const ctx = createMockTelegrafContext({
      state: { language: "en" },
      message: {
        message_id: 2,
        date: Math.floor(Date.now() / 1000),
        from: {
          id: NaN,
          is_bot: false,
          first_name: "Test",
          language_code: "en",
        },
        chat: {
          id: 67890,
          type: "private",
          first_name: "Test Chat",
        },
        text: "/start",
      },
    });

    const next = jest.fn();
    await authMiddleware(ctx, next);

    expect(ctx.state.user).toBeUndefined();
    expect(next).not.toHaveBeenCalled();
  });
});
