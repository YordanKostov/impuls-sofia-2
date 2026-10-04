import { useEffect, useRef, useState } from "react";

const INTERVAL_MS = 4500;
const SWIPE_THRESHOLD = 40;

// `images` is a list of URL strings or { image_url, alt } objects
export default function ImageCarousel({ images = [], className = "", priority = false }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef(null);
  const count = images.length;

  // Keep the index valid if the image list changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [count]);

  // Automatic Timer
  useEffect(() => {
    if (count <= 1 || paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const interval = setInterval(() => {
      if (document.hidden) return;
      setCurrentIndex((prev) => (prev + 1) % count);
    }, INTERVAL_MS);

    return () => clearInterval(interval);
  }, [count, paused]);

  const onTouchEnd = (e) => {
    if (touchStartX.current === null || count <= 1) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) < SWIPE_THRESHOLD) return;
    setCurrentIndex((prev) => (prev + (delta < 0 ? 1 : -1) + count) % count);
  };

  // Reserve the space while images load so the layout doesn't jump
  if (!count) {
    return <div className={`skeleton w-full ${className}`} aria-hidden="true" />;
  }

  return (
    <div
      className={`group relative w-full overflow-hidden bg-ink-100 ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={(e) => (touchStartX.current = e.touches[0].clientX)}
      onTouchEnd={onTouchEnd}
    >
      <div
        className="flex h-full transition-transform duration-1000 ease-[cubic-bezier(0.65,0,0.35,1)] will-change-transform"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => {
          const src = typeof image === "string" ? image : image.image_url;
          const alt = typeof image === "string" ? "" : image.alt || "";
          const eager = priority && index === 0;

          return (
            <div key={src} className="h-full min-w-full">
              <img
                src={src}
                alt={alt}
                loading={eager ? "eager" : "lazy"}
                fetchPriority={eager ? "high" : "auto"}
                decoding="async"
                className="h-full w-full select-none object-cover"
                draggable="false"
              />
            </div>
          );
        })}
      </div>

      {/* Indicators */}
      {count > 1 && (
        <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 gap-1.5 rounded-full bg-ink-950/35 px-2.5 py-2 backdrop-blur-sm">
          {images.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === currentIndex
                  ? "w-6 bg-white"
                  : "w-1.5 bg-white/55 hover:bg-white/90"
              }`}
              aria-label={`${idx + 1} / ${count}`}
              aria-current={idx === currentIndex}
            />
          ))}
        </div>
      )}
    </div>
  );
}
