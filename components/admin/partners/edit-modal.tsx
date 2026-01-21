"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Select } from "@/components/ui/select"

interface BusinessPartner {
  id?: number | null
  business_name: string
  website_link?: string
  category?: string
  description?: string
  photo?: string | File | null
  status?: "pending" | "approved" | "rejected"
  admin_note?: string
}

interface AdminBusinessModalProps {
  isOpen: boolean
  mode: "create" | "edit"
  initialData?: BusinessPartner
  onClose: () => void
  onSubmitSuccess: () => void
}

export default function AdminBusinessModal({ isOpen, mode, initialData, onClose, onSubmitSuccess }: AdminBusinessModalProps) {
  const { toast } = useToast()
  const [formData, setFormData] = useState<BusinessPartner>(
    initialData || { business_name: "", website_link: "", category: "", description: "", status: "pending", admin_note: "" },
  )
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (mode === "edit" && initialData) {
      setFormData({
        id: initialData.id,
        business_name: initialData.business_name || "",
        website_link: initialData.website_link || "",
        description: initialData.description || "",
        category: initialData.category || "",
        status: initialData.status || "pending",
        admin_note: initialData.admin_note || "",
        photo: initialData.photo ? `${process.env.NEXT_PUBLIC_IMAGE_URL}${initialData.photo}` : null,
      })
    } else {
      // Reset for create mode
      setFormData({
        id: null,
        business_name: "",
        website_link: "",
        description: "",
        category: "",
        status: "pending",
        admin_note: "",
        photo: null,
      })
    }
  }, [mode, initialData])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) setFile(e.target.files[0])
  }

  const handleSubmit = async () => {
    try {
      setLoading(true)
      const payload = new FormData()

      // Append all fields except photo
      Object.entries(formData).forEach(([key, value]) => {
        if (key !== "photo" && value !== undefined && value !== null) {
          payload.append(key, value as string)
        }
      })

      // Append new photo only if user selected a file
      if (file) {
        payload.append("photo", file)
      }

      const url = mode === "create" ? `/api/admin/business-partners` : `/api/admin/business-partners/${formData.id}`
      const method = mode === "create" ? "POST" : "PUT"

      const res = await fetch(url, { method, body: payload, credentials: "include" })
      const data = await res.json()

      if (res.ok && data.success) {
        toast({ title: "Success", description: data.message })
        onSubmitSuccess()
        onClose()
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: data.message || "Failed",
        })
      }
    } catch (err) {
      console.error(err)
      toast({ variant: "destructive", title: "Error", description: "Server error" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{mode === "create" ? "Add New Business Partner" : "Edit Business Partner"}</DialogTitle>
        </DialogHeader>

        <div className="space-y-3 mt-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">Business Name</label>
            <Input name="business_name" value={formData.business_name} onChange={handleChange} />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Website Link</label>
            <Input name="website_link" value={formData.website_link || ""} onChange={handleChange} />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <Input name="category" value={formData.category || ""} onChange={handleChange} />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description || ""}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Admin Note</label>
            <textarea
              name="admin_note"
              value={formData.admin_note || ""}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select
              name="status"
              value={formData.status || "pending"}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2"
            >
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Photo</label>
            <Input type="file" onChange={handleFileChange} />
            {formData.photo && !file && <img src={`${formData.photo}`} alt="Current" className="w-24 h-24 object-cover mt-2 rounded" />}
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={loading}>
              {mode === "create" ? "Add" : "Update"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
