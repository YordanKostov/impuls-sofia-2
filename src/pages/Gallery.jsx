import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "../lib/supabase";
import Container from "../components/Container";
import { THEME } from "../theme";
// 1. Import the hook
import { useLanguage } from "../context/LanguageContext";

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  // 2. Get the translations
  const { t } = useLanguage();
  const content = t.galleryPage;

  useEffect(() => {
    async function fetchGallery() {
      try {
        const { data, error } = await supabase
          .from("gallery_images")
          .select("*")
          .order("order_index", { ascending: true });

        if (error) {
          console.error("Error fetching gallery:", error);
        } else {
          setImages(data || []);
        }
      } catch (err) {
        console.error("Unexpected error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchGallery();
  }, []);

  return (
    <main className={`py-20 ${THEME.bg}`}>
      <Container>
        <div className="max-w-2xl">
          <h2 className={`text-3xl font-extrabold ${THEME.primary}`}>
            {content.title}
          </h2>
          <p className="mt-2 text-[#3F4A87]/70">{content.desc}</p>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="mt-10 h-48 flex items-center justify-center text-[#3F4A87]/50">
            {content.loading}
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
            {images.map((img) => (
              <motion.div
                key={img.id}
                whileHover={{ scale: 1.04 }}
                className="relative overflow-hidden rounded-2xl bg-white shadow-md group"
              >
                <img
                  src={img.image_url}
                  // Use translated fallback alt text
                  alt={img.alt || content.defaultAlt}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Subtle brand overlay */}
                <div className="absolute inset-0 bg-[#3F4A87]/0 hover:bg-[#3F4A87]/10 transition" />
              </motion.div>
            ))}
          </div>
        )}
      </Container>
    </main>
  );
}
