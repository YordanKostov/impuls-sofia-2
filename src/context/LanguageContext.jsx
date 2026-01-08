// src/context/LanguageContext.js
import { createContext, useState, useContext } from "react";
import { CONTENT } from "../translation";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("bg"); // Default to Bulgarian

  // This helper function gets the text based on current language
  const t = CONTENT[lang];

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
