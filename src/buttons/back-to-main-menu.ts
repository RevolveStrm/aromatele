import { ACTION_PATH } from "../actions/constants";

export const getBackToMainMenuButton = () => {
	//TODO: Localization
	return [
		{ text: "⬅️ Назад до меню", callback_data: ACTION_PATH.VIEW_MAIN_MENU },
	];
};
