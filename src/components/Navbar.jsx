import Container from "./Container.jsx";
import { Link } from "react-router-dom";
import MobileMenu from "./MobileMenu.jsx";
import logo from "../assets/logo.png";
import { useLanguage } from "../context/LanguageContext";

export default function Navbar() {
  const { t, lang, setLang } = useLanguage();
  const nav = t.navbar.links;

  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-white/80 border-b border-gray-100">
      <Container>
        <nav className="flex items-center justify-between h-20">
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-white shadow-sm group-hover:shadow-md transition-shadow">
              <img
                src={logo}
                alt="Dance Studio logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="font-bold text-gray-900">Impuls Sofia</div>
              <div className="text-xs text-gray-500 -mt-0.5 tracking-wide">
                {t.navbar.subtitle}
              </div>
            </div>
          </Link>

          {/* Desktop Menu (Hidden on Mobile) */}
          <div className="hidden md:flex items-center gap-6">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
              >
                {n.label}
              </Link>
            ))}

            {/* Desktop Language Switcher */}
            <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-full mx-2">
              <button
                onClick={() => setLang("bg")}
                className={`px-3 py-1 text-xs font-bold rounded-full transition-all ${
                  lang === "bg"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                BG
              </button>
              <button
                onClick={() => setLang("en")}
                className={`px-3 py-1 text-xs font-bold rounded-full transition-all ${
                  lang === "en"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                EN
              </button>
            </div>

            <Link
              to="/contact"
              className="inline-block px-6 py-2.5 rounded-full bg-gray-900 text-white text-sm font-semibold shadow-md hover:bg-gray-800 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
            >
              {t.navbar.bookBtn}
            </Link>
          </div>

          {/* Mobile Menu - Passing down the props */}
          <MobileMenu nav={nav} lang={lang} setLang={setLang} t={t} />
        </nav>
      </Container>
    </header>
  );
}
