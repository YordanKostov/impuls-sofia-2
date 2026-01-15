import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../lib/supabase";
import Container from "../components/Container";
import { THEME } from "../theme";
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

  const { t } = useLanguage();
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
    <main className={`py-20 ${THEME.bg} min-h-screen`}>
      <Container>
        <div className="max-w-2xl mb-12">
          <h2 className={`text-3xl font-extrabold ${THEME.primary}`}>
            {content.title}
          </h2>
          <p className="mt-2 text-[#3F4A87]/70">{content.desc}</p>
        </div>

        {loading ? (
          <div className="mt-10 h-48 flex items-center justify-center text-[#3F4A87]/50">
            {content.loading}
          </div>
        ) : (
          /* --- ALBUM GRID --- */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {albums.length === 0 ? (
              <div className="text-gray-500 italic">No albums found.</div>
            ) : (
              albums.map((album) => (
                <motion.div
                  key={album.id}
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
                      {t.lang === 'bg' ? 'Разгледай албума' : 'View Album'}
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
              <div className="text-white/70 animate-pulse">Loading photos...</div>
            ) : (
              <>
                {/* Prev Button */}
                {albumImages.length > 1 && (
                  <button
                    onClick={(e) => { e.stopPropagation(); prevImage(); }}
                    className="absolute left-4 md:left-8 text-white/50 hover:text-white p-3 rounded-full hover:bg-white/10 transition-all z-50"
                  >
                    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                  </button>
                )}

                {/* Main Image */}
                <div className="relative w-full h-full flex flex-col items-center justify-center p-4 md:p-10 pointer-events-none">
                  {albumImages.length > 0 ? (
                    <motion.img
                      key={currentImageIndex}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2 }}
                      src={albumImages[currentImageIndex].image_url}
                      className="max-h-[80vh] max-w-full object-contain rounded-md shadow-2xl pointer-events-auto select-none"
                      onClick={(e) => e.stopPropagation()}
                    />
                  ) : (
                    <p className="text-white/50">No images in this album yet.</p>
                  )}

                  {/* Caption */}
                  <div className="absolute bottom-6 left-0 right-0 text-center">
                    <h3 className="text-white text-xl font-bold tracking-wide drop-shadow-md">
                      {selectedAlbum.title}
                    </h3>
                    {albumImages.length > 0 && (
                      <p className="text-white/60 text-sm mt-1">
                        {currentImageIndex + 1} / {albumImages.length}
                      </p>
                    )}
                  </div>
                </div>

                {/* Next Button */}
                {albumImages.length > 1 && (
                  <button
                    onClick={(e) => { e.stopPropagation(); nextImage(); }}
                    className="absolute right-4 md:right-8 text-white/50 hover:text-white p-3 rounded-full hover:bg-white/10 transition-all z-50"
                  >
                    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
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