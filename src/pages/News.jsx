import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import PageHeader from "../components/PageHeader";
import { useLanguage } from "../context/LanguageContext";
import usePageTitle from "../hooks/usePageTitle";
import { motion } from "framer-motion";

export default function News() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const { t, lang } = useLanguage();
  const content = t.newsPage;
  usePageTitle(content.title);

  useEffect(() => {
    let ignore = false;

    async function fetchArticles() {
      const { data, error } = await supabase
        .from("articles")
        .select("title, excerpt, slug, cover_image, published_at")
        .order("published_at", { ascending: false });

      if (ignore) return;
      if (error) console.error("Error loading news:", error);
      setArticles(data || []);
      setLoading(false);
    }

    fetchArticles();
    return () => {
      ignore = true;
    };
  }, []);

  const formatDate = (value) =>
    value
      ? new Date(value).toLocaleDateString(lang === "bg" ? "bg-BG" : "en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "";

  return (
    <section className="py-12 md:py-20">
      <Container>
        <PageHeader
          eyebrow="Impuls Sofia"
          title={content.title}
          subtitle={content.subtitle}
        />

        {loading ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3" aria-busy="true">
            {[...Array(3)].map((_, i) => (
              <div key={i}>
                <div className="skeleton aspect-[4/3]" />
                <div className="skeleton mt-5 h-3 w-1/3" />
                <div className="skeleton mt-3 h-7 w-4/5" />
                <div className="skeleton mt-3 h-4 w-full" />
              </div>
            ))}
          </div>
        ) : articles.length === 0 ? (
          <p className="font-display text-2xl italic text-ink-500">
            {content.empty}
          </p>
        ) : (
          <div className="grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((a, i) => (
              <motion.article
                key={a.slug}
                initial={{ y: 24, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 3) * 0.08, duration: 0.45 }}
              >
                <Link to={`/news/${a.slug}`} className="group block">
                  <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-mint-100 shadow-soft">
                    {a.cover_image ? (
                      <img
                        src={a.cover_image}
                        alt=""
                        loading={i < 3 ? "eager" : "lazy"}
                        decoding="async"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center font-display text-6xl italic text-ink-700/30">
                        IS
                      </div>
                    )}
                  </div>

                  <time
                    dateTime={a.published_at}
                    className="mt-5 block text-xs font-bold uppercase tracking-[0.18em] text-mint-600"
                  >
                    {formatDate(a.published_at)}
                  </time>
                  <h2 className="mt-2 line-clamp-2 font-display text-3xl font-semibold leading-tight text-ink transition-colors group-hover:text-ink-700">
                    {a.title}
                  </h2>
                  <p className="mt-2 line-clamp-3 leading-relaxed text-ink-500">
                    {a.excerpt}
                  </p>
                  <span className="link-arrow mt-4">
                    {content.readMore}
                    <span
                      className="transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </span>
                </Link>
              </motion.article>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
