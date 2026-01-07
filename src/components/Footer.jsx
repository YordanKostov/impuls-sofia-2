import { Link } from "react-router-dom";
import Container from "./Container.jsx";
import instagram_logo from "../assets/instagram_logo.png";
import facebook_logo from "../assets/facebook_logo.png";
import logo from "../assets/logo.png";

export default function Footer() {
  return (
    <footer className="pb-6 pt-0">
      <Container>
        {/* COMPACT GLASS CARD:
           - Reduced padding: 'p-10' -> 'p-6 md:p-8'
           - Tighter rounded corners: 'rounded-[2.5rem]' -> 'rounded-[2rem]'
        */}
        <div className="bg-white/40 backdrop-blur-md border border-white/50 rounded-[2rem] p-6 md:p-8 shadow-sm">
          {/* Reduced gap and margin: 'gap-10 mb-8' -> 'gap-6 mb-6' */}
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
                More than just a dance studio. We are a community dedicated to
                movement, passion, and artistic growth.
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
              <h3 className="font-bold text-gray-900 text-sm mb-3">Studio</h3>
              {/* Tightened list spacing: 'space-y-2' -> 'space-y-1.5' */}
              <ul className="space-y-1.5 text-xs text-gray-600 font-medium">
                <li>
                  <Link
                    to="/about"
                    className="hover:text-gray-900 hover:translate-x-1 inline-block transition-all"
                  >
                    Our Story
                  </Link>
                </li>
                <li>
                  <Link
                    to="/classes"
                    className="hover:text-gray-900 hover:translate-x-1 inline-block transition-all"
                  >
                    Classes & Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    to="/gallery"
                    className="hover:text-gray-900 hover:translate-x-1 inline-block transition-all"
                  >
                    Gallery
                  </Link>
                </li>
                <li>
                  <Link
                    to="/news"
                    className="hover:text-gray-900 hover:translate-x-1 inline-block transition-all"
                  >
                    Latest News
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Support */}
            <div>
              <h3 className="font-bold text-gray-900 text-sm mb-3">Support</h3>
              <ul className="space-y-1.5 text-xs text-gray-600 font-medium">
                <li>
                  <Link
                    to="/contact"
                    className="hover:text-gray-900 hover:translate-x-1 inline-block transition-all"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <span className="cursor-not-allowed opacity-50">
                    Privacy Policy
                  </span>
                </li>
                <li>
                  <span className="cursor-not-allowed opacity-50">
                    Terms of Service
                  </span>
                </li>
              </ul>
            </div>

            {/* Column 4: Visit */}
            <div>
              <h3 className="font-bold text-gray-900 text-sm mb-3">Visit Us</h3>
              <address className="not-italic text-xs text-gray-600 font-medium space-y-1.5">
                <p>g.k. Mladost 2, ul. "Sv. Kipriyan" 236, 1799, Sofia</p>
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
          {/* Reduced top padding: 'pt-6' -> 'pt-4' */}
          <div className="pt-4 border-t border-gray-200/50 flex flex-col md:flex-row justify-between items-center gap-2 text-[10px] md:text-xs text-gray-500 font-medium">
            <div>
              © {new Date().getFullYear()} Impuls Sofia. All rights reserved.
            </div>
            <div>Made with ❤️ for dancers.</div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
