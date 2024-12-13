export type Translation = {
	EN: string;
	UA: string;
};

export enum TranslationKeys {
	MAIN_MENU = "MAIN_MENU",
	ESTABLISHMENT_MENU = "ESTABLISHMENT_MENU",
	CART = "CART",
	ORDERS = "ORDERS",
	MAP = "MAP",
	SUPPORT = "SUPPORT",
	CART_EMPTY = "CART_EMPTY",
	ITEM_ADDED = "ITEM_ADDED",
	ITEM_REMOVED = "ITEM_REMOVED",
	CHECKOUT = "CHECKOUT",
	ORDER_PLACED = "ORDER_PLACED",
	ORDER_CANCELLED = "ORDER_CANCELLED",
	CONFIRMATION_REQUIRED = "CONFIRMATION_REQUIRED",
	CONFIRMATION_SUCCESS = "CONFIRMATION_SUCCESS",
	CONFIRMATION_FAILED = "CONFIRMATION_FAILED",
	LOADING = "LOADING",
	ERROR_GENERIC = "ERROR_GENERIC",
	ERROR_NETWORK = "ERROR_NETWORK",
	ERROR_INVALID_INPUT = "ERROR_INVALID_INPUT",
	SUCCESS = "SUCCESS",
	BACK = "BACK",
	YES = "YES",
	NO = "NO",
	CLOSE = "CLOSE",
	SETTINGS = "SETTINGS",
	LANGUAGE_CHANGED = "LANGUAGE_CHANGED",
	HELP = "HELP",
	CONTACT_US = "CONTACT_US",
	FEEDBACK = "FEEDBACK",
	LOGOUT = "LOGOUT",
	LOGIN = "LOGIN",
	REGISTER = "REGISTER",
	PASSWORD_RESET = "PASSWORD_RESET",
	USERNAME = "USERNAME",
	PASSWORD = "PASSWORD",
	EMAIL = "EMAIL",
	ADDRESS = "ADDRESS",
	PHONE = "PHONE",
	SAVE = "SAVE",
	EDIT = "EDIT",
	DELETE = "DELETE",
	ADD = "ADD",
	REMOVE = "REMOVE",
	CONFIRM = "CONFIRM",
}

export const translations: Record<TranslationKeys, Translation> = {
	MAIN_MENU: {
		EN: "Main menu",
		UA: "Головне меню",
	},
	ESTABLISHMENT_MENU: {
		EN: "Cafe menu",
		UA: "Меню закладу",
	},
	CART: {
		EN: "My cart",
		UA: "Мій кошик",
	},
	ORDERS: {
		EN: "My orders",
		UA: "Мої замовлення",
	},
	MAP: {
		EN: "Cafe location",
		UA: "Карта закладу",
	},
	SUPPORT: {
		EN: "Support",
		UA: "Підтримка",
	},
	CART_EMPTY: {
		EN: "Your cart is empty",
		UA: "Ваш кошик порожній",
	},
	ITEM_ADDED: {
		EN: "Item added to your cart",
		UA: "Товар додано до вашого кошика",
	},
	ITEM_REMOVED: {
		EN: "Item removed from your cart",
		UA: "Товар видалено з вашого кошика",
	},
	CHECKOUT: {
		EN: "Proceed to checkout",
		UA: "Перейти до оформлення",
	},
	ORDER_PLACED: {
		EN: "Your order has been placed successfully",
		UA: "Ваше замовлення було успішно оформлене",
	},
	ORDER_CANCELLED: {
		EN: "Your order has been cancelled",
		UA: "Ваше замовлення було скасоване",
	},
	CONFIRMATION_REQUIRED: {
		EN: "Confirmation required",
		UA: "Потрібне підтвердження",
	},
	CONFIRMATION_SUCCESS: {
		EN: "Confirmation successful",
		UA: "Підтвердження успішне",
	},
	CONFIRMATION_FAILED: {
		EN: "Confirmation failed",
		UA: "Помилка підтвердження",
	},
	LOADING: {
		EN: "Loading...",
		UA: "Завантаження...",
	},
	ERROR_GENERIC: {
		EN: "An error occurred",
		UA: "Сталася помилка",
	},
	ERROR_NETWORK: {
		EN: "Network error",
		UA: "Помилка мережі",
	},
	ERROR_INVALID_INPUT: {
		EN: "Invalid input",
		UA: "Неправильний ввід",
	},
	SUCCESS: {
		EN: "Success",
		UA: "Успішно",
	},
	BACK: {
		EN: "Back",
		UA: "Назад",
	},
	YES: {
		EN: "Yes",
		UA: "Так",
	},
	NO: {
		EN: "No",
		UA: "Ні",
	},
	CLOSE: {
		EN: "Close",
		UA: "Закрити",
	},
	SETTINGS: {
		EN: "Settings",
		UA: "Налаштування",
	},
	LANGUAGE_CHANGED: {
		EN: "Language has been changed",
		UA: "Мову змінено",
	},
	HELP: {
		EN: "Help",
		UA: "Допомога",
	},
	CONTACT_US: {
		EN: "Contact us",
		UA: "Зв'яжіться з нами",
	},
	FEEDBACK: {
		EN: "Feedback",
		UA: "Зворотній зв'язок",
	},
	LOGOUT: {
		EN: "Logout",
		UA: "Вийти",
	},
	LOGIN: {
		EN: "Login",
		UA: "Увійти",
	},
	REGISTER: {
		EN: "Register",
		UA: "Реєстрація",
	},
	PASSWORD_RESET: {
		EN: "Reset password",
		UA: "Скинути пароль",
	},
	USERNAME: {
		EN: "Username",
		UA: "Ім'я користувача",
	},
	PASSWORD: {
		EN: "Password",
		UA: "Пароль",
	},
	EMAIL: {
		EN: "Email",
		UA: "Електронна пошта",
	},
	ADDRESS: {
		EN: "Address",
		UA: "Адреса",
	},
	PHONE: {
		EN: "Phone",
		UA: "Телефон",
	},
	SAVE: {
		EN: "Save",
		UA: "Зберегти",
	},
	EDIT: {
		EN: "Edit",
		UA: "Редагувати",
	},
	DELETE: {
		EN: "Delete",
		UA: "Видалити",
	},
	ADD: {
		EN: "Add",
		UA: "Додати",
	},
	REMOVE: {
		EN: "Remove",
		UA: "Видалити",
	},
	CONFIRM: {
		EN: "Confirm",
		UA: "Підтвердити",
	},
};
