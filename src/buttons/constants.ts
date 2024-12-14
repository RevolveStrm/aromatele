import { UserLanguage } from "@prisma/client";

export const languageButtons = [
	{ code: UserLanguage.EN, name: "English", flag: "🇬🇧" },
	{ code: UserLanguage.UK, name: "Українська", flag: "🇺🇦" },
	{ code: UserLanguage.FR, name: "Français", flag: "🇫🇷" },
];
