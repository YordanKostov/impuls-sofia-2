import { motion } from "framer-motion";

export default function PageHeader({ eyebrow, title, subtitle }) {
  return (
    <motion.header
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="mb-12 max-w-3xl md:mb-16"
    >
      {eyebrow && <div className="eyebrow mb-5">{eyebrow}</div>}
      <h1 className="display text-5xl md:text-7xl">{title}</h1>
      {subtitle && (
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-500">
          {subtitle}
        </p>
      )}
    </motion.header>
  );
}
