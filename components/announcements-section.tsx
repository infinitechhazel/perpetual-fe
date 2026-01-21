"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bell, Calendar, Loader2, X, Tag, Sparkles, AlertTriangle } from "lucide-react"

interface Announcement {
  id: number
  title: string
  date: string
  category: "Update" | "Event" | "Alert" | "Development" | "Health" | "Notice"
  description: string
  content: string
  is_active: boolean
  priority: number
  image_url?: string
  created_at: string
  updated_at: string
}

export default function AnnouncementsSection() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [email, setEmail] = useState("")
  const [subscribing, setSubscribing] = useState(false)
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null)

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
  }

  useEffect(() => {
    fetchAnnouncements()
  }, [])

  const fetchAnnouncements = async () => {
    try {
      setLoading(true)
      setError(null)
      
      console.log('Fetching announcements...')
      
      const response = await fetch(`/api/announcements?per_page=6`)
      
      console.log('Response status:', response.status)
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Failed to fetch announcements' }))
        console.error('API error:', errorData)
        throw new Error(errorData.message || 'Failed to load announcements')
      }

      const data = await response.json()
      console.log('API response:', data)

      if (data.success && data.data) {
        const announcementsArray = data.data.data || data.data || []
        console.log('Announcements:', announcementsArray)
        setAnnouncements(announcementsArray)
      } else {
        throw new Error(data.message || "Failed to load announcements")
      }
    } catch (err) {
      console.error("Error fetching announcements:", err)
      const errorMessage = err instanceof Error ? err.message : "Failed to load announcements"
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const handleSubscribe = async () => {
    if (!email || !email.includes('@')) {
      alert("Please enter a valid email address.")
      return
    }

    setSubscribing(true)

    try {
      const subscribeResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/subscribers/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const subscribeData = await subscribeResponse.json()

      if (!subscribeData.success) {
        alert(subscribeData.message || 'Failed to subscribe. Please try again.')
        setSubscribing(false)
        return
      }

      const emailResponse = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: email,
          type: 'verification',
          data: {
            email: email,
            verifyUrl: `${window.location.origin}/verify-subscription?token=${subscribeData.data.token}`,
          },
        }),
      })

      const emailData = await emailResponse.json()

      if (emailData.success) {
        setEmail("")
        alert("Successfully subscribed! Please check your email to verify your subscription.")
      } else {
        alert("Subscribed, but failed to send verification email. Please contact support.")
      }

    } catch (error) {
      console.error('Subscription error:', error)
      alert("Failed to subscribe. Please try again later.")
    } finally {
      setSubscribing(false)
    }
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      Alert: "bg-linear-to-r from-red-500 to-orange-500 text-white",
      Event: "bg-linear-to-r from-orange-500 to-red-400 text-white",
      Update: "bg-linear-to-r from-green-500 to-orange-400 text-white",
      Development: "bg-linear-to-r from-red-400 to-green-500 text-white",
      Health: "bg-linear-to-r from-green-600 to-green-400 text-white",
      Notice: "bg-linear-to-r from-orange-600 to-red-500 text-white",
    }
    return colors[category as keyof typeof colors] || "bg-linear-to-r from-gray-600 to-gray-400 text-white"
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
      <div className="pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden z-10 bg-linear-to-br from-red-50 to-orange-50">
      {/* Animated Background */}
      <div className="absolute inset-0" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-linear-to-br from-red-200/30 via-orange-200/30 to-green-200/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-linear-to-tr from-green-200/30 via-orange-200/30 to-red-200/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <motion.div
            className="flex items-center justify-center gap-3 mb-6"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
          </motion.div>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="relative w-16 h-16 mx-auto mb-4">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border-4 border-transparent border-t-red-500 border-r-orange-500 border-b-yellow-500 rounded-full"
                />
              </div>
              <p className="text-gray-700 font-medium">Loading announcements...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
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
            <button
              onClick={fetchAnnouncements}
              className="px-8 py-4 bg-linear-to-r from-red-600 via-orange-600 to-green-600 text-white rounded-full hover:shadow-2xl transition-all font-semibold text-lg hover:scale-105"
            >
              Try Again
            </button>
          </motion.div>
        )}

        {/* Announcements Grid */}
        {!loading && !error && announcements.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
              {announcements.map((announcement, i) => (
                <motion.div
                  key={announcement.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -12, scale: 1.02 }}
                  onClick={() => setSelectedAnnouncement(announcement)}
                  className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all cursor-pointer border-2 border-gray-100 hover:border-yellow-300"
                >
                  {/* Hover Gradient Effect */}
                  <div className="absolute inset-0 bg-linear-to-br from-red-500/5 via-orange-500/5 to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                  {/* Image */}
                  <div className="relative h-56 overflow-hidden bg-linear-to-br from-red-100 via-yellow-100 to-green-100 flex items-center justify-center">
                    <img
                      src={getImageUrl(announcement.image_url)}
                      alt={announcement.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder.svg"
                      }}
                    />
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase shadow-lg ${getCategoryColor(announcement.category)}`}>
                        <Tag className="w-3 h-3" />
                        {announcement.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 relative z-10">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                      <Calendar className="w-4 h-4" />
                      <span className="font-medium">
                        {formatDate(announcement.date)}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:bg-linear-to-r group-hover:from-yellow-600 group-hover:via-red-600 group-hover:to-red-900 group-hover:bg-clip-text group-hover:text-transparent transition-all line-clamp-2">
                      {announcement.title}
                    </h3>

                    <p className="text-gray-600 line-clamp-3 leading-relaxed mb-4">
                      {announcement.description}
                    </p>

                    <motion.div
                      whileHover={{ x: 5 }}
                      className="inline-flex items-center gap-2 text-sm font-bold bg-linear-to-r from-yellow-600 via-red-600 to-red-900 bg-clip-text text-transparent"
                    >
                      Read More
                      <svg className="w-4 h-4 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative rounded-3xl bg-white border-4 border-transparent bg-clip-padding p-10 md:p-16 text-center shadow-2xl overflow-hidden"
              style={{
                background: 'linear-gradient(white, white) padding-box, linear-gradient(to right, #dc2626, #ea580c, #059669) border-box'
              }}
            >
              {/* Gradient Background */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0 bg-linear-to-r from-red-600 via-orange-600 to-green-600" />
              </div>

              <div className="relative z-10">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="w-20 h-20 mx-auto mb-6 bg-linear-to-r from-red-600 via-orange-600 to-green-600 rounded-full flex items-center justify-center shadow-lg"
                >
                  <Sparkles className="w-10 h-10 text-white" />
                </motion.div>

                <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-linear-to-r from-red-600 via-orange-600 to-green-600 bg-clip-text text-transparent">
                  Never Miss an Update
                </h2>
                <p className="text-gray-700 mb-8 max-w-2xl mx-auto text-lg font-medium">
                  Subscribe to receive the latest announcements and community news directly to your inbox
                </p>

                <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSubscribe()}
                    placeholder="Enter your email address"
                    className="flex-1 px-6 py-4 rounded-full text-gray-900 bg-gray-50 border-2 border-gray-200 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 shadow-md text-lg font-medium"
                  />
                  <motion.button
                    onClick={handleSubscribe}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={subscribing}
                    className="px-8 py-4 bg-linear-to-r from-red-600 via-orange-600 to-green-600 text-white font-bold rounded-full hover:shadow-2xl transition-all disabled:opacity-50 flex items-center justify-center gap-2 whitespace-nowrap shadow-xl text-lg"
                  >
                    {subscribing ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Subscribing...
                      </>
                    ) : (
                      'Subscribe Now'
                    )}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}

        {/* Empty State */}
        {!loading && !error && announcements.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <div className="w-24 h-24 bg-linear-to-br from-yellow-400 via-red-600 to-[#800000]/90 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
              <Bell className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-2xl font-bold bg-linear-to-r from-red-600 via-orange-600 to-green-600 bg-clip-text text-transparent mb-3">
              No Announcements Yet
            </h3>
            <p className="text-gray-600 text-lg">Check back later for community updates and news.</p>
          </motion.div>
        )}
      </div>

      {/* Announcement Modal */}
      <AnimatePresence>
        {selectedAnnouncement && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedAnnouncement(null)}
            className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col"
            >
              {/* Modal Header with Image */}
              <div className="relative overflow-hidden bg-linear-to-br from-gray-50 to-gray-100 p-6 md:p-8">
                {selectedAnnouncement.image_url ? (
                  <div className="w-full flex items-center justify-center">
                    <img
                      src={getImageUrl(selectedAnnouncement.image_url)}
                      alt={selectedAnnouncement.title}
                      className="w-full h-auto max-h-[400px] object-cover rounded-xl shadow-lg"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder.svg"
                      }}
                    />
                  </div>
                ) : (
                  <div className="w-full h-64 bg-linear-to-r from-red-500 via-orange-500 to-green-500 rounded-xl"></div>
                )}
                
                {/* Close Button */}
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedAnnouncement(null)}
                  className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-full p-3 shadow-xl hover:bg-white transition-colors z-20"
                  aria-label="Close modal"
                >
                  <X className="w-6 h-6 text-gray-700" />
                </motion.button>

                {/* Category Badge on Image */}
                <div className="absolute top-4 left-4 z-20">
                  <span className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold uppercase shadow-xl ${getCategoryColor(selectedAnnouncement.category)}`}>
                    <Tag className="w-4 h-4" />
                    {selectedAnnouncement.category}
                  </span>
                </div>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto p-8 md:p-10">
                <div className="space-y-6">
                  {/* Title */}
                  <h2 className="text-3xl md:text-3xl font-bold bg-linear-to-r from-yellow-600 via-red-600 to-red-900 bg-clip-text text-transparent leading-tight">
                    {selectedAnnouncement.title}
                  </h2>

                  {/* Meta Info */}
                  <div className="flex flex-wrap items-center gap-6 pb-6 border-b-2 border-gray-200">
                    <div className="flex items-center gap-2 text-gray-600">
                      <div className="w-10 h-10 bg-linear-to-br from-red-100 via-yellow-100 to-green-100 rounded-full flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-yellow-600" />
                      </div>
                      <span className="font-medium">
                        {formatDate(selectedAnnouncement.date)}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <h4 className="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wider flex items-center gap-2">
                      <div className="w-1 h-5 bg-linear-to-b from-red-500 via-orange-500 to-green-500 rounded-full" />
                      Overview
                    </h4>
                    <p className="text-gray-700 text-lg leading-relaxed">{selectedAnnouncement.description}</p>
                  </div>

                  {/* Content */}
                  <div>
                    <h4 className="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wider flex items-center gap-2">
                      <div className="w-1 h-5 bg-linear-to-b from-red-500 via-orange-500 to-green-500 rounded-full" />
                      Full Details
                    </h4>
                    <div className="p-6 bg-linear-to-br from-red-50 via-orange-50 to-green-50 rounded-2xl border-2 border-gray-200">
                      <p className="text-gray-900 whitespace-pre-wrap leading-relaxed text-base">
                        {selectedAnnouncement.content}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="border-t-2 border-gray-200 px-8 md:px-10 py-6 bg-linear-to-r from-red-50 via-orange-50 to-green-50">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedAnnouncement(null)}
                  className="w-full sm:w-auto px-8 py-4 bg-linear-to-r from-red-600 via-orange-600 to-green-600 text-white rounded-full hover:shadow-2xl transition-all font-bold text-lg"
                >
                  Close
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}