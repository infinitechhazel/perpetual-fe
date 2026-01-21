import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"



// Business Partners - User Access 
export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("auth_token")?.value
    if (!token) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    const url = new URL(req.url)
    const queryParams = url.searchParams.toString()

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/business-partners?${queryParams}`, {
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

export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("auth_token")?.value

    if (!token) {
      return NextResponse.json({ success: false, message: "Authentication required" }, { status: 401 })
    }

    const formData = await req.formData()

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/business-partners`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "X-Requested-With": "XMLHttpRequest",
      },
      body: formData,
      credentials: "include",
    })

    const contentType = res.headers.get("content-type")
    let data

    if (contentType?.includes("application/json")) {
      data = await res.json()
    } else {
      const text = await res.text()
      console.error("Non-JSON response from Laravel:", text)
      return NextResponse.json({ success: false, message: "Invalid response from server" }, { status: 500 })
    }

    if (!res.ok) {
      return NextResponse.json(
        {
          success: false,
          message: data.message || "Failed to create business",
          errors: data.errors,
          error: data.error,
        },
        { status: res.status },
      )
    }

    return NextResponse.json(data, { status: 201 })
  } catch (err) {
    console.error("Error creating business:", err)
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
        error: err instanceof Error ? err.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
