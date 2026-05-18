import { Link } from "react-router-dom";
import Container from "../components/Container";
import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

export default function NotFound() {
  const { lang } = useLanguage();

  return (
    <main className="min-h-screen flex items-center justify-center py-20">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-md mx-auto"
        >
          <div className="text-[9rem] font-black leading-none select-none text-gray-100">
            404
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 -mt-4">
            {lang === "bg" ? "Страницата не е намерена" : "Page not found"}
          </h1>
          <p className="mt-4 text-gray-500 text-lg">
            {lang === "bg"
              ? "Изглежда тази страница е излязла от залата."
              : "Looks like this page stepped off the stage."}
          </p>
          <Link
            to="/"
            className="mt-8 inline-block px-8 py-3 rounded-full bg-gray-900 text-white font-semibold hover:bg-gray-800 hover:scale-105 transition-all duration-300"
          >
            {lang === "bg" ? "Обратно начало" : "Back to home"}
          </Link>
        </motion.div>
      </Container>
    </main>
  );
}
