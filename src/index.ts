import "dotenv/config";
import { Telegraf } from "telegraf";
import { checkoutAction } from "./actions/checkout-action";
import { chooseCategoryAction } from "./actions/choose-category-action";
import { chooseProductAction } from "./actions/choose-product-action";
import { clearCartAction } from "./actions/clear-cart-action";
import { ACTION_PATH } from "./actions/constants";
import { startAction } from "./actions/start-action";
import { viewCartAction } from "./actions/view-cart-action";
import { viewEstablishmentMenuAction } from "./actions/view-establishment-menu-action";
import { viewMainMenuAction } from "./actions/view-main-menu-action";
import { viewMapAction } from "./actions/view-map-action";
import { viewOrdersAction } from "./actions/view-orders-action";
import { environmentService } from "./env/env-service";
import { loggerService } from "./logger/logger-service";
import { authMiddleware } from "./middlewares/auth-middleware";
import { cartMiddleware } from "./middlewares/cart-middleware";

loggerService.info("Starting bot. Validating environment values..");

environmentService.validate();

loggerService.info(
	"Starting bot. Environment values have been successfully validated",
);

const bot = new Telegraf(environmentService.get("BOT_TOKEN"));

loggerService.info("Telegraf bot started and listening/waiting for updates..");

bot.use(authMiddleware);

bot.use(cartMiddleware);

bot.start(startAction);

bot.action(ACTION_PATH.VIEW_ESTABLISHMENT_MENU, viewEstablishmentMenuAction);

bot.action(new RegExp(ACTION_PATH.CHOOSE_CATEGORY), chooseCategoryAction);

bot.action(new RegExp(ACTION_PATH.CHOOSE_PRODUCT), chooseProductAction);

bot.action(ACTION_PATH.VIEW_MAIN_MENU, viewMainMenuAction);

bot.action(ACTION_PATH.VIEW_ORDERS, viewOrdersAction);

bot.action(ACTION_PATH.CLEAR_CART, clearCartAction);

bot.action(ACTION_PATH.VIEW_CART, viewCartAction);

bot.action(ACTION_PATH.CHECKOUT, checkoutAction);

bot.action(ACTION_PATH.VIEW_MAP, viewMapAction);

bot.launch();

process.once("SIGINT", () => {
	loggerService.error("SIGINT");
	bot.stop("SIGINT");
});
process.once("SIGTERM", () => {
	loggerService.error("SIGTERM");
	bot.stop("SIGTERM");
});
process.on("unhandledRejection", (reason) => {
	loggerService.error(`Unhandled Rejection: ${reason}`);
});
process.on("uncaughtException", (error) => {
	loggerService.error(`Uncaught Exception: ${error.message}`);
	process.exit(1);
});
