import { languageButtons } from "./constants";

export const getLanguageButtons = () => {
  return languageButtons.map((lang) => [
    {
      text: `${lang.flag} ${lang.name}`,
      callback_data: `language_${lang.code}`,
    },
  ]);
};
