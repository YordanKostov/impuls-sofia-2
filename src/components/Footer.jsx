import { Link } from "react-router-dom";
import Container from "./Container.jsx";
import instagram_logo from "../assets/instagram_logo.png";
import facebook_logo from "../assets/facebook_logo.png";
import logo from "../assets/logo.png";
// 1. Import hook
import { useLanguage } from "../context/LanguageContext.jsx";

export default function Footer() {
  // 2. Get content
  const { t } = useLanguage();
  const footer = t.footer; // Short helper variable

  return (
    <footer className="pb-6 pt-0">
      <Container>
        <div className="bg-white/40 backdrop-blur-md border border-white/50 rounded-[2rem] p-6 md:p-8 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6 mb-6">
            {/* Column 1: Brand */}
            <div className="md:col-span-1">
              <Link to="/" className="flex items-center gap-2 mb-3 group">
                <div className="w-8 h-8 rounded-full overflow-hidden bg-white shadow-sm group-hover:scale-105 transition-transform">
                  <img
                    src={logo}
                    alt="Logo"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="font-bold text-lg text-gray-900">
                  Impuls Sofia
                </span>
              </Link>
              <p className="text-gray-700 text-xs leading-relaxed mb-4 font-medium max-w-xs">
                {footer.desc}
              </p>
              <div className="flex gap-3">
                <a
                  href="https://www.facebook.com/ImpulsSofiq"
                  target="_blank"
                  rel="noreferrer"
                  className="opacity-80 hover:opacity-100 hover:scale-110 transition-all"
                >
                  <img src={facebook_logo} alt="Facebook" className="w-6 h-6" />
                </a>
                <a
                  href="https://www.instagram.com/impuls_sofia"
                  target="_blank"
                  rel="noreferrer"
                  className="opacity-80 hover:opacity-100 hover:scale-110 transition-all"
                >
                  <img
                    src={instagram_logo}
                    alt="Instagram"
                    className="w-6 h-6"
                  />
                </a>
              </div>
            </div>

            {/* Column 2: Studio */}
            <div>
              <h3 className="font-bold text-gray-900 text-sm mb-3">
                {footer.col1}
              </h3>
              <ul className="space-y-1.5 text-xs text-gray-600 font-medium">
                <li>
                  <Link
                    to="/about"
                    className="hover:text-gray-900 hover:translate-x-1 inline-block transition-all"
                  >
                    {footer.col1_links.story}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/classes"
                    className="hover:text-gray-900 hover:translate-x-1 inline-block transition-all"
                  >
                    {footer.col1_links.classes}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/gallery"
                    className="hover:text-gray-900 hover:translate-x-1 inline-block transition-all"
                  >
                    {footer.col1_links.gallery}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/news"
                    className="hover:text-gray-900 hover:translate-x-1 inline-block transition-all"
                  >
                    {footer.col1_links.news}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Support */}
            <div>
              <h3 className="font-bold text-gray-900 text-sm mb-3">
                {footer.col2}
              </h3>
              <ul className="space-y-1.5 text-xs text-gray-600 font-medium">
                <li>
                  <Link
                    to="/contact"
                    className="hover:text-gray-900 hover:translate-x-1 inline-block transition-all"
                  >
                    {footer.col2_links.contact}
                  </Link>
                </li>
                <li>
                  <span className="cursor-not-allowed opacity-50">
                    {footer.col2_links.privacy}
                  </span>
                </li>
                <li>
                  <span className="cursor-not-allowed opacity-50">
                    {footer.col2_links.terms}
                  </span>
                </li>
              </ul>
            </div>

            {/* Column 4: Visit */}
            <div>
              <h3 className="font-bold text-gray-900 text-sm mb-3">
                {footer.col3}
              </h3>
              <address className="not-italic text-xs text-gray-600 font-medium space-y-1.5">
                <p>{footer.address}</p>
                <p>
                  <a
                    href="mailto:info@impuls-sofia.com"
                    className="hover:text-gray-900 hover:underline transition-all"
                  >
                    info@impuls-sofia.com
                  </a>
                </p>
                <p>
                  <a
                    href="tel:+359888123456"
                    className="hover:text-gray-900 hover:underline transition-all"
                  >
                    +359 888 123 456
                  </a>
                </p>
              </address>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-4 border-t border-gray-200/50 flex flex-col md:flex-row justify-between items-center gap-2 text-[10px] md:text-xs text-gray-500 font-medium">
            <div>
              © {new Date().getFullYear()} Impuls Sofia. {footer.rights}
            </div>
            <div>{footer.madeWith}</div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
