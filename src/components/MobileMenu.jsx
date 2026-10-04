import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import LanguageSwitch from "./LanguageSwitch.jsx";

export default function MobileMenu({ nav, t }) {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();

  // Close on navigation
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e) => e.key === "Escape" && setIsOpen(false);
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  return (
    <div className="lg:hidden">
      {/* Hamburger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className="-mr-2 rounded-full p-2.5 text-ink transition-colors hover:bg-ink/5"
        aria-label={t.navbar.menu}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
      >
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.75}
            d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 7h16M4 12h16M4 17h10"}
          />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-x-0 top-full z-50 mt-2 flex flex-col gap-1 rounded-3xl border border-ink/10 bg-paper p-4 shadow-lift"
          >
            {nav.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                end={n.to === "/"}
                className={({ isActive }) =>
                  `rounded-2xl px-4 py-2.5 font-display text-2xl font-semibold transition-colors ${
                    isActive ? "bg-mint-100 text-ink" : "text-ink-700 hover:bg-ink/5"
                  }`
                }
              >
                {n.label}
              </NavLink>
            ))}

            <div className="mt-3 flex items-center justify-between gap-3 border-t border-ink/10 pt-4">
              <LanguageSwitch size="lg" />
              <Link to="/contact" className="btn-primary flex-1 px-5 py-2.5 text-sm">
                {t.navbar.bookBtn}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
