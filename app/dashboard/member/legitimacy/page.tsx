"use client"

import { useState, useEffect } from "react"
<<<<<<< HEAD
import { Search, Filter, Eye, Edit, Trash2, ChevronRight, ChevronLeft } from "lucide-react"
import AdminLayout from "@/components/adminLayout"
import { useAuth } from "@/hooks/useAuth"
import { useToast } from "@/components/ui/use-toast"
import AdminLegitimacyModal from "@/components/admin/legitimacy/add-edit-form"
import { AdminDeleteLegitimacyModal } from "@/components/admin/legitimacy/delete-form"
import MemberLayout from "@/components/memberLayout"
import MemberLegitimacyModal from "@/components/member/legitimacy/add-modal"
=======
import {
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  ChevronRight,
  ChevronLeft,
} from "lucide-react"
import { useAuth } from "@/hooks/useAuth"
import { useToast } from "@/components/ui/use-toast"
import MemberLayout from "@/components/memberLayout"
import MemberLegitimacyModal from "@/components/member/legitimacy/add-edit-modal"
>>>>>>> 561776b9ce8628155506d64a5d7a830f2d0d8d55
import ViewLegitimacyModal from "@/components/member/legitimacy/view-modal"

interface Signatory {
  id?: number
  name: string
  signed_date?: string
}

interface LegitimacyRequest {
  id: number
  alias: string
  chapter: string
  position: string
  fraternity_number: string
  status: "pending" | "approved" | "rejected"
  admin_note?: string
  certificate_date?: string
  signatories: Signatory[]
  approved_at?: string
  created_at: string
  updated_at: string
}

interface PaginationData {
  current_page: number
  last_page: number
  per_page: number
  total: number
  from: number
  to: number
}

export default function LegitimacyPage() {
  const { user, loading: authLoading } = useAuth(true)
  const { toast } = useToast()
  const [applications, setApplications] = useState<LegitimacyRequest[]>([])
  const [pagination, setPagination] = useState<PaginationData>({
    current_page: 1,
    last_page: 1,
    per_page: 10,
    total: 0,
    from: 0,
    to: 0,
  })
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [loading, setLoading] = useState(true)

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false)
<<<<<<< HEAD
  const [selectedItem, setSelectedItem] = useState<LegitimacyRequest | null>(null)
  const [isViewOpen, setIsViewOpen] = useState(false)
  const [selectedApplication, setSelectedApplication] = useState<LegitimacyRequest | null>(null)
=======
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<LegitimacyRequest | null>(
    null,
  )
  const [isViewOpen, setIsViewOpen] = useState(false)
  const [selectedApplication, setSelectedApplication] =
    useState<LegitimacyRequest | null>(null)
>>>>>>> 561776b9ce8628155506d64a5d7a830f2d0d8d55

  // Fetch applications
  const fetchLegitimacy = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        page: pagination.current_page.toString(),
        per_page: pagination.per_page.toString(),
      })
      if (statusFilter !== "all") params.append("status", statusFilter)
      if (searchQuery) params.append("search", searchQuery)

      const res = await fetch(`/api/legitimacy?${params.toString()}`, {
        credentials: "include",
      })
      const data = await res.json()

      if (res.ok && data.success) {
        setApplications(data.data.data || [])
        setPagination({
          current_page: data.data.current_page,
          last_page: data.data.last_page,
          per_page: data.data.per_page,
          total: data.data.total,
          from: data.data.from,
          to: data.data.to,
        })
      } else {
<<<<<<< HEAD
        toast({ variant: "destructive", title: "Error", description: data.message || "Failed to fetch applications" })
      }
    } catch (err) {
      console.error(err)
      toast({ variant: "destructive", title: "Error", description: "Failed to fetch applications" })
=======
        toast({
          variant: "destructive",
          title: "Error",
          description: data.message || "Failed to fetch applications",
        })
      }
    } catch (err) {
      console.error(err)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch applications",
      })
>>>>>>> 561776b9ce8628155506d64a5d7a830f2d0d8d55
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!authLoading && user) fetchLegitimacy()
  }, [authLoading, user, pagination.current_page, statusFilter])

  // Modal handlers
  const openCreateModal = () => {
    setSelectedApplication(null)
    setIsModalOpen(true)
  }

