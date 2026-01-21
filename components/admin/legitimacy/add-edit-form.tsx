"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { toast } from "@/components/ui/use-toast"
import { Plus, Trash2, X } from "lucide-react"

interface Signatory {
  id?: number
  name: string
  role?: "approved" | "noted" | "reviewed" | "verified" | "witnessed"
  signed_date?: string
  signature_file?: File | null
  signature_url?: string
}

interface Legitimacy {
  id?: number
  alias: string
  chapter: string
  position: string
  fraternity_number: string
  status: "pending" | "approved" | "rejected"
  admin_note?: string | null
  certificate_date?: string
  signatories: Signatory[]
}

interface Props {
  isOpen: boolean
  mode: "create" | "edit"
  initialData?: Legitimacy
  onClose: () => void
  onSubmitSuccess: () => void
}

export default function AdminLegitimacyModal({ isOpen, mode, initialData, onClose, onSubmitSuccess }: Props) {
  const [form, setForm] = useState<Legitimacy>({
    alias: "",
    chapter: "",
    position: "",
    fraternity_number: "",
    status: "pending",
    admin_note: "",
    certificate_date: "",
    signatories: [],
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (mode === "edit" && initialData) {
      setForm({
        alias: initialData.alias,
        chapter: initialData.chapter,
        position: initialData.position,
        fraternity_number: initialData.fraternity_number,
        status: initialData.status,
        admin_note: initialData.admin_note || "",
        certificate_date: initialData.certificate_date || "",
        signatories:
          initialData.signatories?.map((sig) => ({
            id: sig.id,
            name: sig.name,
            role: sig.role || undefined,
            signed_date: sig.signed_date || "",
            signature_file: null,
            signature_url: sig.signature_url ? `${process.env.NEXT_PUBLIC_IMAGE_URL}${sig.signature_url}` : null,
          })) || [],
      })
    } else {
      setForm({
        alias: "",
        chapter: "",
        position: "",
        fraternity_number: "",
        status: "pending",
        admin_note: "",
        certificate_date: "",
        signatories: [],
      })
    }
  }, [mode, initialData])

  const handleSignatoryChange = (index: number, key: keyof Signatory, value: string | File) => {
    const updated = [...form.signatories]
    updated[index] = { ...updated[index], [key]: value }
    setForm({ ...form, signatories: updated })
  }

  const addSignatory = () => {
    setForm({
      ...form,
      signatories: [...form.signatories, { name: "", signed_date: "", signature_file: null }],
    })
  }

  const removeSignatory = (index: number) => {
    const updated = form.signatories.filter((_, i) => i !== index)
    setForm({ ...form, signatories: updated })
  }

  const handleSubmit = async () => {
    if (!form.alias || !form.chapter || !form.position || !form.fraternity_number || !form.certificate_date) {
      toast({ title: "Error", description: "Please fill all required fields.", variant: "destructive" })
      return
    }

    setIsSubmitting(true)
    try {
      const url = mode === "create" ? "/api/admin/legitimacy" : `/api/admin/legitimacy/${initialData?.id}`
      const method = mode === "create" ? "POST" : "PUT"

      const payload = new FormData()
      payload.append("alias", form.alias)
      payload.append("chapter", form.chapter)
      payload.append("position", form.position)
      payload.append("fraternity_number", form.fraternity_number)
      payload.append("status", form.status)
      payload.append("certificate_date", form.certificate_date)
      payload.append("admin_note", form.admin_note || "")

      form.signatories.forEach((sig, i) => {
        payload.append(`signatories[${i}][name]`, sig.name)
        if (sig.role) payload.append(`signatories[${i}][role]`, sig.role)
        if (sig.signed_date) payload.append(`signatories[${i}][signed_date]`, sig.signed_date)
        if (sig.signature_file instanceof File) {
          payload.append(`signatories[${i}][signature_file]`, sig.signature_file)
        }
      })

      const res = await fetch(url, {
        method,
        body: payload,
        credentials: "include",
      })

      const data = await res.json()
      if (res.ok && data.success) {
        toast({
          title: "Success",
          description: `Legitimacy ${mode === "create" ? "created" : "updated"} successfully.`,
        })
        onSubmitSuccess()
        onClose()
      } else {
        toast({ title: "Error", description: data.message || "Failed to save.", variant: "destructive" })
      }
    } catch (error) {
      console.error(error)
      toast({ title: "Error", description: "Server error", variant: "destructive" })
    } finally {
      setIsSubmitting(false)
    }
  }
  console.log(initialData)
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-2xl w-full">
        <DialogHeader>
          <DialogTitle>{mode === "create" ? "Create Legitimacy Request" : "Edit Legitimacy Request"}</DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh] space-y-4">
          {/* Main Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label>Alias</Label>
              <Input value={form.alias} onChange={(e) => setForm({ ...form, alias: e.target.value })} />
            </div>
            <div>
              <Label>Chapter</Label>
              <Input value={form.chapter} onChange={(e) => setForm({ ...form, chapter: e.target.value })} />
            </div>
            <div>
              <Label>Position</Label>
              <Input value={form.position} onChange={(e) => setForm({ ...form, position: e.target.value })} />
            </div>
            <div>
              <Label>Fraternity Number</Label>
              <Input value={form.fraternity_number} onChange={(e) => setForm({ ...form, fraternity_number: e.target.value })} />
            </div>
            <div>
              <Label>Status</Label>
              <select
                className="border rounded px-3 py-2 w-full mb-2"
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value as Legitimacy["status"] })}
              >
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            <div>
              <Label>Certificate Date</Label>
              <Input type="date" value={form.certificate_date || ""} onChange={(e) => setForm({ ...form, certificate_date: e.target.value })} />
            </div>
          </div>

          <div>
            <Label>Admin Note</Label>
            <Textarea value={form.admin_note || ""} onChange={(e) => setForm({ ...form, admin_note: e.target.value })} className="mb-2" />
          </div>

          {/* Signatories */}
          <div>
            <Label>Signatories</Label>
            {form.signatories.map((sig, idx) => (
              <div key={sig.id ?? idx} className="flex flex-col gap-4 mb-6 p-4 border rounded-md bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <Label htmlFor={`signatory-name-${idx}`}>Name</Label>
                    <Input
                      id={`signatory-name-${idx}`}
                      placeholder="Name"
                      value={sig.name}
                      onChange={(e) => handleSignatoryChange(idx, "name", e.target.value)}
                    />
                  </div>
                  <Button variant="ghost" className="text-red-500 p-2 ml-2" onClick={() => removeSignatory(idx)} aria-label="Remove signatory">
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                {/* Role */}
                <div>
                  <Label htmlFor={`signatory-role-${idx}`}>Role</Label>
                  <Input
                    id={`signatory-role-${idx}`}
                    placeholder="Role"
                    value={sig.role || ""}
                    onChange={(e) => handleSignatoryChange(idx, "role", e.target.value)}
                  />
                </div>

                {/* Date */}
                <div>
                  <Label htmlFor={`signatory-date-${idx}`}>Signed Date</Label>
                  <Input
                    id={`signatory-date-${idx}`}
                    type="date"
                    value={sig.signed_date || ""}
                    onChange={(e) => handleSignatoryChange(idx, "signed_date", e.target.value)}
                  />
                </div>

                {/* File Upload */}
                <div>
                  <Label htmlFor={`signatory-file-${idx}`}>Signature File</Label>
                  <Input
                    id={`signatory-file-${idx}`}
                    type="file"
                    accept="image/*"
                    onChange={(e) => e.target.files?.[0] && handleSignatoryChange(idx, "signature_file", e.target.files[0])}
                  />
                </div>

                {/* Preview */}
                {sig.signature_url && (
                  <div className="flex items-center gap-3">
                    <img
                      src={sig.signature_url}
                      alt={`Signature of ${sig.name || "signatory"}`}
                      className="w-40 h-24 object-contain border rounded-md bg-white"
                    />
                  </div>
                )}
              </div>
            ))}

            <Button variant="outline" onClick={addSignatory} className="mt-2 flex items-center gap-2">
              <Plus className="w-4 h-4" /> Add Signatory
            </Button>
          </div>
        </ScrollArea>

        <DialogFooter className="mt-4 flex justify-end gap-2">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
