import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Container from "../components/Container.jsx";
import { supabase } from "../lib/supabase";
import HeroSlideshow from "../components/HeroSlideshow";
import { useLanguage } from "../context/LanguageContext";
import usePageTitle from "../hooks/usePageTitle";

const STUDIO_PHOTOS = ["/studio/studio.webp", "/studio/studio1.webp"];

const reveal = {
  initial: { y: 24, opacity: 0 },
  whileInView: { y: 0, opacity: 1 },
  viewport: { once: true, margin: "-60px" },
};

function SectionHeading({ children, className = "" }) {
  return (
    <h2 className={`display text-4xl md:text-6xl ${className}`}>{children}</h2>
  );
}

export default function Home() {
  // Newest albums: covers feed the hero carousel, the first four the preview grid
  const [albums, setAlbums] = useState([]);
  const [albumsLoaded, setAlbumsLoaded] = useState(false);

  const { t } = useLanguage();
  usePageTitle(t.hero.eyebrow);

  useEffect(() => {
    let ignore = false;

    async function fetchHomeImages() {
      const { data, error } = await supabase
        .from("albums")
        .select("id, cover_url, title")
        .order("created_at", { ascending: false })
        .limit(6);

      if (ignore) return;
      if (error) console.error("Error loading home albums:", error);
      setAlbums((data || []).filter((album) => album.cover_url));
      setAlbumsLoaded(true);
    }

    fetchHomeImages();
    return () => {
      ignore = true;
    };
  }, []);

  // Album covers (captioned with the album title); studio photos if there are none
  const heroSlides = albums.length
    ? albums.map((album) => ({ src: album.cover_url, caption: album.title }))
    : albumsLoaded
      ? STUDIO_PHOTOS.map((src) => ({ src }))
      : [];
  const previewAlbums = albums.slice(0, 4);

  // "IMPULS – SOFIA" -> "IMPULS" / "– SOFIA" on two lines
  const [brandFirst, brandRest] = t.hero.brand.split(/\s(?=[–-])/);

  return (
    <div className="overflow-x-clip">
      {/* 1. HERO SECTION: copy + portrait photo slideshow */}
      <section className="pb-6 pt-8 md:pb-10 md:pt-14">
        <Container>
          <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,300px)] lg:grid-cols-[minmax(0,1fr)_minmax(0,440px)] lg:gap-16">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="eyebrow mb-5">{t.hero.title}</div>
              <h1 className="text-[3.4rem] font-semibold uppercase leading-[0.9] tracking-[-0.02em] text-ink sm:text-7xl xl:text-8xl">
                {brandFirst}
                {brandRest && (
                  <span className="block text-ink-700">
                    {/* Colours taken from the logo: mint dash, indigo name */}
                    <span className="text-mint">{brandRest.slice(0, 1)}</span>
                    {brandRest.slice(1)}
                  </span>
                )}
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-500 lg:text-xl">
                {t.hero.subtitle}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/classes" className="btn-primary">
                  {t.hero.btnPrimary}
                  <span aria-hidden="true">→</span>
                </Link>
                <Link to="/gallery" className="btn-outline">
                  {t.hero.btnSecondary}
                </Link>
              </div>

              <Link
                to="/contact"
                className="mt-7 inline-flex items-center gap-3 rounded-full border border-mint-200 bg-mint-50/80 py-2 pl-3 pr-5 text-sm font-semibold text-ink transition-colors hover:bg-mint-100"
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint-600 opacity-60" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-mint-600" />
                </span>
                {t.hero.newLabel}
              </Link>
            </motion.div>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="order-first mx-auto w-full max-w-md md:order-none md:max-w-none"
            >
              <HeroSlideshow slides={heroSlides} />
            </motion.div>
          </div>
        </Container>
      </section>

      {/* 2. WHY CHOOSE US */}
      <section className="pb-20 pt-14 md:pb-28 md:pt-20">
        <Container>
          <motion.div {...reveal}>
            <SectionHeading>{t.features.title}</SectionHeading>
          </motion.div>
          <div className="mt-12 grid grid-cols-1 border-t border-ink/15 md:grid-cols-3">
            {t.features.list.map((feature, i) => (
              <motion.div
                key={i}
                {...reveal}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="group border-b border-ink/15 py-8 md:border-b-0 md:border-l md:px-8 md:py-10 md:first:border-l-0 md:first:pl-0"
              >
                <div className="font-display text-6xl font-medium italic text-mint-600 transition-transform duration-500 group-hover:-translate-y-1">
                  0{i + 1}
                </div>
                <h3 className="mt-6 text-xl font-bold text-ink">
                  {feature.title}
                </h3>
                <p className="mt-2 leading-relaxed text-ink-500">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* 3. DANCES WE TEACH */}
      <section className="relative mb-20 overflow-hidden bg-ink-950 py-16 text-white md:mb-28 md:py-20">
        <div
          className="absolute -left-32 top-0 h-80 w-80 rounded-full bg-mint/15 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-40 right-0 h-96 w-96 rounded-full bg-ink-500/30 blur-3xl"
          aria-hidden="true"
        />
        <Container className="relative">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
            {t.dances.map((group, g) => (
              <div key={group.label}>
                <h2 className="mb-6 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.22em] text-mint">
                  <span className="font-display text-2xl font-medium normal-case italic tracking-normal">
                    0{g + 1}
                  </span>
                  {group.label}
                </h2>
                <ul>
                  {group.list.map((dance, i) => (
                    <motion.li
                      key={dance}
                      initial={{ x: -16, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.07, duration: 0.45 }}
                      className="group flex items-baseline justify-between gap-4 border-t border-white/10 py-2.5 last:border-b md:py-3"
                    >
                      <span className="font-display text-2xl font-medium text-white/90 transition-all duration-300 group-hover:translate-x-2 group-hover:italic group-hover:text-mint sm:text-3xl md:text-4xl">
                        {dance}
                      </span>
                      <span className="text-xs font-bold tabular-nums text-white/30 transition-colors group-hover:text-mint">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 4. GALLERY PREVIEW */}
      {(!albumsLoaded || previewAlbums.length > 0) && (
      <section id="gallery" className="pb-20 md:pb-28">
        <Container>
          <div className="flex items-end justify-between gap-6">
            <SectionHeading>{t.gallery.title}</SectionHeading>
            <Link to="/gallery" className="link-arrow shrink-0 pb-2">
              {t.gallery.seeAll} <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
            {!albumsLoaded &&
              [...Array(4)].map((_, i) => (
                <div key={i} className="skeleton aspect-[3/4] md:even:mt-10" />
              ))}

            {previewAlbums.map((album, i) => (
              <motion.div
                key={album.id}
                {...reveal}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="md:even:mt-10"
              >
                <Link
                  to="/gallery"
                  className="group relative block aspect-[3/4] overflow-hidden rounded-2xl bg-ink-100 shadow-soft"
                >
                  <img
                    src={album.cover_url}
                    alt={album.title}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-end bg-gradient-to-t from-ink-950/80 via-ink-950/10 to-transparent p-4">
                    <span className="font-display text-xl font-semibold leading-tight text-white">
                      {album.title}
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>
      )}

      {/* 5. STATS & FEATURE SPLIT */}
      <section className="pb-20 md:pb-28">
        <Container>
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <motion.div
              {...reveal}
              transition={{ duration: 0.7 }}
              className="group relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] shadow-lift sm:aspect-[4/3] lg:aspect-[4/5]"
            >
              <img
                src="/studio/studio.webp"
                alt=""
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute bottom-5 left-5 rounded-2xl bg-paper/90 px-5 py-3.5 shadow-soft backdrop-blur-md">
                <p className="font-display text-2xl font-semibold leading-tight text-ink">
                  {t.splitSection.imageTag}
                </p>
                <p className="text-sm font-semibold text-mint-600">
                  {t.splitSection.imageSub}
                </p>
              </div>
            </motion.div>

            <div>
              <motion.div {...reveal}>
                <SectionHeading>
                  {t.splitSection.titleStart}{" "}
                  <em className="font-medium text-ink-700">
                    {t.splitSection.titleHighlight}
                  </em>
                </SectionHeading>
                <p className="mt-6 text-lg leading-relaxed text-ink-500">
                  {t.splitSection.desc}
                </p>
              </motion.div>

              <dl className="mt-10 grid grid-cols-2 border-t border-ink/15">
                {t.splitSection.stats.map((stat, i) => (
                  <motion.div
                    key={i}
                    {...reveal}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="flex flex-col-reverse border-b border-ink/15 py-6 odd:pr-6 even:border-l even:pl-6"
                  >
                    <dt className="mt-1 text-xs font-bold uppercase tracking-[0.16em] text-ink-500">
                      {stat.label}
                    </dt>
                    <dd className="font-display text-5xl font-semibold text-ink md:text-6xl">
                      {stat.value}
                    </dd>
                  </motion.div>
                ))}
              </dl>
            </div>
          </div>
        </Container>
      </section>

      {/* 6. TESTIMONIALS */}
      <section className="pb-20 md:pb-28">
        <Container>
          <motion.div {...reveal} className="mb-12 max-w-2xl">
            <SectionHeading>{t.testimonials.title}</SectionHeading>
            <p className="mt-4 text-lg text-ink-500">
              {t.testimonials.subtitle}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {t.testimonials.list.map((item, i) => (
              <motion.figure
                key={i}
                {...reveal}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                className="card flex flex-col p-8 md:[&:nth-child(2)]:translate-y-8"
              >
                <div
                  className="font-display text-7xl leading-[0.6] text-mint-600"
                  aria-hidden="true"
                >
                  “
                </div>
                <blockquote className="mt-2 flex-grow font-display text-2xl font-medium italic leading-snug text-ink">
                  {item.quote}
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-3 border-t border-ink/10 pt-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-ink text-sm font-bold text-white">
                    {item.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-ink">{item.name}</div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-ink-500">
                      {item.role}
                    </div>
                  </div>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </Container>
      </section>

      {/* 7. FINAL CTA */}
      <section className="pt-8">
        <Container>
          <motion.div
            {...reveal}
            className="relative overflow-hidden rounded-[2.5rem] bg-ink px-6 py-16 text-center shadow-lift md:py-24"
          >
            <div
              className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-mint/30 blur-3xl"
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-32 -right-16 h-96 w-96 rounded-full bg-ink-500/50 blur-3xl"
              aria-hidden="true"
            />
            <div className="relative mx-auto max-w-2xl">
              <h2 className="font-display text-5xl font-semibold leading-none text-white md:text-7xl">
                {t.cta.title}
              </h2>
              <p className="mx-auto mb-9 mt-6 max-w-xl text-lg text-ink-100/80">
                {t.cta.desc}
              </p>
              <Link to="/contact" className="btn-light px-9 py-4 text-base">
                {t.cta.btn}
              </Link>
            </div>
          </motion.div>
        </Container>
      </section>
    </div>
  );
}
