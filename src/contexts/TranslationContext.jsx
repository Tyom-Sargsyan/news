import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useTranslation as i18useTranslation } from "react-i18next";
import translation from "i18next";
import { useLocalStorage } from "../hooks";

export const TranslationContext = createContext({
  language: "",
  setLanguage: () => {},
  t: () => {},
});

export const useTranslation = () => useContext(TranslationContext);

export function TranslationProvider({ children }) {
  const { put, get } = useLocalStorage();
  const localStorageLang = get("lang");
  const [language, setLanguage] = useState(localStorageLang || "en");
  const { t } = i18useTranslation();

  useEffect(() => {
    put("lang", language);
    translation.changeLanguage(language);
  }, [language]);

  useEffect(() => {
    if (localStorageLang) {
      setLanguage(localStorageLang);
    }
  }, []);

  const languageProviderValue = useMemo(
    () => ({
      setLanguage,
      language,
      t: (text) => t(text),
    }),
    [language, setLanguage, t]
  );
  return (
    <TranslationContext.Provider value={languageProviderValue}>
      {children}
    </TranslationContext.Provider>
  );
}
