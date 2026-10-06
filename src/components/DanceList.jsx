import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// The two dance groups; clicking a dance expands its description (one at a time).
export default function DanceList({ groups }) {
  const [openKey, setOpenKey] = useState(null);

  return (
    <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-2 md:gap-16">
      {groups.map((group, g) => (
        <div key={g}>
          <h2 className="mb-6 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.22em] text-mint">
            <span className="font-display text-2xl font-medium normal-case italic tracking-normal">
              0{g + 1}
            </span>
            {group.label}
          </h2>
          <ul>
            {group.list.map((dance, i) => {
              const key = `${g}-${i}`;
              const isOpen = openKey === key;
              const panelId = `dance-panel-${key}`;

              return (
                <motion.li
                  key={key}
                  initial={{ x: -16, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.45 }}
                  className="border-t border-white/10 last:border-b"
                >
                  <button
                    type="button"
                    onClick={() => setOpenKey(isOpen ? null : key)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="group flex w-full items-center justify-between gap-4 py-2.5 text-left md:py-3"
                  >
                    <span
                      className={`font-display text-2xl font-medium transition-all duration-300 group-hover:translate-x-2 group-hover:text-mint sm:text-3xl md:text-4xl ${
                        isOpen ? "translate-x-2 italic text-mint" : "text-white/90"
                      }`}
                    >
                      {dance.name}
                    </span>
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                        isOpen
                          ? "rotate-45 border-mint bg-mint text-ink-950"
                          : "border-white/20 text-white/60 group-hover:border-mint group-hover:text-mint"
                      }`}
                      aria-hidden="true"
                    >
                      <svg className="h-3.5 w-3.5" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
                        <path d="M7 1v12M1 7h12" />
                      </svg>
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={panelId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-prose pb-6 pr-12 leading-relaxed text-ink-100/80">
                          {dance.desc}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}
