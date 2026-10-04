import Container from "../components/Container";
import { useLanguage } from "../context/LanguageContext";
import { motion } from "framer-motion";
import ImageCarousel from "../components/ImageCarousel";
import usePageTitle from "../hooks/usePageTitle";

const studioPhotos = ["/studio/studio.webp", "/studio/studio1.webp"];

export default function About() {
  const { t } = useLanguage();
  const content = t.about;
  usePageTitle(content.title);

  const [lead, ...paragraphs] = content.desc
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <section className="py-12 md:py-20">
      <Container>
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Text Side */}
          <motion.div
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <div className="eyebrow mb-5">Impuls Sofia · 2017</div>
            <h1 className="display text-5xl md:text-7xl">{content.title}</h1>

            <p className="mt-8 font-display text-2xl font-medium leading-snug text-ink md:text-3xl">
              {lead}
            </p>
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-ink-900/75">
              {paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </motion.div>

          {/* Image Side */}
          <motion.div
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative lg:sticky lg:top-28 lg:col-span-5"
          >
            <div
              className="absolute inset-0 rotate-3 rounded-[2rem] bg-mint-200/70"
              aria-hidden="true"
            />
            <ImageCarousel
              images={studioPhotos}
              priority
              className="relative aspect-[4/5] rounded-[2rem] shadow-lift"
            />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
