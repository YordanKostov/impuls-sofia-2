import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function MobileMenu({ nav, lang, setLang, t }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="md:hidden">
      {/* Hamburger Button */}
      <button
        onClick={toggleMenu}
        className="p-2 text-gray-600 hover:text-gray-900 focus:outline-none"
        aria-label="Toggle menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-20 left-0 w-full bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-xl p-4 flex flex-col gap-1 z-50"
          >
            {/* Links */}
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setIsOpen(false)}
                className="text-base font-medium text-gray-700 hover:text-rose-600 hover:bg-gray-50 py-2 px-2 rounded-lg transition-colors"
              >
                {n.label}
              </Link>
            ))}

            {/* Divider */}
            <div className="h-px bg-gray-100 my-1" />

            {/* Language Switcher (Centered, Label Removed) */}
            <div className="flex justify-center py-2">
              <div className="flex bg-gray-100 p-0.5 rounded-full">
                <button
                  onClick={() => setLang("bg")}
                  className={`px-6 py-1.5 text-xs font-bold rounded-full transition-all ${
                    lang === "bg"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-500"
                  }`}
                >
                  BG
                </button>
                <button
                  onClick={() => setLang("en")}
                  className={`px-6 py-1.5 text-xs font-bold rounded-full transition-all ${
                    lang === "en"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-500"
                  }`}
                >
                  EN
                </button>
              </div>
            </div>

            {/* Book Button */}
            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className="mt-1 w-full text-center py-2.5 rounded-full bg-gray-900 text-white font-bold text-sm shadow-md active:scale-95 transition-transform"
            >
              {t.navbar.bookBtn}
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
