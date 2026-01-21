import { type NextRequest, NextResponse } from "next/server"
import { cookies } from 'next/headers'

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"

// Helper function to log detailed error information
function logError(method: string, error: any, url: string) {
  console.error(`[Mission&Vision API] ${method} - Error:`, {
    message: error.message,
    url,
    stack: error.stack,
    cause: error.cause
  })
}
async function getAuthToken() {
  const cookieStore = await cookies()
  return cookieStore.get("auth_token")?.value
}

export async function GET(request: NextRequest) {
  const token = getAuthToken()

  if (!token) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    )
  }

  const url = `${API_URL}/mission-and-vision`
  try {
    console.log("[Mission&Vision API] GET - Fetching from:", url)

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "X-Requested-With": "XMLHttpRequest",
      },
      cache: "no-store",
    })

    const responseText = await response.text()
    console.log("[Mission&Vision API] GET - Response status:", response.status)

    if (!response.ok) {
      try {
        const errorData = JSON.parse(responseText)
        return NextResponse.json(
          {
            success: false,
            error: errorData.message || "Failed to fetch mission and vision data",
            details: errorData.errors || errorData,
          },
          { status: response.status },
        )
      } catch {
        return NextResponse.json(
          {
            success: false,
            error: "Failed to fetch mission and vision data from server",
            rawResponse: responseText.substring(0, 200)
          },
          { status: response.status }
        )
      }
    }

    const data = JSON.parse(responseText)
    return NextResponse.json(data)
  } catch (error) {
    logError("GET", error, url)

    const errorMessage = error instanceof TypeError && error.message.includes("fetch")
      ? "Cannot connect to Laravel backend. Please ensure it's running on " + API_URL
      : error instanceof Error
        ? error.message
        : "Unknown error"

    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
        apiUrl: url,
        suggestion: "Check if Laravel server is running and CORS is configured"
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  const token = getAuthToken()

  if (!token) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    )
  }
  const url = `${API_URL}/mission-and-vision`

  try {
    const body = await request.json()

    console.log("[Mission&Vision API] POST - Sending to:", url)
    console.log("[Mission&Vision API] POST - Payload:", JSON.stringify(body, null, 2))

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-Requested-With": "XMLHttpRequest",
      },
      body: JSON.stringify(body),
    })

    const responseText = await response.text()
    console.log("[Mission&Vision API] POST - Status:", response.status)
    console.log("[Mission&Vision API] POST - Response:", responseText.substring(0, 500))

    if (!response.ok) {
      try {
        const errorData = JSON.parse(responseText)
        console.log("[Mission&Vision API] POST - Error data:", errorData)
        return NextResponse.json(
          {
            success: false,
            error: errorData.message || "Failed to create mission and vision data",
            details: errorData.errors || errorData,
          },
          { status: response.status },
        )
      } catch {
        console.log("[Mission&Vision API] POST - HTML error response")
        return NextResponse.json(
          {
            success: false,
            error: "Server returned an error. Check Laravel logs for details.",
            isHtmlError: responseText.includes("<html") || responseText.includes("<!DOCTYPE"),
            rawResponse: responseText.substring(0, 200)
          },
          { status: response.status },
        )
      }
    }

    const data = JSON.parse(responseText)
    return NextResponse.json(data)
  } catch (error) {
    logError("POST", error, url)

    const errorMessage = error instanceof TypeError && error.message.includes("fetch")
      ? "Cannot connect to Laravel backend. Please ensure it's running on " + API_URL
      : error instanceof Error
        ? error.message
        : "Unknown error"

    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
        apiUrl: url,
        suggestion: "Check if Laravel server is running and CORS is configured"
      },
      { status: 500 },
    )
  }
}

export async function PUT(request: NextRequest) {
  const token = await getAuthToken()

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  const url = `${API_URL}/mission-and-vision`

  try {
    const body = await request.json()

    console.log("[Mission&Vision API] PUT - Sending to:", url)
    console.log("[Mission&Vision API] PUT - Payload:", JSON.stringify(body, null, 2))

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-Requested-With": "XMLHttpRequest",
      },
      body: JSON.stringify(body),
    })

    const responseText = await response.text()
    console.log("[Mission&Vision API] PUT - Status:", response.status)
    console.log("[Mission&Vision API] PUT - Response:", responseText.substring(0, 500))

    if (!response.ok) {
      try {
        const errorData = JSON.parse(responseText)
        return NextResponse.json(
          {
            success: false,
            error: errorData.message || "Failed to update mission and vision data",
            details: errorData.errors || errorData,
          },
          { status: response.status },
        )
      } catch {
        return NextResponse.json(
          {
            success: false,
            error: "Server returned an error. Check Laravel logs for details.",
            isHtmlError: responseText.includes("<html") || responseText.includes("<!DOCTYPE"),
            rawResponse: responseText.substring(0, 200)
          },
          { status: response.status },
        )
      }
    }

    const data = JSON.parse(responseText)
    return NextResponse.json(data)
  } catch (error) {
    logError("PUT", error, url)

    const errorMessage = error instanceof TypeError && error.message.includes("fetch")
      ? "Cannot connect to Laravel backend. Please ensure it's running on " + API_URL
      : error instanceof Error
        ? error.message
        : "Unknown error"

    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
        apiUrl: url,
        suggestion: "Check if Laravel server is running and CORS is configured"
      },
      { status: 500 },
    )
  }
}

export async function DELETE(request: NextRequest) {
  const url = `${API_URL}/mission-and-vision`

  try {
    console.log("[Mission&Vision API] DELETE - Sending to:", url)

    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
      },
    })

    const responseText = await response.text()
    console.log("[Mission&Vision API] DELETE - Status:", response.status)

    if (!response.ok) {
      try {
        const errorData = JSON.parse(responseText)
        return NextResponse.json(
          {
            success: false,
            error: errorData.message || "Failed to delete mission and vision data",
            details: errorData.errors || errorData,
          },
          { status: response.status },
        )
      } catch {
        return NextResponse.json(
          {
            success: false,
            error: "Server returned an error. Check Laravel logs for details.",
            rawResponse: responseText.substring(0, 200)
          },
          { status: response.status },
        )
      }
    }

    const data = JSON.parse(responseText)
    return NextResponse.json(data)
  } catch (error) {
    logError("DELETE", error, url)

    const errorMessage = error instanceof TypeError && error.message.includes("fetch")
      ? "Cannot connect to Laravel backend. Please ensure it's running on " + API_URL
      : error instanceof Error
        ? error.message
        : "Unknown error"

    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
        apiUrl: url,
        suggestion: "Check if Laravel server is running and CORS is configured"
      },
      { status: 500 },
    )
  }
}