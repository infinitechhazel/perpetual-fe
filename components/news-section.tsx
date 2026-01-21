"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
<<<<<<< HEAD
import { X, Calendar, User, Newspaper, Clock } from "lucide-react"
=======
import { X, Calendar, User, Newspaper, Clock, AlertTriangle } from "lucide-react"
>>>>>>> 561776b9ce8628155506d64a5d7a830f2d0d8d55

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

<<<<<<< HEAD
=======
const IMAGE_BASE_URL =
  process.env.NEXT_PUBLIC_IMAGE_URL ?? "http://localhost:8000"

>>>>>>> 561776b9ce8628155506d64a5d7a830f2d0d8d55
export default function NewsSection() {
  const [news, setNews] = React.useState<NewsArticle[]>([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)
<<<<<<< HEAD
  const [selectedArticle, setSelectedArticle] = React.useState<NewsArticle | null>(null)

  // Get image URL - handle relative paths from Laravel
  const getImageUrl = (imagePath?: string) => {
    if (!imagePath) return "/placeholder.svg"
    
    // If it's already a full URL, return it
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      return imagePath
    }
    
    // Otherwise, prepend the Laravel backend URL
    const baseUrl = process.env.NEXT_PUBLIC_IMAGE_URL || 'http://localhost:8000'
    // Remove leading slash if present to avoid double slashes
    const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath
    return `${baseUrl}/${cleanPath}`
=======
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
>>>>>>> 561776b9ce8628155506d64a5d7a830f2d0d8d55
  }

  React.useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true)
        setError(null)
<<<<<<< HEAD
        
        const response = await fetch('/api/news/published?per_page=12')
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const result = await response.json()
        
        if (result.success) {
          let newsData: NewsArticle[] = []
          
          if (result.data && typeof result.data === 'object') {
            if (Array.isArray(result.data.data)) {
              newsData = result.data.data
            } else if (Array.isArray(result.data)) {
              newsData = result.data
            }
          }
          
          setNews(newsData)
        } else {
          throw new Error(result.message || 'Failed to fetch news')
        }
      } catch (err) {
        console.error('Error fetching news:', err)
        setError(err instanceof Error ? err.message : 'An error occurred')
=======

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
>>>>>>> 561776b9ce8628155506d64a5d7a830f2d0d8d55
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [])

  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
<<<<<<< HEAD
      if (e.key === 'Escape') setSelectedArticle(null)
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [])

  React.useEffect(() => {
    if (selectedArticle) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [selectedArticle])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <>
      <div className="py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto relative z-10">

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="relative w-16 h-16 mx-auto mb-4">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 border-4 border-transparent border-t-red-500 border-r-yellow-500 border-b-yellow-500 rounded-full"
                  />
                </div>
                <p className="text-gray-700 font-medium">Loading news...</p>
              </div>
            </div>
          ) : error ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-600 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <X className="w-8 h-8 text-white" />
              </div>
              <p className="text-red-700 mb-6 font-semibold text-lg">Failed to load news: {error}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-8 py-4 bg-gradient-to-tl from-yellow-600 via-red-700 to-red-900 text-white rounded-full hover:shadow-2xl transition-all font-semibold text-lg hover:scale-105"
              >
                Try Again
              </button>
            </motion.div>
          ) : news.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <div className="w-24 h-24 bg-gradient-to-br from-red-500 via-yellow-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                <Newspaper className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-yellow-600 via-red-600 to-red-900 bg-clip-text text-transparent mb-3">
                No News Available
              </h3>
              <p className="text-gray-600 text-lg">Check back later for community updates and stories.</p>
            </motion.div>
=======
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
>>>>>>> 561776b9ce8628155506d64a5d7a830f2d0d8d55
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {news.map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
<<<<<<< HEAD
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -12, scale: 1.02 }}
                  onClick={() => setSelectedArticle(article)}
                  className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all cursor-pointer border-2 border-gray-100 hover:border-yellow-300"
                >
                  {/* Hover Gradient Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-yellow-500/5 to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                  {/* Image */}
                  <div className="relative h-56 overflow-hidden bg-gradient-to-br from-red-100 via-yellow-100 to-green-100 flex items-center justify-center">
                    <img
                      src={getImageUrl(article.image)}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
=======
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
>>>>>>> 561776b9ce8628155506d64a5d7a830f2d0d8d55
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder.svg"
                      }}
                    />
