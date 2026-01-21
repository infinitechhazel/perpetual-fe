"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Calendar, User, Newspaper, Clock } from "lucide-react"

interface NewsArticle {
  id: number
  title: string
  content: string
  category: string
  image?: string
  status: string
  published_at?: string
  created_at: string
  author?: {
    id: number
    name: string
    email: string
  }
}

const IMAGE_BASE_URL =
  process.env.NEXT_PUBLIC_IMAGE_URL ?? "http://localhost:8000"

export default function NewsSection() {
  const [news, setNews] = React.useState<NewsArticle[]>([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)
  const [selectedArticle, setSelectedArticle] =
    React.useState<NewsArticle | null>(null)

  const getImageUrl = (imagePath?: string) => {
    if (!imagePath) return "/placeholder.svg"
    if (imagePath.startsWith("http")) return imagePath

    const cleanPath = imagePath.startsWith("/")
      ? imagePath.slice(1)
      : imagePath

    return `${IMAGE_BASE_URL}/${cleanPath}`
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return "—"
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  React.useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch("/api/news/published?per_page=12")
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const result = await response.json()

        if (result.success) {
          let newsData: NewsArticle[] = []

          if (Array.isArray(result.data?.data)) {
            newsData = result.data.data
          } else if (Array.isArray(result.data)) {
            newsData = result.data
          }

          setNews(newsData)
        } else {
          throw new Error(result.message || "Failed to fetch news")
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [])

  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedArticle(null)
    }
    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [])

  React.useEffect(() => {
    document.body.style.overflow = selectedArticle ? "hidden" : "unset"
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [selectedArticle])

  return (
    <>
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-linear-to-br from-red-50 to-orange-50">
        <div className="max-w-7xl mx-auto">

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 border-4 border-transparent border-t-red-500 border-r-yellow-500 border-b-yellow-500 rounded-full"
              />
            </div>
          ) : error ? (
            <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <div className="w-20 h-20 bg-linear-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
              <AlertTriangle className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Unable to Load Announcements</h3>
            <p className="text-red-700 mb-2 font-semibold text-lg">{error}</p>
            <p className="text-gray-600 mb-6 text-sm max-w-md mx-auto">
              There was an issue connecting to the server. Please check your connection and try again.
            </p>
          </motion.div>
          ) : news.length === 0 ? (
            <div className="text-center py-20">
              <Newspaper className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600 text-lg">
                No news available at the moment.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {news.map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                  onClick={() => setSelectedArticle(article)}
                  className="cursor-pointer bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl border"
                >
                  <div className="relative h-56 bg-gray-100">
                    <img
                      src={getImageUrl(article.image)}
                      alt={article.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder.svg"
                      }}
                    />
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                      <Clock className="w-4 h-4" />
                      {formatDate(article.published_at || article.created_at)}
                    </div>

                    <h3 className="text-xl font-bold mb-2 line-clamp-2">
                      {article.title}
                    </h3>

                    <p className="text-gray-600 line-clamp-3">
                      {article.content?.substring(0, 150) ||
                        "No preview available."}
                      …
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {selectedArticle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedArticle(null)}
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="pointer-events-auto bg-white rounded-3xl max-w-2xl w-full overflow-hidden"
            >
              <div className="p-8">
                <h2 className="text-3xl font-bold mb-4">
                  {selectedArticle.title}
                </h2>

                <p className="text-gray-700 whitespace-pre-line">
                  {selectedArticle.content}
                </p>

                <button
                  onClick={() => setSelectedArticle(null)}
                  className="mt-8 px-6 py-3 bg-red-700 text-white rounded-full"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
