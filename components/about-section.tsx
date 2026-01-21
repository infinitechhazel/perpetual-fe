
"use client"

import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Users, Home, Leaf, Award, X, Target, Globe } from "lucide-react"

export default function AboutSection() {
  const [isImageModalOpen, setIsImageModalOpen] = React.useState(false)

  const stats = [
    {
      icon: Users,
      number: "18,500+",
      label: "Proud Residents",
    },
    {
      icon: Home,
      number: "4,200+",
      label: "Households",
    },
    {
      icon: Leaf,
      number: "3",
      label: "Green Spaces",
    },
    {
      icon: Award,
      number: "20+",
      label: "Community Programs",
    },
  ]

  const highlights = [
    "Delivering efficient and responsive barangay services",
    "Fostering unity through community events and festivals",
    "Championing environmental sustainability initiatives",
    "Empowering residents through livelihood and skills programs",
  ]

  return (

    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-orange-50 to-green-50" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Stats Grid - Now on Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-6"
          >
            {stats.map((stat, i) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.15, duration: 0.5 }}
                  whileHover={{ y: -8, scale: 1.05 }}
                  className="p-8 rounded-2xl bg-white/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all border-2 border-transparent hover:border-gradient-to-r hover:from-red-400 hover:via-orange-400 hover:to-green-400 text-center group"
                >
                  <div className="w-16 h-16 rounded-full bg-linear-to-br from-yellow-400 via-red-600 to-[#800000]/90 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-4xl font-bold bg-linear-to-r from-green-600 via-red-600 to-[#800000]/90 bg-clip-text text-transparent mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm font-medium text-gray-600">{stat.label}</div>
                </motion.div>
              )
            })}
          </motion.div>

          {/* Text Content - Now on Right */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="inline-block mb-4"
            >
              <span className="px-4 py-2 rounded-full bg-linear-to-r from-red-800 via-red-800 to-yellow-500/80 text-sm font-semibold bg-linear-to-r from-green-600 via-red-600 to-[#800000]/90 bg-clip-text text-transparent">
                Our Community
              </span>
            </motion.div>

            <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="bg-linear-to-r from-yellow-600 via-red-600 to-red-900 bg-clip-text text-transparent">
                Perpetual Village
              </span>
            </h2>

            <div className="w-20 h-1.5 bg-linear-to-r from-yellow-600 via-red-600 to-red-900 rounded-full mb-6" />

            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Nestled in the bustling city of Las Piñas, Perpetual Village is a thriving urban community
              where tradition meets progress. Home to over 18,500 residents, we are a diverse neighborhood
              united by shared values of cooperation, resilience, and progress.
            </p>

            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              Our barangay is more than just a place it&apos;s a home where families grow, businesses flourish,
              and every voice matters. We take pride in:
            </p>

            <ul className="space-y-4">
              {highlights.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.15, duration: 0.5 }}
                  className="flex items-start gap-4 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-linear-to-br from-yellow-400 via-red-600 to-[#800000]/90 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform shadow-md">
                    <span className="text-white text-lg font-bold">✓</span>
                  </div>
                  <span className="text-gray-800 text-lg font-medium">{item}</span>
                </motion.li>
              ))}
            </ul>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-10"
            >
              <button className="px-8 py-4 rounded-full bg-linear-to-tl from-yellow-600 via-red-700 to-red-900 text-white font-semibold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all">
                Learn More About Us
              </button>
            </motion.div>
          </motion.div>
        </div>

        {/* Mission & Vision Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-24 mb-24"
        >
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="inline-block mb-4"
            >
              <span className="px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm text-sm font-semibold bg-linear-to-r from-green-600 via-red-600 to-[#800000]/90 bg-clip-text text-transparent">
                Our Purpose
              </span>
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-linear-to-r from-yellow-600 via-red-600 to-red-900 bg-clip-text text-transparent">
                Mission & Vision
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Mission Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.08 }}
              className="bg-linear-to-br from-yellow-500 via-red-600 to-[#800000]/90 text-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 p-8 md:p-10"
            >
              <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-xl backdrop-blur-sm bg-white/20">
                <Target className="w-8 h-8 text-orange-200" />
              </div>
              <h3 className="text-3xl font-bold mb-4">Our Mission</h3>
              <p className="text-lg text-orange-100 leading-relaxed">
                To provide responsive, transparent, and inclusive governance that empowers every
                resident, strengthens community bonds, and creates sustainable programs that improve
                the quality of life for all families in Perpetual Village.
              </p>
            </motion.div>

            {/* Vision Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.08 }}
              className="bg-linear-to-br from-yellow-500 via-red-600 to-[#800000]/90 text-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 p-8 md:p-10"
            >
              <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-xl backdrop-blur-sm bg-white/20">
                <Globe className="w-8 h-8 text-orange-200" />
              </div>
              <h3 className="text-3xl font-bold mb-4">Our Vision</h3>
              <p className="text-lg text-red-100 leading-relaxed">
                To be a model barangay in Las Piñas City, recognized for excellence in community
                service, environmental stewardship, and citizen participation—creating a safe,
                prosperous, and harmonious home for current and future generations.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-linear-to-br from-red-300/20 via-orange-300/20 to-green-300/20 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 w-40 h-40 bg-linear-to-br from-green-300/20 via-orange-300/20 to-red-300/20 rounded-full blur-3xl" />

      {/* Full Screen Image Modal */}
      <AnimatePresence>
        {isImageModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
            onClick={() => setIsImageModalOpen(false)}
          >
            {/* Close button */}
            <button
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all group z-50"
              onClick={() => setIsImageModalOpen(false)}
            >
              <X className="w-6 h-6 text-white group-hover:rotate-90 transition-transform duration-300" />
            </button>

            {/* Image container */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-7xl max-h-[90vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src="/our-team2.jpg"
                alt="Perpetual Village Team - Full View"
                className="w-full h-full object-contain rounded-2xl shadow-2xl"
              />

              {/* Image caption */}
              <div className="mt-6 text-center">
                <h4 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  Barangay Officials & Staff 2024
                </h4>
                <p className="text-white/80 text-lg">
                  Together, building a stronger community for all
                </p>
              </div>
            </motion.div>

            {/* Click outside hint */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 text-sm">
              Click anywhere to close
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>


  )
}