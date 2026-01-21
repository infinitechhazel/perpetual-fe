import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function PUT(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const cookieStore = await cookies()
    const authToken = cookieStore.get("auth_token")

    if (!authToken) {
      return NextResponse.json({ success: false, message: "Authentication required - no auth token found" }, { status: 401 })
    }

    const { id } = await context.params

    const formData = await request.formData()

    console.log("Updating legitimacy request ID", id, "with token:", authToken.value.substring(0, 20) + "...")

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/legitimacy/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${authToken.value}`,
        "X-Requested-With": "XMLHttpRequest",
      },
      credentials: "include",
      body: formData,
    })

    const contentType = response.headers.get("content-type")
    let data

    if (contentType?.includes("application/json")) {
      data = await response.json()
    } else {
      const text = await response.text()
      console.error("Non-JSON response from Laravel:", text)
      return NextResponse.json({ success: false, message: "Invalid response from server" }, { status: 500 })
    }

    console.log("Laravel response:", data)

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          message: data.message || "Failed to update legitimacy request",
          errors: data.errors,
          error: data.error,
        },
        { status: response.status },
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
      { status: 500 },
    )
  }
}

export async function DELETE(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const cookieStore = await cookies()
    const authToken = cookieStore.get("auth_token")

    if (!authToken) {
      return NextResponse.json({ success: false, message: "Authentication required - no auth token found" }, { status: 401 })
    }

    const { id } = await context.params

    console.log("Deleting legitimacy request ID", id, "with token:", authToken.value.substring(0, 20) + "...")

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/legitimacy/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${authToken.value}`,
        "X-Requested-With": "XMLHttpRequest",
      },
      credentials: "include",
    })

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
  } catch (error) {
    console.error("Error deleting legitimacy request:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
