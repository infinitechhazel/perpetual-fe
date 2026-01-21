"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

interface BusinessPartner {
  id: number
  business_name: string
  website_link?: string
  category?: string
  description?: string
  photo?: string
  status: "pending" | "approved" | "rejected"
  admin_note?: string
  created_at: string
  updated_at: string
}

interface ViewBusinessModalProps {
  isOpen: boolean
  selectedItem: BusinessPartner | null
  onClose: () => void
}

export default function ViewBusinessModal({ isOpen, selectedItem, onClose }: ViewBusinessModalProps) {
  if (!selectedItem) return null

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Business Partner Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-3 text-sm">
          {selectedItem.photo && (
            <img src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${selectedItem.photo}`} alt={selectedItem.business_name} className="w-full h-48 object-cover rounded" />
          )}

          <div>
            <span className="font-medium">Business Name:</span> {selectedItem.business_name}
          </div>
          <div>
            <span className="font-medium">Website:</span>{" "}
            {selectedItem.website_link ? (
              <a href={selectedItem.website_link} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                {selectedItem.website_link}
              </a>
            ) : (
              "-"
            )}
          </div>
          <div>
            <span className="font-medium">Category:</span> {selectedItem.category || "-"}
          </div>
          <div>
            <span className="font-medium">Description:</span> {selectedItem.description || "-"}
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium">Status:</span>
            <Badge
              variant={
                selectedItem.status === "approved" ? "default" : selectedItem.status === "pending" ? "secondary" : "destructive"
              }
            >
              {selectedItem.status.charAt(0).toUpperCase() + selectedItem.status.slice(1)}
            </Badge>
          </div>
          {selectedItem.admin_note && (
            <div>
              <span className="font-medium">Admin Note:</span> {selectedItem.admin_note}
            </div>
          )}
          <div className="text-xs text-muted-foreground">
            Created on {formatDate(selectedItem.created_at)} | Updated on {formatDate(selectedItem.updated_at)}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
