import Container from "../components/Container";
import { useLanguage } from "../context/LanguageContext";
import { motion } from "framer-motion";
import { THEME } from "../theme.js";
import ImageCarousel from "../components/ImageCarousel";

export default function About() {
  const { t } = useLanguage();
  const content = t.about;

  // Make sure these are valid paths in your public folder
  const studioPhotos = ["/studio/studio.png", "/studio/studio1.png"];

  return (
    <main className={`${THEME.gradient} min-h-screen pb-20`}>
      {/* SECTION 1: STUDIO STORY */}
      <section className="pt-24 pb-20">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

            {/* Text Side */}
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
            >
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-5">
                {content.title}
              </h1>

              <div className="w-16 h-1.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full mb-6" />

              <div className="space-y-4 text-base text-gray-700 leading-relaxed whitespace-pre-wrap">
                {content.desc}
              </div>
            </motion.div>

            {/* Image Side */}
            <motion.div
              initial={{ x: 30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-white/40 rounded-[3rem] blur-xl -z-10"></div>

              {/* Height: 500px mobile, 600px desktop */}
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white/50 h-[500px] md:h-[600px]">
                <ImageCarousel
                  externalImages={studioPhotos}
                  className="h-full w-full"
                />
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* REMOVED: INSTRUCTORS SECTION */}
    </main>
  );
}