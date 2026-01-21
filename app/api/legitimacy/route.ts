<<<<<<< HEAD
// app/api/legitimacy/route.ts
import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

const API_URL = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL || "http://localhost:8000/api"

=======
import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

>>>>>>> 561776b9ce8628155506d64a5d7a830f2d0d8d55
export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const authToken = cookieStore.get("auth_token")?.value

    if (!authToken) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

<<<<<<< HEAD
    const { searchParams } = new URL(request.url)
    const queryString = searchParams.toString()

    const response = await fetch(`${API_URL}/legitimacy?${queryString}`, {
=======
    // Forward query params (page, per_page, status)
    const { searchParams } = new URL(request.url)
    const queryString = searchParams.toString()

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/legitimacy?${queryString}`, {
>>>>>>> 561776b9ce8628155506d64a5d7a830f2d0d8d55
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${authToken}`,
        "X-Requested-With": "XMLHttpRequest",
      },
      credentials: "include",
    })

    const contentType = response.headers.get("content-type")

    if (!contentType?.includes("application/json")) {
      const text = await response.text()
      console.error("Non-JSON response:", text)
<<<<<<< HEAD
=======

>>>>>>> 561776b9ce8628155506d64a5d7a830f2d0d8d55
      return NextResponse.json({ success: false, message: "Invalid response from server" }, { status: 500 })
    }

    const data = await response.json()
<<<<<<< HEAD
    return NextResponse.json(data, { status: response.status })
  } catch (error) {
    console.error("Legitimacy index error:", error)
=======

    return NextResponse.json(data, { status: response.status })
  } catch (error) {
    console.error("Legitimacy index error:", error)

>>>>>>> 561776b9ce8628155506d64a5d7a830f2d0d8d55
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

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const authToken = cookieStore.get("auth_token")

    if (!authToken) {
      return NextResponse.json({ success: false, message: "Authentication required" }, { status: 401 })
    }

    const body = await request.json()

<<<<<<< HEAD
    const response = await fetch(`${API_URL}/legitimacy`, {
=======
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/legitimacy`, {
>>>>>>> 561776b9ce8628155506d64a5d7a830f2d0d8d55
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken.value}`,
        "X-Requested-With": "XMLHttpRequest",
      },
      credentials: "include",
      body: JSON.stringify({
        alias: body.alias,
        chapter: body.chapter,
        position: body.position,
        fraternity_number: body.fraternity_number,
      }),
    })

    const contentType = response.headers.get("content-type")
    let data

    if (contentType && contentType.includes("application/json")) {
      data = await response.json()
    } else {
      const text = await response.text()
      console.error("Non-JSON response from Laravel:", text)
      return NextResponse.json({ success: false, message: "Invalid response from server" }, { status: 500 })
    }

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          message: data.message || "Failed to submit legitimacy request",
          errors: data.errors,
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
<<<<<<< HEAD
}
=======
}
>>>>>>> 561776b9ce8628155506d64a5d7a830f2d0d8d55
