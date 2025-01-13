import { OrderStatus } from "@prisma/client";
import type { Request, Response } from "express";
import QRCode from "qrcode";
import type Stripe from "stripe";
import type { Telegraf } from "telegraf";
import { inlineKeyboard } from "telegraf/markup";
import { getBackToMainMenuButton } from "../buttons/back-to-main-menu";
import { databaseService } from "../database/database-service";
import { loggerService } from "../logger/logger-service";
import { completedPaymentMessage } from "./constant";
import { stripeService } from "./stripe-service";

export type SessionMetadata = {
  userId: string;
  chatId: string;
};

export const createWebhookHandler =
  (bot: Telegraf, secret: string) => async (req: Request, res: Response) => {
    const signature = req.headers?.["stripe-signature"];

    if (!signature) {
      return res.status(400).json({ error: "BAD_WEBHOOK_SIGNATURE" });
    }

    try {
      const event: Stripe.Event = stripeService.webhooks.constructEvent(
        req.body,
        signature,
        secret,
      );

      if (!event) {
        throw new Error("COULD_NOT_CONSTRUCT_EVENT");
      }

      await handleWebhookEvent(bot, event);

      res.json({ received: true });
    } catch (err) {
      if (err instanceof Error) {
        loggerService.error(err.message);
      }
      res.status(400).send("WEBHOOK_ERROR");
    }
  };

const handleWebhookEvent = async (
  bot: Telegraf,
  event: Stripe.Event,
): Promise<void> => {
  try {
    if (event.type !== "checkout.session.completed") {
      return;
    }
    const session: Stripe.Checkout.Session = event.data.object;

    const paymentId: string = session.id;

    const { userId, chatId } = extractSessionMetadata(session.metadata);

    await databaseService.order.updateMany({
      where: {
        userId,
        paymentId,
      },
      data: {
        status: OrderStatus.PROCESSING,
      },
    });

    const order = await databaseService.order.findFirst({
      where: {
        userId,
        paymentId,
        status: OrderStatus.PROCESSING,
      },
    });

    const QRCodeData = {
      paymentId,
      userId,
      paidAt: order?.updatedAt,
    };

    const buffer: Buffer<ArrayBufferLike> = await QRCode.toBuffer(
      JSON.stringify(QRCodeData),
    );

    await bot.telegram.sendMessage(
      chatId,
      completedPaymentMessage(order?.id as number),
    );

    await bot.telegram.sendPhoto(chatId, { source: buffer });
  } catch (error) {
    console.error(error);
  }
};

const extractSessionMetadata = (metadata: unknown): SessionMetadata => {
  return metadata as SessionMetadata;
};
