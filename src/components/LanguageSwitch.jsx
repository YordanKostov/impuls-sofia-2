import { useLanguage } from "../context/LanguageContext";

const LANGS = ["bg", "en"];

export default function LanguageSwitch({ size = "sm" }) {
  const { lang, setLang } = useLanguage();
  const pad = size === "lg" ? "px-6 py-2" : "px-3 py-1";

  return (
    <div className="flex items-center rounded-full border border-ink/10 bg-white/60 p-1">
      {LANGS.map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLang(code)}
          aria-pressed={lang === code}
          className={`${pad} rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
            lang === code
              ? "bg-ink text-white shadow-sm"
              : "text-ink-500 hover:text-ink"
          }`}
        >
          {code}
        </button>
      ))}
    </div>
  );
}
