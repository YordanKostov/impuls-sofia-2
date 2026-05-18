import { Link } from "react-router-dom";
import Container from "../components/Container";
import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

export default function Classes() {
  const { t } = useLanguage();
  const content = t.classesPage;

  const tierStripes = ["bg-emerald-400", "bg-amber-400", "bg-rose-500"];

  return (
    <main className="py-20">
      <Container>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-extrabold text-gray-900">
            {content.title}
          </h2>
          <p className="mt-3 text-gray-600 max-w-2xl text-lg">
            {content.subtitle}
          </p>
        </motion.div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {content.list.map((c, i) => (
            <motion.div
              key={i}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              whileHover={{ y: -6 }}
              className="pt-8 px-6 pb-6 rounded-2xl border border-gray-100 bg-white shadow-lg hover:shadow-xl transition-all flex flex-col h-full overflow-hidden relative"
            >
              {/* Tier accent stripe */}
              <div className={`absolute top-0 left-0 right-0 h-1.5 ${tierStripes[i]}`} />

              {/* Header */}
              <div className="mb-4">
                <div className="font-bold text-xl text-gray-900">{c.title}</div>
              </div>

              {/* Description (Age is now included here) */}
              <p className="text-gray-600 leading-relaxed text-sm mb-6 flex-grow">
                {c.desc}
              </p>

              {/* Schedule Section */}
              <div className="bg-gray-50 rounded-xl p-4 mb-6 border border-gray-100">
                <div className="flex items-center gap-2 mb-2 text-gray-900 font-semibold text-sm">
                  <svg
                    className="w-4 h-4 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {content.labels.schedule}
                </div>

                <div className="space-y-1">
                  {c.schedule.map((time, idx) => (
                    <div key={idx} className="text-sm text-gray-600">
                      {time}
                    </div>
                  ))}
                </div>
              </div>

              {/* Button */}
              <div className="mt-auto">
                <Link
                  to="/contact"
                  className="block w-full text-center px-5 py-3 rounded-full bg-gray-900 text-white text-sm font-bold hover:bg-gray-800 transition-colors"
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