<<<<<<< HEAD
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase bg-gradient-to-tl from-yellow-600 via-red-700 to-red-900 text-white shadow-lg">
                        {article.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 relative z-10">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                      <Clock className="w-4 h-4" />
                      <span className="font-medium">
                        {formatDate(article.published_at || article.created_at)}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:bg-gradient-to-r group-hover:from-yellow-600 group-hover:via-red-600 group-hover:to-red-900 group-hover:bg-clip-text group-hover:text-transparent transition-all line-clamp-2">
                      {article.title}
                    </h3>

                    <p className="text-gray-600 line-clamp-3 leading-relaxed mb-4">
                      {article.content.substring(0, 150)}...
                    </p>

                    <motion.div
                      whileHover={{ x: 5 }}
                      className="inline-flex items-center gap-2 text-sm font-bold bg-gradient-to-r from-yellow-600 via-red-600 to-red-900 bg-clip-text text-transparent"
                    >
                      Read Full Story
                      <svg className="w-4 h-4 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </motion.div>
=======
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
>>>>>>> 561776b9ce8628155506d64a5d7a830f2d0d8d55
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

<<<<<<< HEAD
      {/* Modal */}
=======
>>>>>>> 561776b9ce8628155506d64a5d7a830f2d0d8d55
      <AnimatePresence>
        {selectedArticle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedArticle(null)}
<<<<<<< HEAD
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col"
            >
              {/* Modal Header with Image */}
              <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 p-6 md:p-8">
                {selectedArticle.image ? (
                  <div className="w-full flex items-center justify-center">
                    <img
                      src={getImageUrl(selectedArticle.image)}
                      alt={selectedArticle.title}
                      className="w-full h-auto max-h-[400px] object-cover rounded-xl shadow-lg"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder.svg"
                      }}
                    />
                  </div>
                ) : (
                  <div className="w-full h-64 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-xl"></div>
                )}
                
                {/* Close Button */}
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedArticle(null)}
                  className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-full p-3 shadow-xl hover:bg-white transition-colors z-20"
                  aria-label="Close modal"
                >
                  <X className="w-6 h-6 text-gray-700" />
                </motion.button>

                {/* Category Badge on Image */}
                <div className="absolute top-4 left-4 z-20">
                  <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold uppercase bg-gradient-to-tl from-yellow-600 via-red-700 to-red-900 text-white shadow-xl">
                    {selectedArticle.category}
                  </span>
                </div>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto p-8 md:p-10">
                <div className="space-y-6">
                  {/* Title */}
                  <h2 className="text-3xl md:text-3xl font-bold bg-gradient-to-r from-yellow-600 via-red-600 to-red-900 bg-clip-text text-transparent leading-tight">
                    {selectedArticle.title}
                  </h2>

                  {/* Meta Info */}
                  <div className="flex flex-wrap items-center gap-6 pb-6 border-b-2 border-gray-200">
                    <div className="flex items-center gap-2 text-gray-600">
                      <div className="w-10 h-10 bg-gradient-to-br from-red-100 via-yellow-100 to-green-100 rounded-full flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-yellow-600" />
                      </div>
                      <span className="font-medium">
                        {formatDate(selectedArticle.published_at || selectedArticle.created_at)}
                      </span>
                    </div>
                    
                    {selectedArticle.author && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <div className="w-10 h-10 bg-gradient-to-br from-red-100 via-yellow-100 to-green-100 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-yellow-600" />
                        </div>
                        <span className="font-medium">By {selectedArticle.author.name}</span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="prose prose-lg max-w-none">
                    <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
                      {selectedArticle.content}
                    </p>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="border-t-2 border-gray-200 px-8 md:px-10 py-6 bg-gradient-to-r from-red-50 via-yellow-50 to-green-50">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedArticle(null)}
                  className="w-full sm:w-auto px-8 py-4 bg-gradient-to-tl from-yellow-600 via-red-700 to-red-900 text-white rounded-full hover:shadow-2xl transition-all font-bold text-lg"
                >
                  Close
                </motion.button>
=======
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
>>>>>>> 561776b9ce8628155506d64a5d7a830f2d0d8d55
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
<<<<<<< HEAD
}
=======
}
>>>>>>> 561776b9ce8628155506d64a5d7a830f2d0d8d55
