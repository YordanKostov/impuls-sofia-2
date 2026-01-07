import Container from "./Container.jsx";
import { Link } from "react-router-dom";
import MobileMenu from "./MobileMenu.jsx";
import logo from "../assets/logo.png";

export default function Navbar() {
  const nav = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/classes", label: "Classes" },
    { to: "/gallery", label: "Gallery" },
    { to: "/news", label: "News" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-white/80 border-b border-gray-100">
      <Container>
        <nav className="flex items-center justify-between h-20">
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
                Movement • Passion • Community
              </div>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
              >
                {n.label}
              </Link>
            ))}

            {/* --- UPDATED BUTTON --- */}
            <Link
              to="/contact"
              className="ml-2 inline-block px-6 py-2.5 rounded-full bg-gray-900 text-white text-sm font-semibold shadow-md hover:bg-gray-800 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
            >
              Book a class
            </Link>
          </div>

          {/* mobile: simple menu */}
          <MobileMenu nav={nav} />
        </nav>
      </Container>
    </header>
  );
}
