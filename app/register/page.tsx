"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowRight, Upload, CheckCircle2, XCircle, AlertCircle } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function RegisterPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    address: "",
    fraternityNumber: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const loginLink = "/login";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setError("") // Clear error on input change
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "The passwords you entered do not match. Please try again.",
        duration: 5000,
      })
      return
    }


    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters")
      toast({
        variant: "destructive",
        title: "Weak Password",
        description: "Your password must be at least 8 characters long for security.",
        duration: 5000,
      })
      return
    }

    setLoading(true)
    setError("")

    toast({
      title: "Creating Account...",
      description: "Please wait while we process your registration.",
      duration: 3000,
    })

    try {
      // Send as JSON instead of FormData - Laravel handles this better


      const fd = new FormData();
      fd.append("name", formData.name);
      fd.append("email", formData.email);
      fd.append("password", formData.password);
      fd.append("phone_number", formData.phoneNumber);
      fd.append("address", formData.address);
      fd.append("fraternity_number", formData.fraternityNumber);
      console.log("Submitting:", formData);

      const response = await fetch("/api/auth/register", {
        method: "POST",
        body: fd,
      });


      const result = await response.json()

      if (!response.ok) {
        if (result.errors) {
          const errorMessages = Object.values(result.errors).flat().join(", ")
          setError(errorMessages)
          toast({
            variant: "destructive",
            title: "Registration Failed",
            description: errorMessages,
            duration: 6000,
          })
        } else {
          setError(result.message || "Registration failed")
          toast({
            variant: "destructive",
            title: "Registration Failed",
            description: result.message || "Unable to create your account. Please try again.",
            duration: 6000,
          })
        }
        return
      }

      // Account is pending, don't store token
      toast({
        title: "Account Created Successfully! 🎉",
        description: "Your account has been created and is pending verification. You'll receive a notification once approved.",
        duration: 6000,
        className: "bg-green-50 border-green-200",
      })

      setTimeout(() => {
        router.push("/login")
      }, 1500)

    } catch (err) {
      console.error("Registration error:", err)
      const errorMessage = "An unexpected error occurred. Please check your connection and try again."
      setError(errorMessage)

      toast({
        variant: "destructive",
        title: "Connection Error",
        description: errorMessage,
        duration: 6000,
      })
    } finally {
      setLoading(false)
    }
  }

  const formVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const fieldVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
  }

  return (
    <main className="min-h-screen bg-linear-to-br from-emerald-50 via-white to-orange-50 flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        <div className="card-premium p-10 md:p-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-linear-to-br from-orange-100 to-emerald-100 mb-4">
              <span className="text-2xl font-bold text-orange-600">C</span>
            </div>
            <h1 className="text-4xl font-bold gradient-text mb-2">Create Account</h1>
            <p className="text-gray-600 text-lg">Join Perpetual Village City System as a member</p>
          </motion.div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3"
            >
              <XCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
              <p className="text-red-600 text-sm font-medium">{error}</p>
            </motion.div>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            <motion.div
              variants={formVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {/* name */}
              <motion.div variants={fieldVariants}>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-orange-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition"
                  placeholder="Juan Dela Cruz"
                  required
                />
              </motion.div>
              
              {/* email */}
              <motion.div variants={fieldVariants}>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-orange-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition"
                  placeholder="juan@email.com"
                  required
                />
              </motion.div>

              {/* phone number */}
              <motion.div variants={fieldVariants}>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-orange-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition"
                  placeholder="+63 912 345 6789"
                  required
                />
              </motion.div>


              <motion.div variants={fieldVariants}>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Fraternity Number *</label>
                <input
                  type="text"
                  name="fraternityNumber"
                  value={formData.fraternityNumber}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-orange-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition"
                  placeholder="Fraternity Number"
                  required
                />
              </motion.div>


              <motion.div variants={fieldVariants}>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Password *</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-orange-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition"
                  placeholder="••••••••"
                  required
                  minLength={8}
                />
              </motion.div>

              <motion.div variants={fieldVariants}>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm Password *</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-orange-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition"
                  placeholder="••••••••"
                  required
                  minLength={8}
                />
              </motion.div>

              <motion.div variants={fieldVariants} className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Address *</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-orange-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition"
                  placeholder="123 Main Street, Barangay 1, Perpetual Village"
                  required
                />
              </motion.div>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full px-6 py-4 rounded-lg bg-linear-to-br from-yellow-700/90 via-red-700/60 to-[#800000]/90 text-white font-bold hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-6"
            >
              {loading ? "Creating Account..." : "Create Account"}
              <ArrowRight size={18} />
            </motion.button>
          </form>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-8 pt-8 border-t border-orange-100 text-center"
          >
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link href={loginLink} className="text-yellow-600 font-bold hover:text-yellow-500">
                Sign in here
              </Link>
            </p>
          </motion.div>
        </div>
      </motion.div>
    </main>
  )
}