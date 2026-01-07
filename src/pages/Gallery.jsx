import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "../lib/supabase"; // Make sure this path is correct
import Container from "../components/Container";
import { THEME } from "../theme";

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGallery() {
      try {
        const { data, error } = await supabase
          .from("gallery_images")
          .select("*")
          .order("order_index", { ascending: true }); // Ensure consistent ordering

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
            Gallery
          </h2>
          <p className="mt-2 text-[#3F4A87]/70">
            Selected highlights from classes, showcases, and rehearsals.
          </p>
        </div>

        {/* Loading State (Optional but recommended) */}
        {loading ? (
          <div className="mt-10 h-48 flex items-center justify-center text-[#3F4A87]/50">
            Loading images...
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
            {images.map((img) => (
              <motion.div
                key={img.id} // Use the unique ID from Supabase
                whileHover={{ scale: 1.04 }}
                className="relative overflow-hidden rounded-2xl bg-white shadow-md group" // Added 'group' here for hover effects
              >
                <img
                  src={img.image_url} // Use the column name from your DB
                  alt={img.alt || "Gallery Image"}
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
