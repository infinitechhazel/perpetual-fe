import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

<<<<<<< HEAD
const API_URL = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL || "http://localhost:8000/api"

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
=======
export async function PUT(request: NextRequest, context: { params: Promise<{ id: string }> }) {
>>>>>>> 561776b9ce8628155506d64a5d7a830f2d0d8d55
  try {
    const cookieStore = await cookies()
    const authToken = cookieStore.get("auth_token")

    if (!authToken) {
<<<<<<< HEAD
      return NextResponse.json(
        { success: false, message: "Authentication required" },
        { status: 401 }
      )
    }

    const formData = await request.formData()

    const response = await fetch(`${API_URL}/admin/legitimacy/${params.id}`, {
      method: "POST", // Laravel uses POST with _method for PUT
=======
      return NextResponse.json({ success: false, message: "Authentication required - no auth token found" }, { status: 401 })
    }

    const { id } = await context.params

    const formData = await request.formData()

    console.log("Updating legitimacy request ID", id, "with token:", authToken.value.substring(0, 20) + "...")

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/legitimacy/${id}`, {
      method: "PUT",
>>>>>>> 561776b9ce8628155506d64a5d7a830f2d0d8d55
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${authToken.value}`,
        "X-Requested-With": "XMLHttpRequest",
      },
      credentials: "include",
<<<<<<< HEAD
      body: (() => {
        const newFormData = new FormData()
        // Add _method field for Laravel
        newFormData.append("_method", "PUT")
        
        // Copy all fields from original formData
        for (const [key, value] of formData.entries()) {
          newFormData.append(key, value)
        }
        
        return newFormData
      })(),
=======
      body: formData,
>>>>>>> 561776b9ce8628155506d64a5d7a830f2d0d8d55
    })

    const contentType = response.headers.get("content-type")
    let data

    if (contentType?.includes("application/json")) {
      data = await response.json()
    } else {
      const text = await response.text()
      console.error("Non-JSON response from Laravel:", text)
<<<<<<< HEAD
      return NextResponse.json(
        { success: false, message: "Invalid response from server" },
        { status: 500 }
      )
    }

=======
      return NextResponse.json({ success: false, message: "Invalid response from server" }, { status: 500 })
    }

    console.log("Laravel response:", data)

>>>>>>> 561776b9ce8628155506d64a5d7a830f2d0d8d55
    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          message: data.message || "Failed to update legitimacy request",
          errors: data.errors,
<<<<<<< HEAD
        },
        { status: response.status }
=======
          error: data.error,
        },
        { status: response.status },
>>>>>>> 561776b9ce8628155506d64a5d7a830f2d0d8d55
      )
    }

    return NextResponse.json(data, { status: 200 })
  } catch (error) {
    console.error("Error updating legitimacy request:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
        error: error instanceof Error ? error.message : "Unknown error",
      },
<<<<<<< HEAD
      { status: 500 }
=======
      { status: 500 },
>>>>>>> 561776b9ce8628155506d64a5d7a830f2d0d8d55
    )
  }
}

<<<<<<< HEAD
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
=======
export async function DELETE(request: NextRequest, context: { params: Promise<{ id: string }> }) {
>>>>>>> 561776b9ce8628155506d64a5d7a830f2d0d8d55
  try {
    const cookieStore = await cookies()
    const authToken = cookieStore.get("auth_token")

    if (!authToken) {
<<<<<<< HEAD
      return NextResponse.json(
        { success: false, message: "Authentication required" },
        { status: 401 }
      )
    }

    const response = await fetch(`${API_URL}/admin/legitimacy/${params.id}`, {
=======
      return NextResponse.json({ success: false, message: "Authentication required - no auth token found" }, { status: 401 })
    }

    const { id } = await context.params

    console.log("Deleting legitimacy request ID", id, "with token:", authToken.value.substring(0, 20) + "...")

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/legitimacy/${id}`, {
>>>>>>> 561776b9ce8628155506d64a5d7a830f2d0d8d55
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${authToken.value}`,
        "X-Requested-With": "XMLHttpRequest",
      },
      credentials: "include",
    })

<<<<<<< HEAD
    const contentType = response.headers.get("content-type")
    let data

    if (contentType?.includes("application/json")) {
      data = await response.json()
    } else {
      const text = await response.text()
      console.error("Non-JSON response from Laravel:", text)
      return NextResponse.json(
        { success: false, message: "Invalid response from server" },
        { status: 500 }
      )
    }

    return NextResponse.json(data, { status: response.status })
=======
    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          message: data.message || "Failed to delete legitimacy request",
          errors: data.errors,
          error: data.error,
        },
        { status: response.status },
      )
    }

    return NextResponse.json(data, { status: 200 })
>>>>>>> 561776b9ce8628155506d64a5d7a830f2d0d8d55
  } catch (error) {
    console.error("Error deleting legitimacy request:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
        error: error instanceof Error ? error.message : "Unknown error",
      },
<<<<<<< HEAD
      { status: 500 }
    )
  }
}
=======
      { status: 500 },
    )
  }
}
>>>>>>> 561776b9ce8628155506d64a5d7a830f2d0d8d55
