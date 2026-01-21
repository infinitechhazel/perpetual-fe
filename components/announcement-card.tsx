"use client"
<<<<<<< HEAD
import { useState, useEffect } from "react"
import {
  Search,
  Filter,
  Eye,
  Plus,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Newspaper,
  User,
  X,
  Calendar,
  Upload,
  AlertCircle,
  Save,
  Building2,
  Hash,
  Tag, Users, Home, Leaf, Award, ZoomIn, Target, Globe
} from "lucide-react"
import AdminLayout from "@/components/adminLayout"

type CommunityItem = {
  id: number;
  community_list: string;
  community_card_icon: string;
  community_card_number: string;
  community_card_category: string;
};

export default function AdminCommunityPage() {
  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isEdit, setIsEdit] = useState(false)

  const [formData, setFormData] = useState({
    community_header: "",
    community_title: "",
    community_content: "",
  })

  const [communityList, setCommunityList] = useState<CommunityItem[]>([
    {
      id: Date.now(),
      community_list: "",
      community_card_icon: "",
      community_card_number: "",
      community_card_category: "",
    },
  ])

  useEffect(() => {
    fetchCommunityData()
  }, [])

  const fetchCommunityData = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/our-community")

      if (response.ok) {
        const data = await response.json()
        if (data.success && data.data) {
          setIsEdit(true)
          setFormData({
            community_header: data.data.community_header || "",
            community_title: data.data.community_title || "",
            community_content: data.data.community_content || "",
          })

          // Handle array fields from database
          const lists = data.data.community_list || []
          const icons = data.data.community_card_icon || []
          const numbers = data.data.community_card_number || []
          const categories = data.data.community_card_category || []

          // Find the maximum length to handle all items
          const maxLength = Math.max(
            lists.length,
            icons.length,
            numbers.length,
            categories.length,
            1 // At least one item
          )

          // Map arrays into communityList items
          const items = Array.from({ length: maxLength }, (_, index) => ({
            id: Date.now() + index,
            community_list: lists[index] || "",
            community_card_icon: icons[index] || "",
            community_card_number: numbers[index] || "",
            community_card_category: categories[index] || "",
          }))

          setCommunityList(items)
        }
      }
    } catch (error) {
      console.error("Error fetching community data:", error)
    } finally {
      setLoading(false)
    }
  }

  const addCommunityItem = () => {
    setCommunityList([
      ...communityList,
      {
        id: Date.now(),
        community_list: "",
        community_card_icon: "",
        community_card_number: "",
        community_card_category: "",
      },
    ])
  }

  const removeCommunityItem = (id: number) => {
    if (communityList.length > 1) {
      setCommunityList(communityList.filter((item) => item.id !== id))
    }
  }

  const updateCommunityItem = (id: number, field: string, value: string) => {
    setCommunityList(
      communityList.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    )
  }

  const handleSubmit = async () => {
    try {
      if (
        !formData.community_header ||
        !formData.community_title ||
        !formData.community_content
      ) {
        alert("Please fill in all required fields")
        return
      }

      setIsSubmitting(true)

      const method = isEdit ? "PUT" : "POST"

      // Convert communityList array into separate arrays for each field
      const payload = {
        community_header: formData.community_header,
        community_title: formData.community_title,
        community_content: formData.community_content,
        community_list: communityList.map(item => item.community_list),
        community_card_icon: communityList.map(item => item.community_card_icon),
        community_card_number: communityList.map(item => item.community_card_number),
        community_card_category: communityList.map(item => item.community_card_category),
      }

      console.log("Submitting payload:", payload)

      const response = await fetch("/api/our-community", {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      })

      const text = await response.text()
      console.log("Raw response:", text)

      let data
      try {
        data = JSON.parse(text)
        console.log("Parsed JSON:", data)
      } catch {
        alert("Invalid server response")
        return
      }

      if (response.ok && data.success) {
        alert(`Community ${isEdit ? "updated" : "created"} successfully`)
        fetchCommunityData()
      } else {
        alert(data.message || "Failed to save community")
      }
    } catch (error) {
      console.error("Submit error:", error)
      alert("Failed to save community")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Building2 className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Community Management</h1>
                  <p className="text-sm text-gray-500">Manage community information and cards</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
          {/* Main Information Card */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Community Information</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Header <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.community_header}
                  onChange={(e) => setFormData({ ...formData, community_header: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Enter community header"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.community_title}
                  onChange={(e) => setFormData({ ...formData, community_title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Enter community title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Content <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.community_content}
                  onChange={(e) => setFormData({ ...formData, community_content: e.target.value })}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                  placeholder="Enter community content"
                />
              </div>
            </div>
          </div>

          {/* Community List Cards */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Community Cards</h2>
              <button
                onClick={addCommunityItem}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-600 to-orange-500 text-white rounded-lg hover:from-emerald-700 hover:to-orange-600 transition-all text-sm font-medium"
              >
                <Plus className="w-4 h-4" />
                Add Card
              </button>
            </div>

            <div className="space-y-4">
              {communityList.map((item, index) => (
                <div
                  key={item.id}
                  className="border border-gray-200 rounded-lg p-4 hover:border-orange-300 transition-colors"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-medium text-gray-700">Card #{index + 1}</h3>
                    {communityList.length > 1 && (
                      <button
                        onClick={() => removeCommunityItem(item.id)}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                        title="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Card Title
                      </label>
                      <input
                        type="text"
                        value={item.community_list}
                        onChange={(e) =>
                          updateCommunityItem(item.id, "community_list", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="Enter list item"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        <div className="flex items-center gap-1">
                          <Building2 className="w-4 h-4" />
                          Card Icon
                        </div>
                      </label>
                      <select
                        value={item.community_card_icon}
                        onChange={(e) =>
                          updateCommunityItem(item.id, "community_card_icon", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      >
                        <option value="">Select an icon</option>
                        <option value="User">User</option>
                        <option value="Newspaper">Newspaper</option>
                        <option value="Calendar">Calendar</option>
                        <option value="Building2">Building</option>
                        <option value="Home">Home</option>
                        <option value="Award">Award</option>
                        <option value="Leaf">Leaf</option>
                        <option value="Eye">Eye</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        <div className="flex items-center gap-1">
                          <Hash className="w-4 h-4" />
                          Card Number
                        </div>
                      </label>
                      <input
                        type="text"
                        value={item.community_card_number}
                        onChange={(e) =>
                          updateCommunityItem(item.id, "community_card_number", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="e.g., 100+"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        <div className="flex items-center gap-1">
                          <Tag className="w-4 h-4" />
                          Card Category
                        </div>
                      </label>
                      <input
                        type="text"
                        value={item.community_card_category}
                        onChange={(e) =>
                          updateCommunityItem(item.id, "community_card_category", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="e.g., Active Members"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Save Button */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-emerald-600 to-orange-500 text-white rounded-lg hover:from-emerald-700 hover:to-orange-600 transition-all text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Save Community
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
=======

import { motion } from "framer-motion"
import { Bell, Search, ArrowRight } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Link from "next/link"
import { useState } from "react"

const announcements = [
  {
    id: 1,
    title: "New City Hall Hours",
    excerpt: "City Hall will now open on weekends starting next month.",
    content:
      "City Hall will now open on weekends starting next month. This initiative aims to make government services more accessible to working members and families.",
    category: "Important",
    date: "Nov 13, 2024",
    featured: true,
  },
  {
    id: 2,
    title: "Infrastructure Update",
    excerpt: "Road maintenance on Main Street scheduled for next week.",
    content:
      "Road maintenance on Main Street is scheduled for next week. Expect temporary traffic disruptions during working hours.",
    category: "Notice",
    date: "Nov 12, 2024",
    featured: false,
  },
  {
    id: 3,
    title: "Community Event",
    excerpt: "Join us for the Annual Perpetual Village City Festival this weekend!",
    content:
      "Join us for the Annual Perpetual Village City Festival this weekend! Enjoy food, music, and community activities for the whole family.",
    category: "Event",
    date: "Nov 11, 2024",
    featured: false,
  },
  {
    id: 4,
    title: "Emergency Services Update",
    excerpt: "Enhanced 911 response system now available 24/7.",
    content: "Our enhanced 911 response system is now fully operational and available 24/7 for all city residents.",
    category: "Important",
    date: "Nov 10, 2024",
    featured: false,
  },
  {
    id: 5,
    title: "Community Cleanup Drive",
    excerpt: "Join us for a city-wide cleanup initiative.",
    content: "Join us for a city-wide cleanup initiative. Meet at Central Park at 8 AM on Saturday.",
    category: "Event",
    date: "Nov 9, 2024",
    featured: false,
  },
]

export default function AnnouncementsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const filteredAnnouncements = announcements.filter((ann) => {
    const matchesSearch =
      ann.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ann.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = !selectedCategory || ann.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const categories = [...new Set(announcements.map((ann) => ann.category))]

  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      <section className="bg-linear-to-br from-orange-600 to-emerald-600 text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 mb-6"
          >
            <Bell className="w-10 h-10" />
            <h1 className="text-4xl md:text-5xl font-bold">Latest Announcements</h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-xl text-white/90 max-w-2xl"
          >
            Stay informed with the most recent updates and important notices from Perpetual Village City Government.
          </motion.p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto">
          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search announcements..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-full font-medium transition-all ${
                selectedCategory === null
                  ? "bg-linear-to-r from-orange-600 to-emerald-600 text-white"
                  : "bg-white border border-gray-300 text-gray-700 hover:border-orange-300"
              }`}
            >
              All
            </motion.button>
            {categories.map((cat) => (
              <motion.button
                key={cat}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === cat
                    ? "bg-linear-to-r from-orange-600 to-emerald-600 text-white"
                    : "bg-white border border-gray-300 text-gray-700 hover:border-orange-300"
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Announcement */}
      {filteredAnnouncements.some((ann) => ann.featured) && (
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            {filteredAnnouncements
              .filter((ann) => ann.featured)
              .map((announcement) => (
                <motion.div
                  key={announcement.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="bg-linear-to-br from-orange-500 to-emerald-500 rounded-2xl p-12 text-white hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-start justify-between mb-6">
                    <span className="px-4 py-2 rounded-full bg-white/95 text-gray-900 text-sm font-bold">
                      {announcement.category}
                    </span>
                    <span className="text-white/80 text-sm">{announcement.date}</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{announcement.title}</h2>
                  <p className="text-lg text-white/95 mb-6 leading-relaxed">{announcement.content}</p>
                  <motion.button
                    whileHover={{ x: 5 }}
                    className="text-white font-bold flex items-center gap-2 hover:gap-3 transition-all"
                  >
                    Read Full Story <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </motion.div>
              ))}
          </div>
        </section>
      )}

      <section className="flex-1 py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          {filteredAnnouncements.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredAnnouncements
                .filter((ann) => !ann.featured)
                .map((announcement, i) => (
                  <motion.div
                    key={announcement.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.5 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -8 }}
                    className="bg-linear-to-br from-orange-500 to-emerald-500 rounded-xl p-6 text-white hover:shadow-xl transition-all group cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <span className="px-3 py-1 rounded-full bg-white/95 text-gray-900 text-xs font-bold">
                        {announcement.category}
                      </span>
                      <div className="w-2 h-2 rounded-full bg-white" />
                    </div>
                    <span className="text-xs text-white/70">{announcement.date}</span>
                    <h3 className="text-lg font-bold text-white mb-3 mt-3 line-clamp-2">{announcement.title}</h3>
                    <p className="text-white/90 text-sm mb-6 line-clamp-3">{announcement.excerpt}</p>
                    <motion.div
                      animate={{ x: 0 }}
                      className="text-white font-semibold text-sm flex items-center gap-2 group-hover:gap-3 transition-all"
                    >
                      Read More <ArrowRight className="w-4 h-4" />
                    </motion.div>
                  </motion.div>
                ))}
            </motion.div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-gray-500">No announcements found matching your search.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-linear-to-r from-orange-600 to-emerald-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Need City Services?</h2>
            <p className="text-lg text-white/90 mb-8">
              Explore our comprehensive range of government services available to all residents.
            </p>
            <Link href="/services">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 bg-white text-orange-600 font-bold rounded-lg hover:shadow-lg transition-shadow inline-flex items-center gap-2"
              >
                Explore Services <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
>>>>>>> 561776b9ce8628155506d64a5d7a830f2d0d8d55
