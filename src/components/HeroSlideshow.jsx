import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const INTERVAL_MS = 6000;

// Portrait photo slideshow with a soft glow taken from the current photo.
// `slides` are { src, caption }.
//
// Every photo (and its blurred glow) stays mounted once it has been reached and
// is only revealed after it has fully loaded, so nothing half-decoded or
// freshly blurred ever flashes on screen. The next photo is preloaded.
export default function HeroSlideshow({ slides, className = "" }) {
  const [index, setIndex] = useState(0);
  const [furthest, setFurthest] = useState(0);
  const [loaded, setLoaded] = useState(() => new Set());
  const count = slides.length;

  useEffect(() => {
    setIndex(0);
    setFurthest(0);
  }, [count]);

  useEffect(() => {
    setFurthest((f) => Math.max(f, index));
  }, [index]);

  const current = slides[index];
  const currentReady = current && loaded.has(current.src);

  // Advance only once the current photo is on screen
  useEffect(() => {
    if (count <= 1 || !currentReady) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = setTimeout(() => {
      if (!document.hidden) setIndex((i) => (i + 1) % count);
    }, INTERVAL_MS);
    return () => clearTimeout(timer);
  }, [index, count, currentReady]);

  const markLoaded = (src) =>
    setLoaded((prev) => (prev.has(src) ? prev : new Set(prev).add(src)));

  // Photos reached so far plus the next one (preload)
  const mounted = slides.slice(0, Math.min(count, furthest + 2));

  const isShown = (slide, i) => i === index && loaded.has(slide.src);

  return (
    <div className={`relative isolate ${className}`}>
      {/* Glow: blurred copies of the photos, crossfading */}
      <div className="pointer-events-none absolute inset-2 z-0" aria-hidden="true">
        {mounted.map((slide, i) => (
          <img
            key={slide.src}
            src={slide.src}
            alt=""
            decoding="async"
            className={`absolute inset-0 h-full w-full translate-y-8 scale-105 object-cover blur-[48px] saturate-150 transition-opacity duration-[1200ms] ease-out ${
              isShown(slide, i) ? "opacity-90" : "opacity-0"
            }`}
          />
        ))}
      </div>

      <div className="relative z-10 aspect-[4/5] overflow-hidden rounded-[2rem] bg-ink-100 shadow-lift">
        {!currentReady && <div className="skeleton absolute inset-0 rounded-none" />}

        {mounted.map((slide, i) => (
          <img
            key={slide.src}
            src={slide.src}
            alt=""
            fetchPriority={i === 0 ? "high" : "low"}
            decoding="async"
            onLoad={() => markLoaded(slide.src)}
            className={`absolute inset-0 h-full w-full select-none object-cover object-top transition-opacity duration-[1200ms] ease-out ${
              isShown(slide, i) ? "opacity-100" : "opacity-0"
            }`}
            draggable="false"
          />
        ))}

        {/* Caption + story-style progress bars */}
        {currentReady && (
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-950/75 to-transparent px-5 pb-5 pt-20">
            {current.caption && (
              <AnimatePresence mode="wait">
                <motion.p
                  key={current.caption + index}
                  initial={{ y: 8, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -8, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="mb-3 line-clamp-2 text-sm font-semibold text-white"
                >
                  {current.caption}
                </motion.p>
              </AnimatePresence>
            )}
            {count > 1 && (
              <div className="flex gap-1.5">
                {slides.map((slide, i) => (
                  <button
                    key={slide.src}
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-label={`${i + 1} / ${count}`}
                    aria-current={i === index}
                    className="relative h-1 flex-1 overflow-hidden rounded-full bg-white/30"
                  >
                    <span
                      key={i === index ? `active-${index}` : "idle"}
                      className={`absolute inset-y-0 left-0 rounded-full bg-mint ${
                        i < index ? "w-full" : i === index ? "animate-progress" : "w-0"
                      }`}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
