"use client"

<<<<<<< HEAD
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
=======
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
>>>>>>> 561776b9ce8628155506d64a5d7a830f2d0d8d55
import { Badge } from "@/components/ui/badge"

interface MemberLegitimacy {
  id: number
  alias: string
  chapter: string
  position: string
  fraternity_number: string
  status: "pending" | "approved" | "rejected"
  created_at: string
  admin_note?: string
}

interface ViewLegitimacyModalProps {
  isOpen: boolean
  selectedItem: MemberLegitimacy | null
  onClose: () => void
}

<<<<<<< HEAD
export default function ViewLegitimacyModal({ isOpen, selectedItem, onClose }: ViewLegitimacyModalProps) {
=======
export default function ViewLegitimacyModal({
  isOpen,
  selectedItem,
  onClose,
}: ViewLegitimacyModalProps) {
>>>>>>> 561776b9ce8628155506d64a5d7a830f2d0d8d55
  if (!selectedItem) return null

  const statusConfig = {
    pending: {
      label: "Pending Review",
<<<<<<< HEAD
      description: "These are the details you submitted. Your request is currently under review.",
=======
      description:
        "These are the details you submitted. Your request is currently under review.",
>>>>>>> 561776b9ce8628155506d64a5d7a830f2d0d8d55
      badge: "secondary",
    },
    approved: {
      label: "Approved",
      description: "Your legitimacy request has been approved.",
      badge: "default",
    },
    rejected: {
      label: "Rejected",
      description: "Your legitimacy request was rejected.",
      badge: "destructive",
    },
  } as const

  const status = statusConfig[selectedItem.status]

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Legitimacy Request</DialogTitle>
        </DialogHeader>

        {/* Status message */}
        <div className="rounded-md border p-3 text-sm bg-muted/40">
          <div className="flex items-center gap-2 mb-1">
            <Badge variant={status.badge}>{status.label}</Badge>
          </div>
          <p className="text-muted-foreground">{status.description}</p>
        </div>

        {/* Details */}
        <div className="space-y-3 text-sm">
          {selectedItem.status === "rejected" && selectedItem.admin_note && (
            <div>
<<<<<<< HEAD
              <span className="font-medium">Note:</span> {selectedItem?.admin_note || ""}
=======
              <span className="font-medium">Note:</span>{" "}
              {selectedItem?.admin_note || ""}
>>>>>>> 561776b9ce8628155506d64a5d7a830f2d0d8d55
            </div>
          )}

          <div>
            <span className="font-medium">Alias:</span> {selectedItem.alias}
          </div>

          <div>
            <span className="font-medium">Chapter:</span> {selectedItem.chapter}
          </div>

          <div>
<<<<<<< HEAD
            <span className="font-medium">Position:</span> {selectedItem.position}
          </div>

          <div>
            <span className="font-medium">Fraternity #:</span> {selectedItem.fraternity_number}
          </div>

          <div className="text-xs text-muted-foreground pt-2">Submitted on {new Date(selectedItem.created_at).toLocaleDateString()}</div>
=======
            <span className="font-medium">Position:</span>{" "}
            {selectedItem.position}
          </div>

          <div>
            <span className="font-medium">Fraternity #:</span>{" "}
            {selectedItem.fraternity_number}
          </div>

          <div className="text-xs text-muted-foreground pt-2">
            Submitted on{" "}
            {new Date(selectedItem.created_at).toLocaleDateString()}
          </div>
>>>>>>> 561776b9ce8628155506d64a5d7a830f2d0d8d55
        </div>
      </DialogContent>
    </Dialog>
  )
}
