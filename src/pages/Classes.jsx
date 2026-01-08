import { Link } from "react-router-dom";
import Container from "../components/Container";
import { motion } from "framer-motion";
// 1. Remove old data import
// import classes from "../data/classes.js"

// 2. Import the hook
import { useLanguage } from "../context/LanguageContext";

export default function Classes() {
  // 3. Get the data
  const { t } = useLanguage();
  const content = t.classesPage; // Helper variable for cleaner code

  return (
    <main className="py-20">
      <Container>
        <h2 className="text-3xl font-extrabold text-gray-900">
          {content.title}
        </h2>
        <p className="mt-3 text-gray-600 max-w-2xl text-lg">
          {content.subtitle}
        </p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 4. Map over content.list */}
          {content.list.map((c, i) => (
            <motion.div
              key={i} // Use index or c.title as key
              whileHover={{ y: -6 }}
              className="p-6 rounded-2xl border border-gray-100 bg-white shadow-lg hover:shadow-xl transition-all"
            >
              <div className="font-bold text-xl text-gray-900">{c.title}</div>

              <div className="text-sm font-medium text-pink-600 mt-1 uppercase tracking-wide">
                {content.labels.level} {c.level}
              </div>

              <p className="mt-4 text-gray-600 leading-relaxed min-h-[3rem]">
                {c.desc}
              </p>

              <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4">
                <div className="text-sm font-medium text-gray-500">
                  {content.labels.duration} {c.duration}
                </div>
                <Link
                  to="/contact"
                  className="px-5 py-2 rounded-full bg-gray-900 text-white text-sm font-bold hover:bg-gray-800 transition-colors"
                >
                  {content.labels.btn}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </main>
  );
}
