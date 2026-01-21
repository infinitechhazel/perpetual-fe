import { type NextRequest, NextResponse } from "next/server"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

export async function GET(request: NextRequest) {
  try {
    // Get query parameters
    const searchParams = request.nextUrl.searchParams
    const perPage = searchParams.get('per_page') || '10'
    const page = searchParams.get('page') || '1'
    
    console.log("[Published News] Fetching published news")
    console.log("[Published News] Per page:", perPage)
    console.log("[Published News] Page:", page)

    // Build query string
    const queryParams = new URLSearchParams({
      per_page: perPage,
      page: page,
    })

    const apiUrl = `${API_URL}/api/news/published?${queryParams.toString()}`
    console.log("[Published News] Calling Laravel API:", apiUrl)

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      cache: 'no-store', // Disable caching for fresh data
    })

    console.log("[Published News] Response status:", response.status)

    const responseText = await response.text()
    console.log("[Published News] Response text (first 500 chars):", responseText.substring(0, 500))

    if (!responseText) {
      console.error("[Published News] Empty response from server")
      return NextResponse.json(
        {
          success: false,
          error: "Empty response from Laravel server",
          data: []
        },
        { status: 500 }
      )
    }

    let data
    try {
      data = JSON.parse(responseText)
    } catch (parseError) {
      console.error("[Published News] Failed to parse JSON:", parseError)
      return NextResponse.json(
        {
          success: false,
          error: "Invalid JSON response from Laravel",
          responseText: responseText.substring(0, 1000),
          data: []
        },
        { status: 500 }
      )
    }

    if (!response.ok) {
      console.error("[Published News] Error response:", data)
      return NextResponse.json(
        {
          success: false,
          error: data.message || "Failed to fetch published news",
          details: data.errors || data,
          data: []
        },
        { status: response.status }
      )
    }

    console.log("[Published News] Success! Returning data")
    return NextResponse.json(data)
  } catch (error) {
    console.error("[Published News] Catch block error:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        data: []
      },
      { status: 500 }
    )
  }
}