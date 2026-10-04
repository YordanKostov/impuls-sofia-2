import { Link } from "react-router-dom";
import Container from "../components/Container";
import PageHeader from "../components/PageHeader";
import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import usePageTitle from "../hooks/usePageTitle";

export default function Classes() {
  const { t } = useLanguage();
  const content = t.classesPage;
  usePageTitle(content.title);

  return (
    <section className="py-12 md:py-20">
      <Container>
        <PageHeader
          eyebrow={t.hero.eyebrow}
          title={content.title}
          subtitle={content.subtitle}
        />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {content.list.map((c, i) => {
            // The top tier is the highlighted card
            const featured = i === content.list.length - 1;

            return (
              <motion.div
                key={i}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className={`flex h-full flex-col rounded-3xl p-7 transition-shadow duration-300 hover:shadow-lift md:p-8 ${
                  featured
                    ? "bg-ink text-white shadow-lift"
                    : "card"
                }`}
              >
                <div
                  className={`font-display text-5xl font-medium italic ${
                    featured ? "text-mint" : "text-mint-600"
                  }`}
                >
                  0{i + 1}
                </div>
                <h2
                  className={`mt-5 font-display text-4xl font-semibold ${
                    featured ? "text-white" : "text-ink"
                  }`}
                >
                  {c.title}
                </h2>

                <p
                  className={`mt-3 flex-grow leading-relaxed ${
                    featured ? "text-ink-100/80" : "text-ink-500"
                  }`}
                >
                  {c.desc}
                </p>

                {/* Schedule Section */}
                <div
                  className={`mt-7 border-t pt-5 ${
                    featured ? "border-white/15" : "border-ink/10"
                  }`}
                >
                  <div
                    className={`mb-3 text-xs font-bold uppercase tracking-[0.2em] ${
                      featured ? "text-mint" : "text-ink-700"
                    }`}
                  >
                    {content.labels.schedule}
                  </div>
                  <ul className="space-y-1.5">
                    {c.schedule.map((time, idx) => (
                      <li
                        key={idx}
                        className={`text-[0.95rem] font-medium tabular-nums ${
                          featured ? "text-white" : "text-ink-900"
                        }`}
                      >
                        {time}
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  to="/contact"
                  className={`mt-8 w-full ${featured ? "btn-light" : "btn-primary"}`}
                >
                  {content.labels.btn}
                </Link>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
