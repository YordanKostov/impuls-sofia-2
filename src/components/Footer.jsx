import { Link } from "react-router-dom";
import Container from "./Container.jsx";
import logo from "../assets/logo.png";
import { useLanguage } from "../context/LanguageContext.jsx";
import { SITE, telHref } from "../lib/site.js";

const linkClass =
  "inline-block text-ink-100/80 transition-all hover:translate-x-1 hover:text-mint";

function SocialLink({ href, label, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white transition-all hover:-translate-y-0.5 hover:border-mint hover:bg-mint hover:text-ink-950"
    >
      <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        {children}
      </svg>
    </a>
  );
}

export default function Footer() {
  const { t } = useLanguage();
  const footer = t.footer;

  return (
    <footer className="mt-24 bg-ink-950 text-white">
      <Container>
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 py-16 md:grid-cols-12">
          {/* Column 1: Brand */}
          <div className="col-span-2 md:col-span-5">
            <Link to="/" className="mb-5 flex items-center gap-3">
              <img
                src={logo}
                alt=""
                width="44"
                height="44"
                loading="lazy"
                className="h-11 w-11 rounded-full object-cover"
              />
              <span className="font-display text-3xl font-semibold">
                Impuls Sofia
              </span>
            </Link>
            <div className="flex gap-3">
              <SocialLink href={SITE.facebook} label="Facebook">
                <path d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.9.3-1.5 1.5-1.5h1.5V4.4c-.3 0-1.200-.1-2.200-.1-2.200 0-3.700 1.300-3.700 3.800v2.400H8v3h2.600V21h2.900z" />
              </SocialLink>
              <SocialLink href={SITE.instagram} label="Instagram">
                <path d="M12 7.300a4.700 4.700 0 100 9.400 4.700 4.700 0 000-9.400zm0 7.700a3 3 0 110-6 3 3 0 010 6zm4.900-8.900a1.100 1.100 0 100 2.200 1.100 1.100 0 000-2.200zM16.400 3H7.600A4.600 4.600 0 003 7.600v8.800A4.600 4.600 0 007.600 21h8.800a4.600 4.600 0 004.600-4.600V7.600A4.600 4.600 0 0016.400 3zm2.900 13.400a2.900 2.900 0 01-2.900 2.900H7.600a2.900 2.900 0 01-2.900-2.900V7.600a2.900 2.900 0 012.900-2.900h8.800a2.900 2.900 0 012.900 2.900v8.800z" />
              </SocialLink>
            </div>
          </div>

          {/* Column 2: Studio */}
          <div className="md:col-span-3">
            <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-mint">
              {footer.col1}
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link to="/about" className={linkClass}>
                  {footer.col1_links.story}
                </Link>
              </li>
              <li>
                <Link to="/classes" className={linkClass}>
                  {footer.col1_links.classes}
                </Link>
              </li>
              <li>
                <Link to="/gallery" className={linkClass}>
                  {footer.col1_links.gallery}
                </Link>
              </li>
              <li>
                <Link to="/news" className={linkClass}>
                  {footer.col1_links.news}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Visit */}
          <div className="md:col-span-4">
            <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-mint">
              {footer.col3}
            </h3>
            <address className="space-y-2.5 not-italic text-ink-100/80">
              <p>{t.locations[0].address}</p>
              <p>
                <a href={`mailto:${SITE.email}`} className="transition-colors hover:text-mint">
                  {SITE.email}
                </a>
              </p>
              <p>
                <a href={telHref} className="transition-colors hover:text-mint">
                  {SITE.phone}
                </a>
              </p>
            </address>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-2 border-t border-white/10 py-6 text-sm text-ink-100/50 md:flex-row">
          <div>
            © {new Date().getFullYear()} Impuls Sofia. {footer.rights}
          </div>
          <div>{footer.madeWith}</div>
        </div>
      </Container>
    </footer>
  );
}
