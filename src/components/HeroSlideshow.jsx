import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const INTERVAL_MS = 6000;

// Portrait photo slideshow with a soft glow taken from the current photo.
// `slides` are { src, caption }.
export default function HeroSlideshow({ slides, className = "" }) {
  const [index, setIndex] = useState(0);
  const count = slides.length;

  useEffect(() => {
    setIndex(0);
  }, [count]);

  useEffect(() => {
    if (count <= 1) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = setTimeout(() => {
      if (!document.hidden) setIndex((i) => (i + 1) % count);
    }, INTERVAL_MS);
    return () => clearTimeout(timer);
  }, [index, count]);

  const current = slides[index];

  return (
    <div className={`relative ${className}`}>
      {/* Glow: a blurred copy of the current photo behind the frame */}
      <div className="absolute inset-4 -z-10" aria-hidden="true">
        <AnimatePresence initial={false}>
          {current && (
            <motion.img
              key={current.src}
              src={current.src}
              alt=""
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.55, transition: { duration: 1.2 } }}
              exit={{ opacity: 0, transition: { duration: 1.2 } }}
              className="absolute inset-0 h-full w-full translate-y-6 scale-110 object-cover blur-3xl"
            />
          )}
        </AnimatePresence>
      </div>

      <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-ink-100 shadow-lift">
        {!current && <div className="skeleton absolute inset-0 rounded-none" />}
        <AnimatePresence initial={false}>
          {current && (
            <motion.img
              key={current.src}
              src={current.src}
              alt=""
              fetchPriority={index === 0 ? "high" : "auto"}
              decoding="async"
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{
                opacity: 1,
                scale: 1,
                transition: {
                  opacity: { duration: 1.2, ease: "easeOut" },
                  scale: { duration: INTERVAL_MS / 1000 + 1.5, ease: "linear" },
                },
              }}
              exit={{ opacity: 0, transition: { duration: 1.2 } }}
              className="absolute inset-0 h-full w-full select-none object-cover object-top"
              draggable="false"
            />
          )}
        </AnimatePresence>

        {/* Caption + story-style progress bars */}
        {count > 0 && (
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-950/75 to-transparent px-5 pb-5 pt-20">
            {current?.caption && (
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
