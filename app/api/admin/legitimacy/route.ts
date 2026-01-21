import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

<<<<<<< HEAD
const API_URL = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL || "http://localhost:8000/api"

export async function GET(req: NextRequest) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("auth_token")?.value
    
=======
export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("auth_token")?.value
>>>>>>> 561776b9ce8628155506d64a5d7a830f2d0d8d55
    if (!token) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    const url = new URL(req.url)
    const queryParams = url.searchParams.toString()

<<<<<<< HEAD
    const res = await fetch(`${API_URL}/admin/legitimacy?${queryParams}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "X-Requested-With": "XMLHttpRequest",
      },
      credentials: "include",
    })

    const contentType = res.headers.get("content-type")
    
    if (!contentType?.includes("application/json")) {
      const text = await res.text()
      console.error("Non-JSON response:", text)
      return NextResponse.json({ success: false, message: "Invalid response from server" }, { status: 500 })
    }

    const data = await res.json()
    return NextResponse.json(data, { status: res.status })
  } catch (err) {
    console.error("Admin legitimacy GET error:", err)
    return NextResponse.json(
      { 
        success: false, 
        message: "Server error",
        error: err instanceof Error ? err.message : "Unknown error"
      }, 
      { status: 500 }
    )
=======
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
>>>>>>> 561776b9ce8628155506d64a5d7a830f2d0d8d55
  }
}

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const authToken = cookieStore.get("auth_token")

    if (!authToken) {
<<<<<<< HEAD
      return NextResponse.json(
        { success: false, message: "Authentication required" }, 
        { status: 401 }
      )
=======
      return NextResponse.json({ success: false, message: "Authentication required - no auth token found" }, { status: 401 })
>>>>>>> 561776b9ce8628155506d64a5d7a830f2d0d8d55
    }

    const formData = await request.formData()

<<<<<<< HEAD
    const response = await fetch(`${API_URL}/admin/legitimacy`, {
=======
    console.log("Creating legitimacy request with token:", authToken.value.substring(0, 20) + "...")

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/legitimacy`, {
>>>>>>> 561776b9ce8628155506d64a5d7a830f2d0d8d55
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
          message: data.message || "Failed to create legitimacy request",
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

    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    console.error("Error creating legitimacy request:", error)
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
