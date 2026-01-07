import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { Link } from 'react-router-dom'

export default function News() {
    const [articles, setArticles] = useState([])

    useEffect(() => {
        supabase
            .from('articles')
            .select('title, excerpt, slug, cover_image')
            .order('published_at', { ascending: false })
            .then(({ data }) => setArticles(data))
    }, [])

    return (
        <main className="py-20">
            <h1 className="text-4xl font-bold">News</h1>

            <div className="mt-10 grid md:grid-cols-2 gap-8">
                {articles.map(a => (
                    <Link key={a.slug} to={`/news/${a.slug}`}>
                        <article className="group rounded-2xl overflow-hidden shadow hover:shadow-lg transition">
                            <img src={a.cover_image} className="h-64 w-full object-cover" />
                            <div className="p-6 bg-white">
                                <h2 className="text-xl font-semibold group-hover:text-rose-600">
                                    {a.title}
                                </h2>
                                <p className="mt-2 text-gray-600">{a.excerpt}</p>
                            </div>
                        </article>
                    </Link>
                ))}
            </div>
        </main>
    )
}
