import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "../translations/en.json";
import ru from "../translations/ru.json";
import hy from "../translations/hy.json";

const resources = {
  en: {
    translation: en,
  },
  ru: {
    translation: ru,
  },
  hy: {
    translation: hy,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en",

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
