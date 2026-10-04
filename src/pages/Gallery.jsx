import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../lib/supabase";
import Container from "../components/Container";
import PageHeader from "../components/PageHeader";
import { useLanguage } from "../context/LanguageContext";
import usePageTitle from "../hooks/usePageTitle";

function Chevron({ direction }) {
  return (
    <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.75}
        d={direction === "left" ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"}
      />
    </svg>
  );
}

const navBtnClass =
  "absolute top-1/2 z-50 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white/80 backdrop-blur-sm transition-all hover:bg-white/20 hover:text-white";

export default function Gallery() {
  // DATA STATE
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);

  // LIGHTBOX STATE
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [albumImages, setAlbumImages] = useState([]);
  const [loadingImages, setLoadingImages] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const closeBtnRef = useRef(null);
  const thumbsRef = useRef(null);

  const { t } = useLanguage();
  const content = t.galleryPage;
  usePageTitle(content.title);

  // 1. FETCH ALBUMS (The Covers)
  useEffect(() => {
    let ignore = false;

    async function fetchAlbums() {
      const { data, error } = await supabase
        .from("albums")
        .select("*")
        .order("created_at", { ascending: false });

      if (ignore) return;
      if (error) console.error("Error fetching albums:", error);
      setAlbums(data || []);
      setLoading(false);
    }

    fetchAlbums();
    return () => {
      ignore = true;
    };
  }, []);

  // 2. FETCH THE PHOTOS OF THE OPEN ALBUM
  const selectedId = selectedAlbum?.id;
  useEffect(() => {
    if (selectedId == null) return;
    let ignore = false;

    setAlbumImages([]);
    setCurrentImageIndex(0);
    setLoadingImages(true);

    supabase
      .from("gallery_images")
      .select("*")
      .eq("album_id", selectedId)
      .order("order_index", { ascending: true })
      .then(({ data, error }) => {
        if (ignore) return;
        if (error) console.error("Error fetching images:", error);
        setAlbumImages(data || []);
        setLoadingImages(false);
      });

    return () => {
      ignore = true;
    };
  }, [selectedId]);

  // Lock page scroll while the lightbox is open (and always restore it)
  useEffect(() => {
    if (selectedId == null) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeBtnRef.current?.focus();
    return () => {
      document.body.style.overflow = previous;
    };
  }, [selectedId]);

  const closeLightbox = useCallback(() => setSelectedAlbum(null), []);

  // 3. NAVIGATION LOGIC (Next/Prev)
  const total = albumImages.length;
  const nextImage = useCallback(() => {
    if (total) setCurrentImageIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevImage = useCallback(() => {
    if (total) setCurrentImageIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Keyboard Support
  useEffect(() => {
    if (selectedId == null) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedId, closeLightbox, nextImage, prevImage]);

  // Warm up the neighbouring photo and keep the active thumbnail in view
  useEffect(() => {
    if (total > 1) {
      new Image().src = albumImages[(currentImageIndex + 1) % total].image_url;
    }
    thumbsRef.current?.children[currentImageIndex]?.scrollIntoView({
      block: "nearest",
      inline: "center",
    });
  }, [albumImages, currentImageIndex, total]);

  const currentImage = albumImages[currentImageIndex];

  return (
    <section className="py-12 md:py-20">
      <Container>
        <PageHeader
          eyebrow="Impuls Sofia"
          title={content.title}
          subtitle={content.desc}
        />

        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-busy="true">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="skeleton aspect-[4/5] rounded-3xl" />
            ))}
          </div>
        ) : albums.length === 0 ? (
          <p className="font-display text-2xl italic text-ink-500">
            {content.empty}
          </p>
        ) : (
          /* --- ALBUM GRID --- */
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {albums.map((album, i) => (
              <motion.button
                key={album.id}
                type="button"
                initial={{ y: 24, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 3) * 0.07, duration: 0.45 }}
                onClick={() => setSelectedAlbum(album)}
                className="group relative block aspect-[4/5] w-full overflow-hidden rounded-3xl bg-ink-100 text-left shadow-soft transition-shadow duration-300 hover:shadow-lift"
              >
                <img
                  src={album.cover_url}
                  alt=""
                  loading={i < 3 ? "eager" : "lazy"}
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-ink-950/85 via-ink-950/15 to-transparent p-6">
                  <h2 className="font-display text-3xl font-semibold leading-tight text-white">
                    {album.title}
                  </h2>
                  {album.description && (
                    <p className="mt-1 line-clamp-2 text-sm text-white/75">
                      {album.description}
                    </p>
                  )}
                  <span className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-mint">
                    {content.viewAlbum}
                    <span
                      className="transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </span>
                </div>
              </motion.button>
            ))}
          </div>
        )}
      </Container>

      {/* --- LIGHTBOX MODAL --- */}
      <AnimatePresence>
        {selectedAlbum && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label={selectedAlbum.title}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-ink-950/95 backdrop-blur-sm"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button
              ref={closeBtnRef}
              type="button"
              onClick={closeLightbox}
              aria-label={content.close}
              className="absolute right-4 top-4 z-50 rounded-full bg-white/10 p-2.5 text-white/80 transition-all hover:bg-white/20 hover:text-white md:right-6 md:top-6"
            >
              <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {loadingImages ? (
              <div className="animate-pulse text-white/70">{content.loading}</div>
            ) : (
              <>
                {total > 1 && (
                  <button
                    type="button"
                    aria-label={content.prev}
                    onClick={(e) => {
                      e.stopPropagation();
                      prevImage();
                    }}
                    className={`${navBtnClass} left-3 md:left-8`}
                  >
                    <Chevron direction="left" />
                  </button>
                )}

                {/* Main Image */}
                <div className="pointer-events-none relative flex h-full w-full items-center justify-center p-4 pb-40 md:p-10 md:pb-40">
                  {currentImage ? (
                    <motion.img
                      key={currentImage.image_url}
                      initial={{ opacity: 0, scale: 0.97 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.25 }}
                      src={currentImage.image_url}
                      alt={currentImage.alt || content.defaultAlt}
                      className="pointer-events-auto max-h-[68vh] max-w-full select-none rounded-lg object-contain shadow-2xl"
                      onClick={(e) => e.stopPropagation()}
                      draggable="false"
                    />
                  ) : (
                    <p className="text-white/60">{content.noImages}</p>
                  )}
                </div>

                {/* Bottom bar: title + counter + thumbnail strip */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col items-center gap-3 bg-gradient-to-t from-ink-950 to-transparent px-4 pb-5 pt-16">
                  <div className="text-center">
                    <h3 className="font-display text-2xl font-semibold text-white">
                      {selectedAlbum.title}
                    </h3>
                    {total > 0 && (
                      <p className="mt-0.5 text-sm tabular-nums text-white/60">
                        {currentImageIndex + 1} / {total}
                      </p>
                    )}
                  </div>
                  {total > 1 && (
                    <div
                      ref={thumbsRef}
                      className="pointer-events-auto flex max-w-[90vw] gap-2 overflow-x-auto p-1"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {albumImages.map((img, idx) => (
                        <button
                          key={img.id ?? idx}
                          type="button"
                          aria-label={`${idx + 1} / ${total}`}
                          aria-current={idx === currentImageIndex}
                          onClick={() => setCurrentImageIndex(idx)}
                          className={`h-14 w-14 flex-shrink-0 overflow-hidden rounded-lg transition-all duration-200 ${
                            idx === currentImageIndex
                              ? "opacity-100 ring-2 ring-mint"
                              : "opacity-40 hover:opacity-75"
                          }`}
                        >
                          <img
                            src={img.image_url}
                            alt=""
                            loading="lazy"
                            decoding="async"
                            className="h-full w-full object-cover"
                            draggable="false"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {total > 1 && (
                  <button
                    type="button"
                    aria-label={content.next}
                    onClick={(e) => {
                      e.stopPropagation();
                      nextImage();
                    }}
                    className={`${navBtnClass} right-3 md:right-8`}
                  >
                    <Chevron direction="right" />
                  </button>
                )}
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