<<<<<<< HEAD
=======
  const openEditModal = (item: LegitimacyRequest) => {
    setSelectedItem(item)
    setIsEditOpen(true)
  }

>>>>>>> 561776b9ce8628155506d64a5d7a830f2d0d8d55
  const handleView = (item: LegitimacyRequest) => {
    setSelectedItem(item)
    setIsViewOpen(true)
  }

<<<<<<< HEAD
  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
=======
  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
>>>>>>> 561776b9ce8628155506d64a5d7a830f2d0d8d55

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <MemberLayout>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <div>
<<<<<<< HEAD
              <h1 className="text-2xl font-bold text-gray-900">Certificate of Legitimacy Applications</h1>
              <p className="text-sm text-gray-500">Manage all applications</p>
            </div>
            <button onClick={openCreateModal} className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700">
=======
              <h1 className="text-2xl font-bold text-gray-900">
                Certificate of Legitimacy Applications
              </h1>
              <p className="text-sm text-gray-500">Manage all applications</p>
            </div>
            <button
              onClick={openCreateModal}
              className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700"
            >
>>>>>>> 561776b9ce8628155506d64a5d7a830f2d0d8d55
              + New Application
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search by alias, chapter, or position..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && fetchLegitimacy()}
                  className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                <select
                  value={statusFilter}
                  onChange={(e) => {
                    setStatusFilter(e.target.value)
                    setPagination((p) => ({ ...p, current_page: 1 }))
                  }}
                  className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none bg-white"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>
          </div>

          {/* Applications Table */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-x-auto">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
              </div>
            ) : applications.length === 0 ? (
<<<<<<< HEAD
              <div className="text-center py-12 text-gray-500">No applications found.</div>
=======
              <div className="text-center py-12 text-gray-500">
                No applications found.
              </div>
>>>>>>> 561776b9ce8628155506d64a5d7a830f2d0d8d55
            ) : (
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
<<<<<<< HEAD
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Alias</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Chapter</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Position</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Certificate Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
=======
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Alias
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Chapter
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Position
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Certificate Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Actions
                    </th>
>>>>>>> 561776b9ce8628155506d64a5d7a830f2d0d8d55
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {applications.map((app) => (
<<<<<<< HEAD
                    <tr key={app.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm text-gray-900">{app.alias}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{app.chapter}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{app.position}</td>
=======
                    <tr
                      key={app.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {app.alias}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {app.chapter}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {app.position}
                      </td>
>>>>>>> 561776b9ce8628155506d64a5d7a830f2d0d8d55
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            app.status === "approved"
                              ? "bg-green-100 text-green-700"
                              : app.status === "pending"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-red-100 text-red-700"
                          }`}
                        >
<<<<<<< HEAD
                          {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">{app.certificate_date ? formatDate(app.certificate_date) : "-"}</td>
                      <td className="px-6 py-4 text-sm flex gap-2">
                        <button onClick={() => handleView(app)} className="text-orange-600 p-1.5 rounded hover:bg-orange-50">
                          <Eye />
                        </button>
=======
                          {app.status.charAt(0).toUpperCase() +
                            app.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {app.certificate_date
                          ? formatDate(app.certificate_date)
                          : "-"}
                      </td>
                      <td className="px-6 py-4 text-sm flex gap-2">
                        <button
                          onClick={() => handleView(app)}
                          className="text-blue-400 p-1.5 rounded hover:bg-blue-50"
                        >
                          <Eye />
                        </button>
                        <button
                          onClick={() => openEditModal(app)}
                          disabled={app.status !== "pending"}
                          className={`text-orange-600 p-1.5 rounded hover:bg-orange-50 ${
                            app.status !== "pending"
                              ? "opacity-50 cursor-not-allowed hover:bg-transparent"
                              : ""
                          }`}
                        >
                          <Edit />
                        </button>
>>>>>>> 561776b9ce8628155506d64a5d7a830f2d0d8d55
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Pagination */}
          {pagination.total > pagination.per_page && (
            <div className="px-6 py-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-sm text-gray-700">
<<<<<<< HEAD
                Showing {pagination.from} to {pagination.to} of {pagination.total} results
=======
                Showing {pagination.from} to {pagination.to} of{" "}
                {pagination.total} results
>>>>>>> 561776b9ce8628155506d64a5d7a830f2d0d8d55
              </div>

              <div className="flex items-center gap-2">
                <button
<<<<<<< HEAD
                  onClick={() => setPagination((p) => ({ ...p, current_page: Math.max(p.current_page - 1, 1) }))}
=======
                  onClick={() =>
                    setPagination((p) => ({
                      ...p,
                      current_page: Math.max(p.current_page - 1, 1),
                    }))
                  }
>>>>>>> 561776b9ce8628155506d64a5d7a830f2d0d8d55
                  disabled={pagination.current_page === 1}
                  className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-1">
<<<<<<< HEAD
                  {Array.from({ length: Math.min(5, pagination.last_page) }, (_, i) => {
                    let pageNum
                    if (pagination.last_page <= 5) {
                      pageNum = i + 1
                    } else if (pagination.current_page <= 3) {
                      pageNum = i + 1
                    } else if (pagination.current_page >= pagination.last_page - 2) {
                      pageNum = pagination.last_page - 4 + i
                    } else {
                      pageNum = pagination.current_page - 2 + i
                    }

                    return (
                      <button
                        key={pageNum}
                        onClick={() => setPagination((p) => ({ ...p, current_page: pageNum }))}
                        className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                          pagination.current_page === pageNum ? "bg-orange-600 text-white" : "border border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        {pageNum}
                      </button>
                    )
                  })}
=======
                  {Array.from(
                    { length: Math.min(5, pagination.last_page) },
                    (_, i) => {
                      let pageNum
                      if (pagination.last_page <= 5) {
                        pageNum = i + 1
                      } else if (pagination.current_page <= 3) {
                        pageNum = i + 1
                      } else if (
                        pagination.current_page >=
                        pagination.last_page - 2
                      ) {
                        pageNum = pagination.last_page - 4 + i
                      } else {
                        pageNum = pagination.current_page - 2 + i
                      }

                      return (
                        <button
                          key={pageNum}
                          onClick={() =>
                            setPagination((p) => ({
                              ...p,
                              current_page: pageNum,
                            }))
                          }
                          className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                            pagination.current_page === pageNum
                              ? "bg-orange-600 text-white"
                              : "border border-gray-300 hover:bg-gray-50"
                          }`}
                        >
                          {pageNum}
                        </button>
                      )
                    },
                  )}
