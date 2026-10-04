import Container from "./Container.jsx";
import { Link, NavLink } from "react-router-dom";
import MobileMenu from "./MobileMenu.jsx";
import LanguageSwitch from "./LanguageSwitch.jsx";
import logo from "../assets/logo.png";
import { useLanguage } from "../context/LanguageContext";

export default function Navbar() {
  const { t } = useLanguage();
  const nav = t.navbar.links;

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-paper/80 backdrop-blur-md">
      <Container>
        <nav className="relative flex h-20 items-center justify-between">
          {/* Logo Section */}
          <Link to="/" className="group flex items-center gap-3">
            <img
              src={logo}
              alt=""
              width="48"
              height="48"
              className="h-12 w-12 rounded-full object-cover shadow-soft transition-transform duration-500 group-hover:rotate-6"
            />
            <div>
              <div className="font-display text-2xl font-semibold leading-none text-ink">
                Impuls Sofia
              </div>
              <div className="mt-1 hidden whitespace-nowrap text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-ink-500 sm:block lg:hidden xl:block">
                {t.navbar.subtitle}
              </div>
            </div>
          </Link>

          {/* Desktop Menu (Hidden on Mobile) */}
          <div className="hidden items-center gap-5 lg:flex xl:gap-7">
            {nav.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                end={n.to === "/"}
                className={({ isActive }) =>
                  `relative whitespace-nowrap py-2 text-[0.95rem] font-semibold transition-colors after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:origin-left after:rounded-full after:bg-mint-600 after:transition-transform after:duration-300 ${
                    isActive
                      ? "text-ink after:scale-x-100"
                      : "text-ink-500 after:scale-x-0 hover:text-ink hover:after:scale-x-100"
                  }`
                }
              >
                {n.label}
              </NavLink>
            ))}

            <LanguageSwitch />

            <Link to="/contact" className="btn-primary whitespace-nowrap px-6 py-2.5 text-sm">
              {t.navbar.bookBtn}
            </Link>
          </div>

          <MobileMenu nav={nav} t={t} />
        </nav>
      </Container>
    </header>
  );
}
