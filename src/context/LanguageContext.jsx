import { createContext, useState, useContext, useEffect, useMemo } from "react";
import { CONTENT } from "../translation";

const LanguageContext = createContext();
const STORAGE_KEY = "impuls-lang";

function getInitialLang() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && CONTENT[saved]) return saved;
  } catch {
    // Storage can be unavailable (private mode); fall back to the default
  }
  return "bg"; // Default to Bulgarian
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(getInitialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // Ignore: the choice just won't persist
    }
  }, [lang]);

  const value = useMemo(() => ({ lang, setLang, t: CONTENT[lang] }), [lang]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useLanguage = () => useContext(LanguageContext);
