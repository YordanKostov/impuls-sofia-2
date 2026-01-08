import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import Container from "../components/Container";
import ImageCarousel from "../components/ImageCarousel";
import { useLanguage } from "../context/LanguageContext";

export default function Article() {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    supabase
      .from("articles")
      // Make sure to select 'gallery_images' here
      .select("title, content, cover_image, gallery_images, published_at")
      .eq("slug", slug)
      .single()
      .then(({ data }) => {
        setArticle(data);
        setLoading(false);
      });
  }, [slug]);

  if (loading)
    return <div className="py-32 text-center text-gray-500">Loading...</div>;
  if (!article)
    return (
      <div className="py-32 text-center text-gray-500">Article not found</div>
    );

  // 1. Combine the main cover image with the gallery images into one list
  const allImages = [
    article.cover_image,
    ...(article.gallery_images || []),
  ].filter(Boolean); // This removes any null/empty values

  // 2. Format the date based on language
  const dateStr = new Date(article.published_at).toLocaleDateString(
    t === "bg" ? "bg-BG" : "en-US",
    { year: "numeric", month: "long", day: "numeric" }
  );

  return (
    <main className="py-20 min-h-screen">
      <Container>
        {/* Back Button */}
        <Link
          to="/news"
          className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-rose-600 mb-8 transition-colors"
        >
          ← {t === "bg" ? "Назад към новини" : "Back to News"}
        </Link>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* LEFT: Carousel (Sticky so it stays visible while reading) */}
          <div className="lg:sticky lg:top-24">
            <ImageCarousel
              externalImages={allImages}
              // This class makes it square-ish like Instagram
              className="aspect-square md:aspect-[4/5] h-auto shadow-lg"
            />
          </div>

          {/* RIGHT: Text Content */}
          <div className="prose prose-lg prose-rose max-w-none">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
              {article.title}
            </h1>

            <div className="text-gray-400 text-sm font-medium uppercase tracking-wide mb-8 border-b border-gray-100 pb-4">
              {dateStr}
            </div>

            {/* 'whitespace-pre-wrap' preserves paragraphs/line breaks from your database */}
            <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {article.content}
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
