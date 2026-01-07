import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function ImageCarousel() {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // 1. Fetch Data
  useEffect(() => {
    supabase
      .from("gallery_images")
      .select("*")
      .eq("featured", true)
      .order("order_index")
      .then(({ data }) => {
        if (data) setImages(data);
      });
  }, []);

  // 2. Automatic Timer
  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3500); // Set to 3.5 seconds for better readability

    return () => clearInterval(interval);
  }, [images.length]);

  if (!images.length) return null;

  return (
    // Outer Container (Viewport) - Defines size and hides overflow
    <div className="h-[520px] rounded-3xl overflow-hidden relative w-full group">
      {/* Inner Track (The sliding strip) 
         - 'flex': puts images side-by-side
         - 'transition-transform duration-700': makes the movement smooth over 700ms
         - 'style': calculates how far to move left based on index (0%, -100%, -200%, etc.)
      */}
      <div
        className="flex h-full transition-transform duration-700 ease-in-out will-change-transform"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {/* Map through ALL images */}
        {images.map((image, index) => (
          // Individual Slide Item - Must be min-w-full to take up entire viewport space
          <div key={image.id || index} className="min-w-full h-full relative">
            <img
              src={image.image_url}
              alt={image.alt || `Gallery image ${index + 1}`}
              className="w-full h-full object-cover select-none"
              draggable="false"
            />
            {/* Optional: Add a dark overlay for better text contrast if needed later */}
            {/* <div className="absolute inset-0 bg-black/20"></div> */}
          </div>
        ))}
      </div>

      {/* Optional Indicators (Dots) - Helpful to show movement */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)} // Allow clicking dots to navigate
            className={`h-2 rounded-full transition-all duration-300 ${
              idx === currentIndex
                ? "w-6 bg-white"
                : "w-2 bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
