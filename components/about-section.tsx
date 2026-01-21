
"use client"

import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Users, Home, Leaf, Award, X, ZoomIn, Target, Globe } from "lucide-react"

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
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 via-red-600 to-[#800000]/90 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-4xl font-bold bg-gradient-to-r from-green-600 via-red-600 to-[#800000]/90 bg-clip-text text-transparent mb-2">
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
              <span className="px-4 py-2 rounded-full bg-gradient-to-r from-red-800 via-red-800 to-yellow-500/80 text-sm font-semibold bg-gradient-to-r from-green-600 via-red-600 to-[#800000]/90 bg-clip-text text-transparent">
                Our Community
              </span>
            </motion.div>

            <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-yellow-600 via-red-600 to-red-900 bg-clip-text text-transparent">
                Perpetual Village
              </span>
            </h2>

            <div className="w-20 h-1.5 bg-gradient-to-r from-yellow-600 via-red-600 to-red-900 rounded-full mb-6" />

            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Nestled in the bustling city of Las Piñas, Perpetual Village is a thriving urban community
              where tradition meets progress. Home to over 18,500 residents, we are a diverse neighborhood
              united by shared values of cooperation, resilience, and progress.
            </p>

            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              Our barangay is more than just a place—it's a home where families grow, businesses flourish,
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
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-yellow-400 via-red-600 to-[#800000]/90 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform shadow-md">
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
              <button className="px-8 py-4 rounded-full bg-gradient-to-tl from-yellow-600 via-red-700 to-red-900 text-white font-semibold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all">
                Learn More About Us
              </button>
            </motion.div>
          </motion.div>
        </div>



        {/* Goals Section - FULL WIDTH BACKGROUND */}
        <div className="mt-24 mb-24 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-12 bg-gradient-to-br from-red-50 via-orange-50 to-green-50">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-12 max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="inline-block mb-4"
              >
                <span className="px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm text-sm font-semibold bg-gradient-to-r from-green-600 via-red-600 to-[#800000]/90 bg-clip-text text-transparent">
                  Our Commitment
                </span>
              </motion.div>

              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-yellow-600 via-red-600 to-red-900 bg-clip-text text-transparent">
                  Strategic Goals for 2025
                </span>
              </h2>

              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Building a better tomorrow through focused initiatives and community-driven programs
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {/* Goal 1: Community Safety */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 p-8 border-2 border-transparent hover:border-red-200"
              >
                <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-yellow-400 via-red-600 to-[#800000]/90 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>

                <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-yellow-600 via-red-600 to-red-900 bg-clip-text text-transparent">
                  Enhanced Community Safety
                </h3>

                <p className="text-gray-700 leading-relaxed mb-4">
                  Strengthen our neighborhood watch programs and improve street lighting across all zones. Deploy additional CCTV cameras in strategic locations and enhance emergency response coordination.
                </p>

                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-1">•</span>
                    <span>24/7 monitoring system implementation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-1">•</span>
                    <span>Community safety training workshops</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-1">•</span>
                    <span>Disaster preparedness programs</span>
                  </li>
                </ul>
              </motion.div>

              {/* Goal 2: Environmental Sustainability */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 p-8 border-2 border-transparent hover:border-green-200"
              >
                <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-green-400 via-emerald-600 to-green-800 shadow-lg">
                  <Leaf className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-green-600 via-emerald-600 to-green-800 bg-clip-text text-transparent">
                  Environmental Sustainability
                </h3>

                <p className="text-gray-700 leading-relaxed mb-4">
                  Launch comprehensive waste segregation initiatives and expand our urban gardening projects. Create green spaces and promote eco-friendly practices throughout the community.
                </p>

                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>Zero-waste community program</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>Tree planting and park development</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>Solar energy adoption initiatives</span>
                  </li>
                </ul>
              </motion.div>

              {/* Goal 3: Youth Development */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 p-8 border-2 border-transparent hover:border-orange-200"
              >
                <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-orange-400 via-orange-600 to-red-600 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>

                <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-orange-600 via-orange-700 to-red-700 bg-clip-text text-transparent">
                  Youth Development Programs
                </h3>

                <p className="text-gray-700 leading-relaxed mb-4">
                  Expand educational support programs and create more opportunities for skill development. Establish mentorship programs and recreational facilities for our youth.
                </p>

                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 mt-1">•</span>
                    <span>Scholarship and tutorial programs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 mt-1">•</span>
                    <span>Sports and arts development</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 mt-1">•</span>
                    <span>Digital literacy and tech training</span>
                  </li>
                </ul>
              </motion.div>

              {/* Goal 4: Health & Wellness */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 p-8 border-2 border-transparent hover:border-blue-200"
              >
                <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-blue-400 via-blue-600 to-indigo-700 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>

                <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 bg-clip-text text-transparent">
                  Health & Wellness Services
                </h3>

                <p className="text-gray-700 leading-relaxed mb-4">
                  Enhance healthcare accessibility through mobile clinics and regular medical missions. Promote healthy lifestyles and provide mental health support services.
                </p>

                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Free health screenings and checkups</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Wellness and fitness programs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Mental health awareness campaigns</span>
                  </li>
                </ul>
              </motion.div>

              {/* Goal 5: Economic Empowerment */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 p-8 border-2 border-transparent hover:border-yellow-200"
              >
                <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-yellow-400 via-amber-600 to-orange-700 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>

                <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-yellow-600 via-amber-600 to-orange-700 bg-clip-text text-transparent">
                  Economic Empowerment
                </h3>

                <p className="text-gray-700 leading-relaxed mb-4">
                  Support local entrepreneurs through livelihood training and microfinance assistance. Create job fairs and establish partnerships with businesses for employment opportunities.
                </p>

                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 mt-1">•</span>
                    <span>Skills training and certification</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 mt-1">•</span>
                    <span>Business development support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 mt-1">•</span>
                    <span>Employment assistance programs</span>
                  </li>
                </ul>
              </motion.div>

              {/* Goal 6: Digital Transformation */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 p-8 border-2 border-transparent hover:border-purple-200"
              >
                <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-purple-400 via-purple-600 to-indigo-700 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>

                <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-700 bg-clip-text text-transparent">
                  Digital Transformation
                </h3>

                <p className="text-gray-700 leading-relaxed mb-4">
                  Modernize barangay services through digital platforms and online processing. Improve transparency and accessibility through technology adoption.
                </p>

                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 mt-1">•</span>
                    <span>Online document processing system</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 mt-1">•</span>
                    <span>Mobile app for residents</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 mt-1">•</span>
                    <span>Digital payment integration</span>
                  </li>
                </ul>
              </motion.div>
            </div>
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
              <span className="px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm text-sm font-semibold bg-gradient-to-r from-green-600 via-red-600 to-[#800000]/90 bg-clip-text text-transparent">
                Our Purpose
              </span>
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-yellow-600 via-red-600 to-red-900 bg-clip-text text-transparent">
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
              className="bg-gradient-to-br from-yellow-500 via-red-600 to-[#800000]/90 text-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 p-8 md:p-10"
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
              className="bg-gradient-to-br from-yellow-500 via-red-600 to-[#800000]/90 text-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 p-8 md:p-10"
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
        {/* Objectives Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-24"
        >
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="inline-block mb-4"
            >
              <span className="px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm text-sm font-semibold bg-gradient-to-r from-green-600 via-red-600 to-[#800000]/90 bg-clip-text text-transparent">
                Our Objectives
              </span>
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-yellow-600 via-red-600 to-red-900 bg-clip-text text-transparent">
                What We Aim to Achieve
              </span>
            </h2>

            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Our core objectives guide every decision and program we implement for the betterment of our community
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {[
              {
                number: "01",
                title: "Efficient Service Delivery",
                description: "Provide fast, reliable, and accessible barangay services to all residents through streamlined processes and modern technology."
              },
              {
                number: "02",
                title: "Community Engagement",
                description: "Foster active participation and collaboration among residents in community programs, decisions, and initiatives."
              },
              {
                number: "03",
                title: "Sustainable Development",
                description: "Promote environmentally responsible practices and create programs that ensure long-term community prosperity."
              },
              {
                number: "04",
                title: "Safety & Security",
                description: "Maintain a safe and secure environment through comprehensive safety programs and community cooperation."
              },
              {
                number: "05",
                title: "Transparent Governance",
                description: "Ensure accountability and openness in all barangay operations, building trust through clear communication."
              },
              {
                number: "06",
                title: "Inclusive Growth",
                description: "Create opportunities for all residents regardless of age, background, or economic status to thrive and succeed."
              }
            ].map((objective, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ x: 8, scale: 1.02 }}
                className="relative p-8 rounded-2xl bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-gradient-to-b from-yellow-500 via-red-600 to-[#800000]/90 group"
              >
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-yellow-400 via-red-600 to-[#800000]/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <span className="text-white font-bold text-xl">{objective.number}</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-yellow-600 via-red-600 to-red-900 bg-clip-text text-transparent">
                      {objective.title}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {objective.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Team Picture Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-24"
        >
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="inline-block mb-4"
            >
              <span className="px-4 py-2 rounded-full bg-gradient-to-r from-red-800 via-red-800 to-yellow-500/80 text-sm font-semibold bg-gradient-to-r from-red-600 via-orange-600 to-green-600 bg-clip-text text-transparent">
                Meet Our Team
              </span>
            </motion.div>

            <h3 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-yellow-600 via-red-600 to-red-900 bg-clip-text text-transparent">
                The People Behind Our Community
              </span>
            </h3>

            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Dedicated leaders and staff working together to serve Perpetual Village
            </p>
          </div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className="relative rounded-3xl overflow-hidden shadow-2xl group cursor-pointer"
            onClick={() => setIsImageModalOpen(true)}
          >
            {/* Placeholder for team image - replace with actual image */}
            <div className="aspect-[21/9] bg-gradient-to-br from-red-100 via-orange-100 to-green-100 relative">
              <img
                src="/our-team2.jpg"
                alt="Perpetual Village Team"
                className="w-full h-full object-cover"
              />


              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Zoom icon overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-xl">
                  <ZoomIn className="w-8 h-8 text-gray-800" />
                </div>
              </div>

              {/* Border effect */}
              <div className="absolute inset-0 border-4 border-transparent group-hover:border-gradient-to-r group-hover:from-red-400 group-hover:via-orange-400 group-hover:to-green-400 rounded-3xl transition-all duration-300" />
            </div>

            {/* Caption overlay */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent"
            >
              <h4 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Barangay Officials & Staff 2024
              </h4>
              <p className="text-white/90 text-lg">
                Together, building a stronger community for all
              </p>
            </motion.div>
          </motion.div>

          {/* Optional: Team stats or info below the image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <div className="text-center p-6 rounded-2xl bg-white/60 backdrop-blur-sm shadow-lg">
              <div className="text-3xl font-bold bg-gradient-to-r from-green-600 via-red-600 to-[#800000]/90 bg-clip-text text-transparent mb-2">
                15+
              </div>
              <div className="text-gray-700 font-medium">Barangay Officials</div>
            </div>

            <div className="text-center p-6 rounded-2xl bg-white/60 backdrop-blur-sm shadow-lg">
              <div className="text-3xl font-bold bg-gradient-to-r from-green-600 via-red-600 to-[#800000]/90 bg-clip-text text-transparent mb-2">
                30+
              </div>
              <div className="text-gray-700 font-medium">Dedicated Staff Members</div>
            </div>

            <div className="text-center p-6 rounded-2xl bg-white/60 backdrop-blur-sm shadow-lg">
              <div className="text-3xl font-bold bg-gradient-to-r from-green-600 via-red-600 to-[#800000]/90 bg-clip-text text-transparent mb-2">
                24/7
              </div>
              <div className="text-gray-700 font-medium">Service Commitment</div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-red-300/20 via-orange-300/20 to-green-300/20 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 w-40 h-40 bg-gradient-to-br from-green-300/20 via-orange-300/20 to-red-300/20 rounded-full blur-3xl" />

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