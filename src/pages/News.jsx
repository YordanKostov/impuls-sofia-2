import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { Link } from "react-router-dom";
import Container from "../components/Container"; // Added for consistent margins
// 1. Import the hook
import { useLanguage } from "../context/LanguageContext";

export default function News() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  // 2. Get translations
  const { t } = useLanguage();
  const content = t.newsPage;

  useEffect(() => {
    supabase
      .from("articles")
      // If you later add 'title_bg', add it to this select string
      .select("title, excerpt, slug, cover_image, published_at")
      .order("published_at", { ascending: false })
      .then(({ data }) => {
        setArticles(data || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading news:", error);
        setLoading(false);
      });
  }, []);

  return (
    <main className="py-20 min-h-screen">
      <Container>
        <div className="max-w-2xl mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900">
            {content.title}
          </h1>
          <p className="mt-3 text-gray-600 text-lg">{content.subtitle}</p>
        </div>

        {loading ? (
          <div className="text-gray-500 py-10">{content.loading}</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((a) => (
              <Link
                key={a.slug}
                to={`/news/${a.slug}`}
                className="group block h-full"
              >
                <article className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                  <div className="h-56 overflow-hidden relative">
                    {/* Image Fallback if no cover image exists */}
                    {a.cover_image ? (
                      <img
                        src={a.cover_image}
                        alt={a.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                        No Image
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <h2 className="text-xl font-bold text-gray-900 group-hover:text-rose-600 transition-colors line-clamp-2">
                      {a.title}
                    </h2>
                    <p className="mt-3 text-gray-600 line-clamp-3 text-sm leading-relaxed flex-grow">
                      {a.excerpt}
                    </p>

                    <div className="mt-6 pt-4 border-t border-gray-100 flex items-center text-rose-600 font-semibold text-sm">
                      {content.readMore}
                      <svg
                        className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}

        {!loading && articles.length === 0 && (
          <div className="text-gray-500 italic">{content.empty}</div>
        )}
      </Container>
    </main>
  );
}
