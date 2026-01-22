import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)

    const search = searchParams.get("search") ?? ""
    const page = searchParams.get("page") ?? "1"
    const perPage = searchParams.get("per_page") ?? "10"

    const query = new URLSearchParams({
      page,
      per_page: perPage,
    })

    if (search) query.append("search", search)

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/business-partners?${query.toString()}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      cache: "no-store",
    })

    const data = await res.json()

    if (!res.ok) {
      return NextResponse.json({ success: false, message: "Failed to fetch businesses" }, { status: res.status })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("BusinessPartner public index error:", error)

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 },
    )
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
