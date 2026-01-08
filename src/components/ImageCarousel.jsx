import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

// 1. Accept props: 'externalImages' (optional) and 'className' (for custom height)
export default function ImageCarousel({ externalImages, className }) {
  const [fetchedImages, setFetchedImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Determine which images to use
  const images = externalImages || fetchedImages;

  // 2. Fetch Data (ONLY if no external images are provided)
  useEffect(() => {
    if (externalImages) return; // Skip fetching if we already have images

    supabase
      .from("gallery_images")
      .select("*")
      .eq("featured", true)
      .order("order_index")
      .then(({ data }) => {
        if (data) setFetchedImages(data);
      });
  }, [externalImages]);

  // 3. Automatic Timer
  useEffect(() => {
    if (!images || images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3500);

    return () => clearInterval(interval);
  }, [images]);

  if (!images || !images.length) return null;

  return (
    // Allow custom className for height, default to h-[520px] if not provided
    <div
      className={`rounded-3xl overflow-hidden relative w-full group ${
        className || "h-[520px]"
      }`}
    >
      <div
        className="flex h-full transition-transform duration-700 ease-in-out will-change-transform"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => {
          // HANDLE DATA DIFFERENCE:
          // If 'image' is a string (from News), use it directly.
          // If 'image' is an object (from DB), use .image_url
          const src = typeof image === "string" ? image : image.image_url;
          const alt = typeof image === "string" ? `Slide ${index}` : image.alt;

          return (
            <div key={index} className="min-w-full h-full relative">
              <img
                src={src}
                alt={alt}
                className="w-full h-full object-cover select-none"
                draggable="false"
              />
            </div>
          );
        })}
      </div>

      {/* Indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentIndex
                  ? "w-6 bg-white"
                  : "w-2 bg-white/50 hover:bg-white/80"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
