import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../lib/supabase";
import Container from "../components/Container";
import { useLanguage } from "../context/LanguageContext";

export default function Gallery() {
  // DATA STATE
  const [albums, setAlbums] = useState([]); // Stores the cover albums
  const [loading, setLoading] = useState(true);

  // LIGHTBOX STATE
  const [selectedAlbum, setSelectedAlbum] = useState(null); // The album currently open
  const [albumImages, setAlbumImages] = useState([]); // The photos inside the open album
  const [loadingImages, setLoadingImages] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { t, lang } = useLanguage();
  const content = t.galleryPage;

  // 1. FETCH ALBUMS (The Covers)
  useEffect(() => {
    async function fetchAlbums() {
      try {
        // Fetch from the 'albums' table we created
        const { data, error } = await supabase
          .from("albums")
          .select("*")
          .order("created_at", { ascending: false }); // Newest first

        if (error) throw error;
        setAlbums(data || []);
      } catch (err) {
        console.error("Error fetching albums:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchAlbums();
  }, []);

  // 2. OPEN ALBUM & FETCH PHOTOS
  const openAlbum = async (album) => {
    setSelectedAlbum(album);
    setLoadingImages(true);
    setCurrentImageIndex(0);
    // Lock scrolling
    document.body.style.overflow = "hidden";

    try {
      // Fetch images linked to this specific album ID
      const { data, error } = await supabase
        .from("gallery_images")
        .select("*")
        .eq("album_id", album.id) // <--- The Link!
        .order("order_index", { ascending: true });

      if (error) throw error;
      setAlbumImages(data || []);
    } catch (err) {
      console.error("Error fetching images:", err);
    } finally {
      setLoadingImages(false);
    }
  };

  const closeLightbox = () => {
    setSelectedAlbum(null);
    setAlbumImages([]);
    document.body.style.overflow = "auto";
  };

  // 3. NAVIGATION LOGIC (Next/Prev)
  const nextImage = useCallback(() => {
    if (albumImages.length === 0) return;
    setCurrentImageIndex((prev) => (prev + 1) % albumImages.length);
  }, [albumImages]);

  const prevImage = useCallback(() => {
    if (albumImages.length === 0) return;
    setCurrentImageIndex((prev) => (prev - 1 + albumImages.length) % albumImages.length);
  }, [albumImages]);

  // Keyboard Support
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedAlbum) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedAlbum, nextImage, prevImage]);

  return (
    <main className="py-20 min-h-screen">
      <Container>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mb-12"
        >
          <h2 className="text-3xl font-extrabold">
            {content.title}
          </h2>
          <p className="mt-2 text-[#3F4A87]/70">{content.desc}</p>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 animate-pulse">
                <div className="h-64 bg-gray-200" />
                <div className="p-6 space-y-3">
                  <div className="h-5 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-100 rounded w-full" />
                  <div className="h-4 bg-gray-100 rounded w-2/3" />
                  <div className="mt-4 h-4 bg-pink-100 rounded w-1/3" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* --- ALBUM GRID --- */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {albums.length === 0 ? (
              <div className="text-gray-500 italic">No albums found.</div>
            ) : (
              albums.map((album, i) => (
                <motion.div
                  key={album.id}
                  initial={{ y: 24, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.45 }}
                  whileHover={{ y: -5 }}
                  onClick={() => openAlbum(album)}
                  className="group cursor-pointer bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100"
                >
                  {/* Cover Image */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={album.cover_url}
                      alt={album.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Dark Overlay on Hover */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                  </div>

                  {/* Album Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-pink-600 transition-colors">
                      {album.title}
                    </h3>
                    {album.description && (
                      <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                        {album.description}
                      </p>
                    )}
                    <div className="mt-4 flex items-center text-pink-600 font-bold text-sm">
                      {lang === 'bg' ? 'Разгледай албума' : 'View Album'}
                      <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
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
            className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center backdrop-blur-sm"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 text-white/70 hover:text-white z-50 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-all"
            >
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {loadingImages ? (
              <div className="text-white/70 animate-pulse">
                {lang === 'bg' ? 'Зареждане...' : 'Loading...'}
              </div>
            ) : (
              <>
                {/* Prev Button */}
                {albumImages.length > 1 && (
                  <button
                    onClick={(e) => { e.stopPropagation(); prevImage(); }}
                    className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white p-3 rounded-full hover:bg-white/10 transition-all z-50"
                  >
                    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                )}

                {/* Main Image */}
                <div className="relative w-full h-full flex items-center justify-center p-4 md:p-10 pb-36 pointer-events-none">
                  {albumImages.length > 0 ? (
                    <motion.img
                      key={currentImageIndex}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2 }}
                      src={albumImages[currentImageIndex].image_url}
                      className="max-h-[68vh] max-w-full object-contain rounded-md shadow-2xl pointer-events-auto select-none"
                      onClick={(e) => e.stopPropagation()}
                      draggable="false"
                    />
                  ) : (
                    <p className="text-white/50">
                      {lang === 'bg' ? 'Няма снимки в този албум.' : 'No images in this album yet.'}
                    </p>
                  )}
                </div>

                {/* Bottom bar: title + counter + thumbnail strip */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent pt-16 pb-5 px-4 flex flex-col items-center gap-3 pointer-events-none">
                  <div className="text-center">
                    <h3 className="text-white text-lg font-bold tracking-wide drop-shadow-md">
                      {selectedAlbum.title}
                    </h3>
                    {albumImages.length > 0 && (
                      <p className="text-white/60 text-sm mt-0.5">
                        {currentImageIndex + 1} / {albumImages.length}
                      </p>
                    )}
                  </div>
                  {albumImages.length > 1 && (
                    <div
                      className="flex gap-2 overflow-x-auto max-w-[80vw] pb-1 pointer-events-auto"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {albumImages.map((img, idx) => (
                        <button
                          key={idx}
                          onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(idx); }}
                          className={`flex-shrink-0 w-14 h-14 rounded-lg overflow-hidden transition-all duration-200 ${
                            idx === currentImageIndex
                              ? 'ring-2 ring-white opacity-100 scale-105'
                              : 'opacity-40 hover:opacity-70'
                          }`}
                        >
                          <img src={img.image_url} alt="" className="w-full h-full object-cover" draggable="false" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Next Button */}
                {albumImages.length > 1 && (
                  <button
                    onClick={(e) => { e.stopPropagation(); nextImage(); }}
                    className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white p-3 rounded-full hover:bg-white/10 transition-all z-50"
                  >
                    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                )}
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}