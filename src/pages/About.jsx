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
            {/* items-center usually looks better with a tall image so text stays in middle */}

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

              {/* UPDATED: Increased height to 500px (mobile) and 600px (desktop) */}
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

      {/* SECTION 2: INSTRUCTORS */}
      <section className="py-8">
        <Container>
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-extrabold text-gray-900"
            >
              {content.teamTitle}
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.instructors.map((ins, i) => (
              <motion.div
                key={ins.name}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-3xl overflow-hidden shadow-lg border border-white/50 flex flex-col h-full group"
              >
                <div className="h-72 overflow-hidden relative">
                  <img
                    src={ins.photo}
                    alt={ins.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90"></div>

                  <div className="absolute bottom-0 left-0 p-5 text-white w-full">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-pink-400 mb-1">
                      {ins.role}
                    </p>
                    <h3 className="text-xl font-bold leading-tight">
                      {ins.name}
                    </h3>
                  </div>
                </div>

                <div className="p-5 flex-grow">
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {ins.bio ||
                      "Professional instructor dedicated to dance excellence."}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
