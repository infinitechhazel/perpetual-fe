"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { toast } from "@/components/ui/use-toast"
<<<<<<< HEAD
import { Plus, X } from "lucide-react"

interface User {
  id: number
  name: string
  email: string
  fraternity_number: string
}
=======
import { Plus, Trash2, X } from "lucide-react"
>>>>>>> 561776b9ce8628155506d64a5d7a830f2d0d8d55

interface Signatory {
  id?: number
  name: string
<<<<<<< HEAD
  role?: string
=======
  role?: "approved" | "noted" | "reviewed" | "verified" | "witnessed"
>>>>>>> 561776b9ce8628155506d64a5d7a830f2d0d8d55
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
<<<<<<< HEAD
  const [users, setUsers] = useState<User[]>([])
  const [loadingUsers, setLoadingUsers] = useState(false)
  const [deletedSignatoryIds, setDeletedSignatoryIds] = useState<number[]>([])

  // Fetch users with fraternity numbers
  useEffect(() => {
    const fetchUsers = async () => {
      setLoadingUsers(true)
      try {
        const res = await fetch("/api/admin/users", {
          credentials: "include",
        })
        const data = await res.json()
        if (res.ok && data.success) {
          setUsers(data.data.data || data.data || [])
        }
      } catch (error) {
        console.error("Failed to fetch users:", error)
      } finally {
        setLoadingUsers(false)
      }
    }

    if (isOpen && mode === "create") {
      fetchUsers()
    }
  }, [isOpen, mode])

  useEffect(() => {
    if (mode === "edit" && initialData) {
      const imageBaseUrl = process.env.NEXT_PUBLIC_IMAGE_URL || ""
      
=======

  useEffect(() => {
    if (mode === "edit" && initialData) {
>>>>>>> 561776b9ce8628155506d64a5d7a830f2d0d8d55
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
<<<<<<< HEAD
            role: sig.role || "",
            signed_date: sig.signed_date || "",
            signature_file: null,
            signature_url: sig.signature_url ? `${imageBaseUrl}${sig.signature_url}` : undefined,
          })) || [],
      })
      setDeletedSignatoryIds([])
=======
            role: sig.role || undefined,
            signed_date: sig.signed_date || "",
            signature_file: null,
            signature_url: sig.signature_url ? `${process.env.NEXT_PUBLIC_IMAGE_URL}${sig.signature_url}` : null,
          })) || [],
      })
>>>>>>> 561776b9ce8628155506d64a5d7a830f2d0d8d55
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
<<<<<<< HEAD
      setDeletedSignatoryIds([])
    }
  }, [mode, initialData, isOpen])
=======
    }
  }, [mode, initialData])
>>>>>>> 561776b9ce8628155506d64a5d7a830f2d0d8d55

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
<<<<<<< HEAD
    const signatory = form.signatories[index]
    
    // If the signatory has an ID, track it for deletion
    if (signatory.id) {
      setDeletedSignatoryIds([...deletedSignatoryIds, signatory.id])
    }
    
