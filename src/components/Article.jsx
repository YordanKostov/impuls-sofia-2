import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import Container from "../components/Container";
import ImageCarousel from "../components/ImageCarousel";
import { useLanguage } from "../context/LanguageContext";
import usePageTitle from "../hooks/usePageTitle";
import { motion } from "framer-motion";

function BackLink({ label }) {
  return (
    <Link to="/news" className="link-arrow mb-10">
      <span aria-hidden="true">←</span> {label}
    </Link>
  );
}

export default function Article() {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const { t, lang } = useLanguage();
  const content = t.newsPage;

  usePageTitle(article?.title || content.title);

  useEffect(() => {
    let ignore = false;
    setLoading(true);

    async function fetchArticle() {
      const { data, error } = await supabase
        .from("articles")
        .select(`
          title, 
          content, 
          cover_image, 
          published_at,
          album_id,
          albums (
            id,
            gallery_images (
              image_url,
              order_index
            )
          )
        `)
        .eq("slug", slug)
        .maybeSingle();

      if (ignore) return;
      if (error) console.error("Error fetching article:", error);
      setArticle(data || null);
      setLoading(false);
    }

    fetchArticle();
    return () => {
      ignore = true;
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="py-16 md:py-24" aria-busy="true">
        <Container>
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
            <div className="skeleton aspect-[4/5] rounded-[2rem]" />
            <div className="space-y-4 pt-4">
              <div className="skeleton h-12 w-4/5" />
              <div className="skeleton h-4 w-1/3" />
              <div className="skeleton h-4 w-full" />
              <div className="skeleton h-4 w-full" />
              <div className="skeleton h-4 w-2/3" />
            </div>
          </div>
        </Container>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="py-32 text-center">
        <Container>
          <p className="display mb-8 text-4xl">{content.notFound}</p>
          <BackLink label={content.back} />
        </Container>
      </div>
    );
  }

  // Cover image first, then the photos of the linked album (if any)
  const albumImages = [...(article.albums?.gallery_images || [])]
    .sort((a, b) => a.order_index - b.order_index)
    .map((img) => img.image_url);
  const allImages = [...new Set([article.cover_image, ...albumImages].filter(Boolean))];

  const dateStr = new Date(article.published_at).toLocaleDateString(
    lang === "bg" ? "bg-BG" : "en-US",
    { year: "numeric", month: "long", day: "numeric" }
  );

  return (
    <article className="py-12 md:py-20">
      <Container>
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <BackLink label={content.back} />
        </motion.div>

        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Carousel */}
          {allImages.length > 0 && (
            <motion.div
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="lg:sticky lg:top-28"
            >
              <ImageCarousel
                images={allImages}
                priority
                className="aspect-square rounded-[2rem] shadow-lift md:aspect-[4/5]"
              />
            </motion.div>
          )}

          {/* Text Content */}
          <motion.div
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={allImages.length ? "" : "lg:col-span-2 lg:max-w-3xl"}
          >
            <time dateTime={article.published_at} className="eyebrow mb-5">
              {dateStr}
            </time>
            <h1 className="display mb-8 text-4xl md:text-6xl">
              {article.title}
            </h1>
            <div className="whitespace-pre-wrap text-lg leading-relaxed text-ink-900/80">
              {article.content}
            </div>
          </motion.div>
        </div>
      </Container>
    </article>
  );
}
