import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("auth_token")?.value
    if (!token) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    const url = new URL(req.url)
    const queryParams = url.searchParams.toString()

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/legitimacy?${queryParams}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })

    const data = await res.json()
    console.log("Laravel response:", data)

    return NextResponse.json(data, { status: res.status })
  } catch (err) {
    console.error("Server error:", err)
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const authToken = cookieStore.get("auth_token")

    if (!authToken) {
      return NextResponse.json({ success: false, message: "Authentication required - no auth token found" }, { status: 401 })
    }

    const formData = await request.formData()

    console.log("Creating legitimacy request with token:", authToken.value.substring(0, 20) + "...")

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/legitimacy`, {
      method: "POST",
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
          message: data.message || "Failed to create legitimacy request",
          errors: data.errors,
          error: data.error,
        },
        { status: response.status },
      )
    }

    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    console.error("Error creating legitimacy request:", error)
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
