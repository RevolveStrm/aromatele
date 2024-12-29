import type { Order } from "@prisma/client";
import type { CartItem } from "../actions/constants";
import { databaseService } from "../database/database-service";

export const getUserOrders = async (userId: string): Promise<Order[]> => {
  return await databaseService.order.findMany({
    where: {
      userId,
    },
  });
};

export const createOrderTransaction = async (
  cart: CartItem[],
  totalAmount: number,
  userId: string,
): Promise<Order> => {
  return await databaseService.$transaction(async (prisma) => {
    const order = await prisma.order.create({
      data: {
        userId,
        totalAmount,
      },
    });

    const orderProducts = cart.map((item) => ({
      orderId: order.id,
      productId: item.id,
    }));

    await prisma.orderProduct.createMany({
      data: orderProducts,
    });

    return order;
  });
};
