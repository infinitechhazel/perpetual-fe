import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

const LARAVEL_API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("auth_token")?.value

    const { searchParams } = new URL(request.url)
    const queryString = searchParams.toString()

    const headers: HeadersInit = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "X-Requested-With": "XMLHttpRequest",
    }

    if (token) {
      headers["Authorization"] = `Bearer ${token}`
    }

    const url = `${LARAVEL_API_URL}/announcements${queryString ? `?${queryString}` : ''}`
    console.log('Fetching from Laravel:', url)

    const response = await fetch(url, {
      method: "GET",
      headers,
      cache: "no-store",
    })

    const data = await response.json()
    console.log('Laravel response:', data)

    return NextResponse.json(data, { status: response.status })
  } catch (error) {
    console.error("Error fetching announcements:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch announcements",
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("auth_token")?.value

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "Not authenticated. Please log in again.",
        },
        { status: 401 }
      )
    }

    // Get FormData from request
    const formData = await request.formData()

    console.log('Creating announcement with FormData')

    const response = await fetch(`${LARAVEL_API_URL}/announcements`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`,
        "X-Requested-With": "XMLHttpRequest",
      },
      body: formData,
    })

    const data = await response.json()
    console.log('Laravel create response:', data)

    return NextResponse.json(data, { status: response.status })
  } catch (error) {
    console.error("Error creating announcement:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create announcement",
      },
      { status: 500 }
    )
  }
}