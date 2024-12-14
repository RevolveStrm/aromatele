import { UserLanguage } from "@prisma/client";

export type LanguageButton = {
	code: UserLanguage;
	name: string;
	flag: string;
};

export const languageButtons: LanguageButton[] = [
	{ code: UserLanguage.EN, name: "English", flag: "🇬🇧" },
	{ code: UserLanguage.UK, name: "Українська", flag: "🇺🇦" },
	{ code: UserLanguage.FR, name: "Français", flag: "🇫🇷" },
];