=======
>>>>>>> 561776b9ce8628155506d64a5d7a830f2d0d8d55
    const updated = form.signatories.filter((_, i) => i !== index)
    setForm({ ...form, signatories: updated })
  }

  const handleSubmit = async () => {
<<<<<<< HEAD
    // Validation
=======
>>>>>>> 561776b9ce8628155506d64a5d7a830f2d0d8d55
    if (!form.alias || !form.chapter || !form.position || !form.fraternity_number || !form.certificate_date) {
      toast({ title: "Error", description: "Please fill all required fields.", variant: "destructive" })
      return
    }

<<<<<<< HEAD
    // Validate fraternity number exists in users list (for create mode)
    if (mode === "create") {
      const userExists = users.find(u => u.fraternity_number === form.fraternity_number)
      if (!userExists) {
        toast({ 
          title: "Error", 
          description: "Invalid fraternity number. Please select a valid user.", 
          variant: "destructive" 
        })
        return
      }
    }

=======
>>>>>>> 561776b9ce8628155506d64a5d7a830f2d0d8d55
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

<<<<<<< HEAD
      // Add deleted signatory IDs for update mode
      if (mode === "edit" && deletedSignatoryIds.length > 0) {
        deletedSignatoryIds.forEach((id, index) => {
          payload.append(`deleted_signatories[${index}]`, id.toString())
        })
      }

      // Add signatories
      // Add signatories with proper handling
      form.signatories.forEach((sig, i) => {
        if (sig.name.trim()) { // Only add if name is not empty
          payload.append(`signatories[${i}][name]`, sig.name)
          if (sig.id) payload.append(`signatories[${i}][id]`, sig.id.toString())
          if (sig.role) payload.append(`signatories[${i}][role]`, sig.role)
          if (sig.signed_date) payload.append(`signatories[${i}][signed_date]`, sig.signed_date)
          if (sig.signature_file instanceof File) {
            payload.append(`signatories[${i}][signature_file]`, sig.signature_file)
          }
=======
      form.signatories.forEach((sig, i) => {
        payload.append(`signatories[${i}][name]`, sig.name)
        if (sig.role) payload.append(`signatories[${i}][role]`, sig.role)
        if (sig.signed_date) payload.append(`signatories[${i}][signed_date]`, sig.signed_date)
        if (sig.signature_file instanceof File) {
          payload.append(`signatories[${i}][signature_file]`, sig.signature_file)
>>>>>>> 561776b9ce8628155506d64a5d7a830f2d0d8d55
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
<<<<<<< HEAD
        toast({ 
          title: "Error", 
          description: data.message || data.errors?.fraternity_number?.[0] || "Failed to save.", 
          variant: "destructive" 
        })
=======
        toast({ title: "Error", description: data.message || "Failed to save.", variant: "destructive" })
>>>>>>> 561776b9ce8628155506d64a5d7a830f2d0d8d55
      }
    } catch (error) {
      console.error(error)
      toast({ title: "Error", description: "Server error", variant: "destructive" })
    } finally {
      setIsSubmitting(false)
    }
  }
<<<<<<< HEAD

=======
  console.log(initialData)
>>>>>>> 561776b9ce8628155506d64a5d7a830f2d0d8d55
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-2xl w-full">
        <DialogHeader>
          <DialogTitle>{mode === "create" ? "Create Legitimacy Request" : "Edit Legitimacy Request"}</DialogTitle>
        </DialogHeader>

<<<<<<< HEAD
        <ScrollArea className="max-h-[60vh] pr-4">
          <div className="space-y-4">
            {/* Main Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fraternity-number">Fraternity Number *</Label>
                {mode === "create" ? (
                  <select
                    id="fraternity-number"
                    className="border rounded px-3 py-2 w-full"
                    value={form.fraternity_number}
                    onChange={(e) => {
                      const selectedUser = users.find(u => u.fraternity_number === e.target.value)
                      setForm({ 
                        ...form, 
                        fraternity_number: e.target.value,
                        alias: selectedUser?.name || form.alias
                      })
                    }}
                    disabled={loadingUsers}
                  >
                    <option value="">Select User</option>
                    {users.map((user) => (
                      <option key={user.id} value={user.fraternity_number}>
                        {user.fraternity_number} - {user.name}
                      </option>
                    ))}
                  </select>
                ) : (
                  <Input 
                    id="fraternity-number"
                    value={form.fraternity_number} 
                    disabled 
                    className="bg-gray-100"
                  />
                )}
              </div>
              
              <div>
                <Label htmlFor="alias">Alias *</Label>
                <Input 
                  id="alias"
                  value={form.alias} 
                  onChange={(e) => setForm({ ...form, alias: e.target.value })} 
                />
              </div>
              
              <div>
                <Label htmlFor="chapter">Chapter *</Label>
                <Input 
                  id="chapter"
                  value={form.chapter} 
                  onChange={(e) => setForm({ ...form, chapter: e.target.value })} 
                />
              </div>
              
              <div>
                <Label htmlFor="position">Position *</Label>
                <Input 
                  id="position"
                  value={form.position} 
                  onChange={(e) => setForm({ ...form, position: e.target.value })} 
                />
              </div>
              
              <div>
                <Label htmlFor="status">Status</Label>
                <select
                  id="status"
                  className="border rounded px-3 py-2 w-full"
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value as Legitimacy["status"] })}
                >
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
              
              <div>
                <Label htmlFor="certificate-date">Certificate Date *</Label>
                <Input 
                  id="certificate-date"
                  type="date" 
                  value={form.certificate_date || ""} 
                  onChange={(e) => setForm({ ...form, certificate_date: e.target.value })} 
                />
              </div>
            </div>

            <div>
              <Label htmlFor="admin-note">Admin Note</Label>
              <Textarea 
                id="admin-note"
                value={form.admin_note || ""} 
                onChange={(e) => setForm({ ...form, admin_note: e.target.value })} 
                className="resize-none"
                rows={3}
              />
            </div>

            {/* Signatories */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label>Signatories</Label>
                <span className="text-xs text-gray-500">
                  {form.signatories.length} signator{form.signatories.length !== 1 ? 'ies' : 'y'}
                </span>
              </div>
              
              {form.signatories.map((sig, idx) => (
                <div key={sig.id ?? `new-${idx}`} className="flex flex-col gap-3 mb-4 p-4 border rounded-md bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <Label htmlFor={`signatory-name-${idx}`}>Name *</Label>
                      <Input
                        id={`signatory-name-${idx}`}
                        placeholder="Full name"
                        value={sig.name}
                        onChange={(e) => handleSignatoryChange(idx, "name", e.target.value)}
                      />
                    </div>
                    <Button 
                      type="button"
                      variant="ghost" 
                      className="text-red-500 p-2 ml-2 hover:bg-red-50" 
                      onClick={() => removeSignatory(idx)} 
                      aria-label="Remove signatory"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>

                  <div>
                    <Label htmlFor={`signatory-role-${idx}`}>Role</Label>
                    <Input
                      id={`signatory-role-${idx}`}
                      placeholder="e.g., Approved, Noted, Reviewed"
                      value={sig.role || ""}
                      onChange={(e) => handleSignatoryChange(idx, "role", e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor={`signatory-date-${idx}`}>Signed Date</Label>
                    <Input
                      id={`signatory-date-${idx}`}
                      type="date"
                      value={sig.signed_date || ""}
                      onChange={(e) => handleSignatoryChange(idx, "signed_date", e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor={`signatory-file-${idx}`}>Signature Image</Label>
                    <Input
                      id={`signatory-file-${idx}`}
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                          handleSignatoryChange(idx, "signature_file", file)
                        }
                      }}
                    />
                    {sig.signature_file && (
                      <p className="text-xs text-green-600 mt-1">✓ New file selected: {sig.signature_file.name}</p>
                    )}
                  </div>

                  {sig.signature_url && !sig.signature_file && (
                    <div>
                      <Label>Current Signature</Label>
                      <div className="mt-1 p-2 border rounded-md bg-white">
                        <img
                          src={sig.signature_url}
                          alt={`Signature of ${sig.name || "signatory"}`}
                          className="w-40 h-24 object-contain"
                          onError={(e) => {
                            console.error("Image failed to load:", sig.signature_url)
                            e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='96'%3E%3Crect width='160' height='96' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%239ca3af' font-family='sans-serif' font-size='12'%3EImage not found%3C/text%3E%3C/svg%3E"
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}

              <Button 
                type="button"
                variant="outline" 
                onClick={addSignatory} 
                className="mt-2 flex items-center gap-2 w-full"
              >
                <Plus className="w-4 h-4" /> Add Signatory
              </Button>
            </div>
=======
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
>>>>>>> 561776b9ce8628155506d64a5d7a830f2d0d8d55
          </div>
        </ScrollArea>

        <DialogFooter className="mt-4 flex justify-end gap-2">
<<<<<<< HEAD
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="button" onClick={handleSubmit} disabled={isSubmitting}>
=======
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
>>>>>>> 561776b9ce8628155506d64a5d7a830f2d0d8d55
            {isSubmitting ? "Saving..." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
<<<<<<< HEAD
}
=======
}
>>>>>>> 561776b9ce8628155506d64a5d7a830f2d0d8d55
