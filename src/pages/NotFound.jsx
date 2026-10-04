import { Link } from "react-router-dom";
import Container from "../components/Container";
import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import usePageTitle from "../hooks/usePageTitle";

export default function NotFound() {
  const { t } = useLanguage();
  const content = t.notFoundPage;
  usePageTitle(content.title);

  return (
    <section className="flex min-h-[70vh] items-center justify-center py-20">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-lg text-center"
        >
          <div
            className="select-none font-display text-[11rem] font-medium italic leading-none text-mint-600/40"
            aria-hidden="true"
          >
            404
          </div>
          <h1 className="display -mt-6 text-4xl md:text-5xl">{content.title}</h1>
          <p className="mt-4 text-lg text-ink-500">{content.desc}</p>
          <Link to="/" className="btn-primary mt-8">
            {content.btn}
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