>>>>>>> 561776b9ce8628155506d64a5d7a830f2d0d8d55
                </div>

                <button
                  onClick={() =>
                    setPagination((p) => ({
                      ...p,
                      current_page: Math.min(p.current_page + 1, p.last_page),
                    }))
                  }
                  disabled={pagination.current_page === pagination.last_page}
                  className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modals */}
<<<<<<< HEAD
        {isModalOpen && <MemberLegitimacyModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmitSuccess={fetchLegitimacy} />}
        <ViewLegitimacyModal
          isOpen={isViewOpen}
          selectedItem={selectedItem}
          onClose={() => {
            setIsViewOpen(false)
            setSelectedItem(null)
          }}
        />
=======
        {isModalOpen && (
          <MemberLegitimacyModal
            mode="add"
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSubmitSuccess={fetchLegitimacy}
          />
        )}

        {isEditOpen && selectedItem && (
          <MemberLegitimacyModal
            isOpen={isEditOpen}
            mode="edit"
            initialData={selectedItem}
            onClose={() => setIsEditOpen(false)}
            onSubmitSuccess={fetchLegitimacy}
          />
        )}

        {isViewOpen && selectedItem && (
          <ViewLegitimacyModal
            isOpen={isViewOpen}
            selectedItem={selectedItem}
            onClose={() => {
              setIsViewOpen(false)
              setSelectedItem(null)
            }}
          />
        )}
>>>>>>> 561776b9ce8628155506d64a5d7a830f2d0d8d55
      </div>
    </MemberLayout>
  )
}
