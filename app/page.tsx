"use client";

import { useEffect, useState } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button"
import {
  ArrowRight,
  Users,
  Zap,
  Clock,
  X,
  Calendar,
  User,
  FileText,
  Building,
  Heart,
  TrendingUp,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import CTASection from "@/components/cta-section";

interface NewsArticle {
  id: number;
  title: string;
  content: string;
  category: string;
  image?: string;
  status: string;
  published_at?: string;
  created_at: string;
  author?: {
    id: number;
    name: string;
    email: string;
  };
}

interface AnnouncementItem {
  id: number;
  title: string;
  content: string;
  category: string;
  created_at: string;
}

interface Testimonial {
  id: number;
  name: string;
  role: string;
  message: string;
}

const BUSINESS_PARTNERS = [
  { name: "Perpetual Help System DALTA", logo: "/partners/perpetual.png" },
  { name: "Barangay Council", logo: "/partners/barangay.png" },
  { name: "Local Business Association", logo: "/partners/lba.png" },
  { name: "Community Health Center", logo: "/partners/health.png" },
  { name: "Youth Development Office", logo: "/partners/youth.png" },
  { name: "Public Safety Office", logo: "/partners/safety.png" },
];

export default function Home() {
  const [announcements, setAnnouncements] = useState<AnnouncementItem[]>([]);
  const [announcementLoading, setAnnouncementLoading] = useState(true);
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(
    null
  );
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [testimonialLoading, setTestimonialLoading] = useState(true);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        setAnnouncementLoading(true);

        const res = await fetch("/api/announcements/published?per_page=6");

        if (!res.ok) {
          throw new Error(`HTTP error ${res.status}`);
        }

        const result = await res.json();

        if (result?.success) {
          const data =
            result.data?.data && Array.isArray(result.data.data)
              ? result.data.data
              : Array.isArray(result.data)
                ? result.data
                : [];

          setAnnouncements(data);
        }
      } catch (err) {
        console.error("[Home] Failed to fetch announcements:", err);
      } finally {
        setAnnouncementLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);


  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/news/published?per_page=3");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if (result.success) {
          let newsData: NewsArticle[] = [];

          if (result.data && typeof result.data === "object") {
            if (Array.isArray(result.data.data)) {
              newsData = result.data.data;
            } else if (Array.isArray(result.data)) {
              newsData = result.data;
            }
          }

          setNews(newsData);
        } else {
          throw new Error(result.message || "Failed to fetch news");
        }
      } catch (error) {
        console.error("[Home] Failed to fetch news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setTestimonialLoading(true);

        const res = await fetch("/api/testimonials/published?per_page=3");

        if (!res.ok) {
          throw new Error(`HTTP error ${res.status}`);
        }

        const result = await res.json();

        if (result?.success) {
          const data =
            result.data?.data && Array.isArray(result.data.data)
              ? result.data.data
              : Array.isArray(result.data)
                ? result.data
                : [];

          setTestimonials(data);
        }
      } catch (err) {
        console.error("[Home] Failed to fetch testimonials:", err);
      } finally {
        setTestimonialLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedArticle(null);
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  useEffect(() => {
    if (selectedArticle) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [selectedArticle]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getCategoryLabel = (category: string) => {
    const categoryMap: Record<string, string> = {
      announcement: "Announcement",
      event: "Event",
      alert: "Alert",
      update: "Update",
      news: "News",
    };
    return categoryMap[category?.toLowerCase()] || "Update";
  };

  return (
    <main className="min-h-screen bg-linear-to-br from-red-50 to-orange-50">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[70vh] lg:min-h-[75vh] flex items-center overflow-hidden bg-linear-to-br from-red-50 to-orange-50 py-20 z-20">
        {/* Overlay */}
        <div className="absolute inset-0 bg-linear-to-br from-yellow-800/90 via-[#800000]/90 to-[#800000]/90" />

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >

            <div className="hidden lg:grid lg:grid-cols-2 gap-10 items-center">
              {/* VIDEO COLUMN */}
              <div className="relative overflow-hidden rounded-xl border border-white/10 bg-black/40">
                <video
                  className="w-full h-64 md:h-80 lg:h-[360px] object-cover"
                  src="/videos/perpetual-campus.mp4"
                  poster="/images/video-poster-1.jpg"
                  muted
                  autoPlay
                  loop
                  playsInline
                />
              </div>

              <div className="relative overflow-hidden rounded-xl border border-white/10 bg-black/40">
                <video
                  className="w-full h-64 md:h-80 lg:h-[360px] object-cover"
                  src="/videos/perpetual-campus.mp4"
                  poster="/images/video-poster-1.jpg"
                  muted
                  autoPlay
                  loop
                  playsInline
                />
              </div>
            </div>

            <div className="lg:hidden m-10">
              <Carousel className="w-full h-full lg:hidden">
                <CarouselContent>
                  <CarouselItem>
                    <Card>
                      <CardContent className="relative overflow-hidden rounded-xl border border-white/10">
                        <video
                          className="w-full h-64 md:h-80 lg:h-[360px] object-cover"
                          src="/videos/perpetual-campus.mp4"
                          poster="/images/video-poster-1.jpg"
                          muted
                          autoPlay
                          loop
                          playsInline
                        />
                      </CardContent>
                    </Card>
                  </CarouselItem>
                  <CarouselItem>
                    <Card>
                      <CardContent className="relative overflow-hidden rounded-xl border border-white/10">
                        <video
                          className="w-full h-64 md:h-80 lg:h-[360px] object-cover"
                          src="/videos/perpetual-campus.mp4"
                          poster="/images/video-poster-1.jpg"
                          muted
                          autoPlay
                          loop
                          playsInline
                        />
                      </CardContent>
                    </Card>
                  </CarouselItem>
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>

            <div className="flex flex-col justify-center items-center text-center lg:text-left py-10">
              <h1 className="text-4xl lg:text-6xl font-light mb-6">
                Welcome to <span className="font-bold">Perpetual College</span>
              </h1>

              <p className="leading-relaxed text-center text-red-300 mb-8">
                Formerly known as Perpetual Help College of Rizal (PHCR),
                the University of Perpetual Help System DALTA in Las Piñas
                City is the largest campus in the system, serving around
                14,000 students and employing about 1,370 teaching and
                non-teaching staff.
              </p>

              <div className="flex justify-center lg:justify-start">
                <Button asChild size="lg" className="bg-[#dc143c] hover:bg-[#b11232]">
                  <Link href="/about-us">Learn More</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Wave Decoration */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            className="w-full h-16 md:h-24"
            viewBox="0 0 1440 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <path
              d="M0 0L60 8.33333C120 16.6667 240 33.3333 360 41.6667C480 50 600 50 720 41.6667C840 33.3333 960 16.6667 1080 16.6667C1200 16.6667 1320 33.3333 1380 41.6667L1440 50V100H1380C1320 100 1200 100 1080 100C960 100 840 100 720 100C600 100 480 100 360 100C240 100 120 100 60 100H0V0Z"
              fill="#FCF2F0"
            />
          </svg>
        </div>
      </section>

      {/* Announcement Section */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden z-10">
        {/* Background */}
        <div className="absolute inset-0 bg-linear-to-br from-red-50 to-orange-50 to-green-50 z-0" />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="uppercase bg-linear-to-r from-yellow-600 via-red-600 to-red-900 bg-clip-text text-transparent">
                Announcement
              </span>
            </h2>
            <div className="w-32 h-1.5 bg-linear-to-r from-yellow-600 via-red-600 to-red-900 rounded-full mx-auto mb-4" />
            <p className="text-lg text-gray-700 max-w-2xl mx-auto font-medium">
              Stay updated to the latest announcement
            </p>
          </motion.div>

          {announcementLoading ? (
            [...Array(6)].map((_, i) => (
              <div
                key={i}
                className="p-8 rounded-3xl bg-linear-to-br from-red-200 via-orange-200 to-green-200 animate-pulse h-64"
              />
            ))
          ) : announcements.length > 0 ? (
            announcements.map((item, i) => {
              const Icon =
                item.category === "event"
                  ? Calendar
                  : item.category === "alert"
                    ? Zap
                    : FileText;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -12, scale: 1.02 }}
                  className="p-8 rounded-3xl bg-white border-2 border-gray-100 hover:border-red-300 hover:shadow-2xl transition-all group"
                >
                  <div className="w-16 h-16 bg-linear-to-br from-yellow-400 via-red-600 to-red-900 rounded-full flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:bg-linear-to-r group-hover:from-red-600 group-hover:via-orange-600 group-hover:to-green-600 group-hover:bg-clip-text group-hover:text-transparent transition-all">
                    {item.title}
                  </h3>

                  <p className="text-gray-600 leading-relaxed line-clamp-3">
                    {item.content}
                  </p>
                </motion.div>
              );
            })
          ) : (
            <div className="col-span-full text-center py-12 text-gray-600">
              No announcements available.
            </div>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Link href="/announcement">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 rounded-full bg-linear-to-tl from-yellow-600 via-red-700 to-red-900 text-white font-bold inline-flex items-center gap-3 shadow-2xl hover:shadow-orange-500/50 transition-all text-lg"
              >
                View more announcement <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="uppercase bg-linear-to-r from-yellow-600 via-red-600 to-red-900 bg-clip-text text-transparent">
                Latest Updates
              </span>
            </h2>
            <div className="w-32 h-1.5 bg-linear-to-r from-yellow-600 via-red-600 to-red-900 rounded-full mx-auto mb-4" />
            <p className="text-lg text-gray-700 max-w-2xl mx-auto font-medium">
              Stay informed with recent news
            </p>
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="p-6 rounded-3xl bg-linear-to-br from-red-200 via-orange-200 to-green-200 animate-pulse h-96"
                />
              ))}
            </div>
          ) : news.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {news.slice(0, 3).map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -12, scale: 1.02 }}
                  onClick={() => setSelectedArticle(item)}
                  className="group rounded-3xl bg-white overflow-hidden shadow-lg hover:shadow-2xl transition-all cursor-pointer border-2 border-gray-100 hover:border-orange-300"
                >
                  <div className="relative h-56 overflow-hidden bg-linear-to-br from-red-100 via-orange-100 to-green-100">
                    {item.image ? (
                      <img
                        src={`${process.env.NEXT_PUBLIC_IMAGE_URL || ""}/${item.image
                          }`}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-red-500 via-orange-500 to-green-500 text-white text-6xl">
                        📰
                      </div>
                    )}
                    <div className="absolute top-4 right-4">
                      <span className="px-4 py-2 rounded-full text-xs font-bold uppercase bg-linear-to-r from-red-500 via-orange-500 to-green-500 text-white shadow-lg">
                        {getCategoryLabel(item.category)}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <p className="text-sm text-gray-500 mb-3 flex items-center gap-2 font-medium">
                      <Clock className="w-4 h-4" />
                      {item.published_at
                        ? formatDate(item.published_at)
                        : formatDate(item.created_at)}
                    </p>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:bg-linear-to-r group-hover:from-red-600 group-hover:via-orange-600 group-hover:to-green-600 group-hover:bg-clip-text group-hover:text-transparent transition-all">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 line-clamp-3 leading-relaxed mb-4">
                      {item.content.substring(0, 120)}...
                    </p>
                    <motion.div
                      whileHover={{ x: 5 }}
                      className="inline-flex items-center gap-2 text-sm font-bold bg-linear-to-r from-red-600 via-orange-600 to-green-600 bg-clip-text text-transparent"
                    >
                      Read More
                      <ArrowRight className="w-4 h-4 text-orange-500" />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">No news available at the moment.</p>
            </div>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Link href="/news">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 rounded-full bg-linear-to-tl from-yellow-600 via-red-700 to-red-900 text-white font-bold inline-flex items-center gap-3 shadow-2xl hover:shadow-orange-500/50 transition-all text-lg"
              >
                View All News <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedArticle(null)}
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
            >
              <div className="relative h-72 md:h-96 overflow-hidden">
                {selectedArticle.image ? (
                  <img
                    src={`${process.env.NEXT_PUBLIC_IMAGE_URL || ""}/${selectedArticle.image
                      }`}
                    alt={selectedArticle.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-linear-to-r from-red-500 via-orange-500 to-green-500 flex items-center justify-center text-white text-8xl">
                    📰
                  </div>
                )}

                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />

                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedArticle(null)}
                  className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-xl hover:bg-white transition-colors z-10"
                  aria-label="Close modal"
                >
                  <X className="w-6 h-6 text-gray-700" />
                </motion.button>

                <div className="absolute bottom-6 left-6">
                  <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold uppercase bg-linear-to-r from-red-500 via-orange-500 to-green-500 text-white shadow-xl">
                    {getCategoryLabel(selectedArticle.category)}
                  </span>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-8 md:p-10">
                <div className="space-y-6">
                  <h2 className="text-3xl md:text-4xl font-bold bg-linear-to-r from-red-600 via-orange-600 to-green-600 bg-clip-text text-transparent leading-tight">
                    {selectedArticle.title}
                  </h2>

                  <div className="flex flex-wrap items-center gap-6 pb-6 border-b-2 border-gray-200">
                    <div className="flex items-center gap-2 text-gray-600">
                      <div className="w-10 h-10 bg-linear-to-br from-red-100 via-orange-100 to-green-100 rounded-full flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-orange-600" />
                      </div>
                      <span className="font-medium">
                        {selectedArticle.published_at
                          ? formatDate(selectedArticle.published_at)
                          : formatDate(selectedArticle.created_at)}
                      </span>
                    </div>

                    {selectedArticle.author && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <div className="w-10 h-10 bg-linear-to-br from-red-100 via-orange-100 to-green-100 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-orange-600" />
                        </div>
                        <span className="font-medium">
                          By {selectedArticle.author.name}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="prose prose-lg max-w-none">
                    <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
                      {selectedArticle.content}
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t-2 border-gray-200 px-8 md:px-10 py-6 bg-linear-to-r from-red-50 via-orange-50 to-green-50">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedArticle(null)}
                  className="w-full sm:w-auto px-8 py-4 bg-linear-to-r from-red-600 via-orange-600 to-green-600 text-white rounded-full hover:shadow-2xl transition-all font-bold text-lg"
                >
                  Close
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-accent-300 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="uppercase bg-linear-to-r from-yellow-600 via-red-600 to-red-900 bg-clip-text text-transparent">
                What Other Student Say
              </span>
            </h2>
            <div className="w-32 h-1.5 bg-linear-to-r from-yellow-600 via-red-600 to-red-900 rounded-full mx-auto mb-4" />
            <p className="text-lg text-gray-700 max-w-2xl mx-auto font-medium">
              View what others said
            </p>
            <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-6">
              {testimonialLoading ? (
                [...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-gray-100 p-8 rounded-3xl shadow animate-pulse h-56"
                  />
                ))
              ) : testimonials.length > 0 ? (
                testimonials.map((t, i) => (
                  <motion.div
                    key={t.id}
                    whileHover={{ y: -6 }}
                    className="bg-gray-50 p-8 rounded-3xl shadow border"
                  >
                    <p className="italic text-gray-700 mb-6">“{t.message}”</p>
                    <h4 className="font-bold">{t.name}</h4>
                    <p className="text-sm text-gray-500">{t.role}</p>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full text-center py-12 text-gray-600">
                  No testimonials available.
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Business Partners Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-linear-to-br from-red-50 to-orange-50 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="uppercase bg-linear-to-r from-yellow-600 via-red-600 to-red-900 bg-clip-text text-transparent">
                Our Business Partners
              </span>
            </h2>
            <div className="w-32 h-1.5 bg-linear-to-r from-yellow-600 via-red-600 to-red-900 rounded-full mx-auto mb-4" />
            <p className="text-lg text-gray-700 max-w-2xl mx-auto font-medium">
              Trusted organizations working with us to serve the community better
            </p>
          </motion.div>

          {/* Continuous Slider */}
          <div className="relative overflow-hidden">
            <motion.div
              className="flex gap-10"
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                repeat: Infinity,
                repeatType: "loop",
                duration: 30,
                ease: "linear",
              }}
            >
              {[...BUSINESS_PARTNERS, ...BUSINESS_PARTNERS].map((partner, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 w-64 h-32 bg-white rounded-2xl shadow-lg border border-gray-100 flex items-center justify-center hover:shadow-2xl transition-all"
                >
                  {partner.logo ? (
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="max-h-16 object-contain"
                    />
                  ) : (
                    <span className="font-bold text-gray-700 text-center px-4">
                      {partner.name}
                    </span>
                  )}
                </div>
              ))}
            </motion.div>

            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-linear-to-r from-red-50 to-transparent pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-linear-to-l from-red-50 to-transparent pointer-events-none" />
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </main>
  );
}

