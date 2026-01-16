// src/pages/Article.jsx

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
        `) // <--- Comments removed from inside this string!
        .eq("slug", slug)
        .single();

      if (error) {
        console.error("Error fetching article:", error);
      } else {
        setArticle(data);
      }
      setLoading(false);
    }

    fetchArticle();
  }, [slug]);

  if (loading) return <div className="py-32 text-center text-gray-500">Loading...</div>;
  if (!article) return <div className="py-32 text-center text-gray-500">Article not found</div>;

  // --- LOGIC: GATHER IMAGES ---
  // 1. Start with the Article's main cover image
  let allImages = [article.cover_image];

  // 2. If this article is linked to an Album, grab those photos
  if (article.albums && article.albums.gallery_images) {
    const sortedAlbumImages = article.albums.gallery_images
      .sort((a, b) => a.order_index - b.order_index)
      .map((img) => img.image_url);

    allImages = [...allImages, ...sortedAlbumImages];
  }

  // 3. Clean up
  allImages = allImages.filter(Boolean);

  // Format Date
  const dateStr = new Date(article.published_at).toLocaleDateString(
    t === "bg" ? "bg-BG" : "en-US",
    { year: "numeric", month: "long", day: "numeric" }
  );

  return (
    <main className="py-20 min-h-screen">
      <Container>
        <Link
          to="/news"
          className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-rose-600 mb-8 transition-colors"
        >
          ← {t === "bg" ? "Назад към новини" : "Back to News"}
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Carousel */}
          <div className="lg:sticky lg:top-24">
            <ImageCarousel
              externalImages={allImages}
              className="aspect-square md:aspect-[4/5] h-auto shadow-lg rounded-xl overflow-hidden"
            />
          </div>

          {/* Text Content */}
          <div className="prose prose-lg prose-rose max-w-none">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
              {article.title}
            </h1>
            <div className="text-gray-400 text-sm font-medium uppercase tracking-wide mb-8 border-b border-gray-100 pb-4">
              {dateStr}
            </div>
            <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {article.content}
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}