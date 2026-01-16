import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import Container from "../components/Container.jsx";
import { THEME } from "../theme.js";
import { supabase } from "../lib/supabase";
import ImageCarousel from "../components/ImageCarousel";
import { useLanguage } from "../context/LanguageContext";

export default function Home() {
  const navigate = useNavigate();

  // State for the Top Carousel (Array of URL strings)
  const [heroImages, setHeroImages] = useState([]);
  // State for the Bottom Gallery Grid (Array of Album objects)
  const [previewAlbums, setPreviewAlbums] = useState([]);

  const { t } = useLanguage();

  useEffect(() => {
    async function fetchHomeImages() {
      // CHANGED: Fetch from 'albums' table instead of 'gallery_images'
      const { data, error } = await supabase
        .from("albums")
        .select("id, cover_url, title")
        .order("created_at", { ascending: false }) // Newest albums first
        .limit(10);

      if (error) {
        console.error("Error loading home albums:", error);
      } else if (data) {
        // 1. Carousel needs a simple list of strings
        setHeroImages(data.map(album => album.cover_url));

        // 2. Grid needs the full object (id, title, cover_url)
        setPreviewAlbums(data.slice(0, 4));
      }
    }

    fetchHomeImages();
  }, []);

  return (
    <main className={`${THEME.gradient} min-h-screen overflow-hidden`}>
      {/* 1. HERO SECTION */}
      <section className="py-20 md:py-28">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ x: -40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-gray-900">
                {t.hero.title}
              </h1>
              <p className="mt-4 text-gray-800 max-w-xl">{t.hero.subtitle}</p>

              <div className="mt-8 flex gap-4">
                <button
                  onClick={() => navigate("/classes")}
                  className="px-7 py-3.5 rounded-full bg-gray-900 text-white font-semibold shadow-lg hover:bg-gray-800 hover:scale-105 transition-all duration-300"
                >
                  {t.hero.btnPrimary}
                </button>

                <a
                  href="#gallery"
                  className="px-7 py-3.5 rounded-full border border-gray-300 text-gray-700 font-medium hover:border-gray-900 hover:text-gray-900 transition-all duration-300"
                >
                  {t.hero.btnSecondary}
                </a>
              </div>

              <div className="mt-6 text-sm text-gray-600 font-medium flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                {t.hero.newLabel}
              </div>
            </motion.div>

            {/* Carousel showing Album Covers */}
            <motion.div
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <ImageCarousel externalImages={heroImages} />
            </motion.div>
          </div>
        </Container>
      </section>

      {/* 2. WHY CHOOSE US (Unchanged) */}
      <section className="py-12">
        <Container>
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">
            {t.features.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.features.list.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-gray-900 p-8 rounded-3xl shadow-xl relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 -translate-y-1/2 translate-x-1/2"></div>
                <div className="text-4xl mb-4 relative z-10">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2 relative z-10">
                  {feature.title}
                </h3>
                <p className="text-gray-400 relative z-10">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* 3. GALLERY PREVIEW (Updated to use Albums) */}
      <section id="gallery" className="py-12">
        <Container>
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-gray-900">
              {t.gallery.title}
            </h2>
            <Link
              to="/gallery"
              className="text-secondary text-sm hover:underline"
            >
              {t.gallery.seeAll}
            </Link>
          </div>

          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
            {previewAlbums.map((album, i) => (
              <Link to="/gallery" key={album.id || i}>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="overflow-hidden rounded-lg bg-gray-100 shadow-sm relative group cursor-pointer"
                >
                  <img
                    src={album.cover_url} // <--- Using cover_url now
                    alt={album.title}
                    className="w-full h-44 object-cover"
                  />
                  {/* Optional: Show album title on hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center">
                    <span className="text-white font-bold opacity-0 group-hover:opacity-100 transition-opacity text-sm px-2 text-center">
                      {album.title}
                    </span>
                  </div>
                </motion.div>
              </Link>
            ))}

            {previewAlbums.length === 0 && (
              <div className="col-span-full text-center py-10 text-gray-500 italic">
                Checking for albums...
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* 4. STATS & FEATURE SPLIT (Unchanged) */}
      <section className="py-16">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative h-[500px] w-full rounded-[2.5rem] overflow-hidden shadow-2xl group"
            >
              <img
                src="https://images.unsplash.com/photo-1547153760-18fc86324498?q=80&w=1887&auto=format&fit=crop"
                alt="Dancers stretching"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-md px-6 py-4 rounded-2xl shadow-lg border border-white/50">
                <p className="text-gray-900 font-bold text-lg">
                  {t.splitSection.imageTag}
                </p>
                <p className="text-pink-600 font-medium text-sm">
                  {t.splitSection.imageSub}
                </p>
              </div>
            </motion.div>

            <div>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl font-extrabold text-gray-900 leading-tight">
                  {t.splitSection.titleStart} <br />
                  <span
                    className="inline-block text-transparent bg-clip-text"
                    style={{
                      backgroundImage:
                        "linear-gradient(to right, #db2777, #9333ea)",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                    }}
                  >
                    {t.splitSection.titleHighlight}
                  </span>
                </h2>
                <p className="mt-6 text-lg text-gray-700 leading-relaxed">
                  {t.splitSection.desc}
                </p>
              </motion.div>

              <div className="mt-10 grid grid-cols-2 gap-6">
                {t.splitSection.stats.map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/40 shadow-sm hover:bg-white/80 transition-colors"
                  >
                    <div className={`text-3xl font-black ${stat.color}`}>
                      {stat.value}
                    </div>
                    <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider mt-1">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 5. TESTIMONIALS (Unchanged) */}
      <section className="py-16">
        <Container>
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">
              {t.testimonials.title}
            </h2>
            <p className="mt-2 text-gray-600">{t.testimonials.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.testimonials.list.map((item, i) => (
              <motion.div
                key={i}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                whileHover={{ y: -5 }}
                className="p-8 rounded-3xl bg-gray-900 shadow-xl relative overflow-hidden group"
              >
                <div className="absolute top-0 left-0 w-32 h-32 bg-purple-500 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 -translate-x-1/2 -translate-y-1/2"></div>
                <div className="mb-4 text-pink-400 text-4xl font-serif">❝</div>
                <p className="text-gray-300 font-medium italic mb-6 relative z-10">
                  "{item.quote}"
                </p>
                <div className="flex items-center gap-3 relative z-10">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white font-bold text-sm">
                    {item.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-white text-sm">
                      {item.name}
                    </div>
                    <div className="text-xs text-gray-500 uppercase">
                      {item.role}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* 6. FINAL CTA (Unchanged) */}
      <section className="py-16">
        <Container>
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="relative rounded-[3rem] overflow-hidden bg-gray-900 text-center py-16 px-6 shadow-2xl"
          >
            <div className="absolute top-0 left-0 w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 translate-x-1/2 translate-y-1/2"></div>
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-6">
                {t.cta.title}
              </h2>
              <p className="text-gray-400 text-lg mb-8">{t.cta.desc}</p>
              <button
                onClick={() => navigate("/contact")}
                className="px-10 py-4 bg-white text-gray-900 text-lg font-bold rounded-full hover:bg-gray-100 hover:scale-105 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)]"
              >
                {t.cta.btn}
              </button>
            </div>
          </motion.div>
        </Container>
      </section>
    </main>
  );
}