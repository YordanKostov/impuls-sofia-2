import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export default function Article() {
    const { slug } = useParams()
    const [article, setArticle] = useState(null)

    useEffect(() => {
        supabase
            .from('articles')
            .select('*')
            .eq('slug', slug)
            .single()
            .then(({ data }) => setArticle(data))
    }, [slug])

    if (!article) return null

    return (
        <main className="py-24 max-w-3xl mx-auto px-6">
            <h1 className="text-4xl font-bold">{article.title}</h1>
            <img src={article.cover_image} className="mt-8 rounded-2xl" />
            <div className="mt-8 prose prose-lg">
                {article.content}
            </div>
        </main>
    )
}
