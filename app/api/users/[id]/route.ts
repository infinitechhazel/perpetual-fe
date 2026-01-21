<<<<<<< HEAD
import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"

// PUT - Update business partner
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("auth_token")?.value

    if (!token) {
      return NextResponse.json({ success: false, message: "Authentication required" }, { status: 401 })
    }

    const formData = await req.formData()
    const id = params.id

    console.log("Updating business at:", `${API_URL}/business-partners/${id}`)

    const res = await fetch(`${API_URL}/business-partners/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "X-Requested-With": "XMLHttpRequest",
      },
      body: formData,
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
          message: data.message || "Failed to update business",
          errors: data.errors,
          error: data.error,
        },
        { status: res.status },
      )
    }

    return NextResponse.json(data, { status: 200 })
  } catch (err) {
    console.error("Error updating business:", err)
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
        error: err instanceof Error ? err.message : "Unknown error",
      },
      { status: 500 },
=======
// app/api/users/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

const LARAVEL_API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    // Get token from HTTP-only cookie
    const cookieStore = await cookies()
    const token = cookieStore.get('auth_token')?.value

    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Not authenticated. Please log in again.' },
        { status: 401 }
      )
    }

    // Get request body
    const body = await request.json()

    console.log('Updating user status:', {
      userId: id,
      status: body.status,
      hasAuth: !!token,
    })

    const response = await fetch(`${LARAVEL_API_URL}/users/${id}/status`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'X-Requested-With': 'XMLHttpRequest',
      },
      body: JSON.stringify(body),
    })

    const data = await response.json()

    console.log('Laravel response:', {
      status: response.status,
      success: data.success,
      message: data.message,
    })

    return NextResponse.json(data, { status: response.status })

  } catch (error) {
    console.error('API route error:', error)
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : 'Internal server error',
      },
      { status: 500 }
>>>>>>> 561776b9ce8628155506d64a5d7a830f2d0d8d55
    )
  }
}

<<<<<<< HEAD
// DELETE - Delete business partner
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("auth_token")?.value

    if (!token) {
      return NextResponse.json({ success: false, message: "Authentication required" }, { status: 401 })
    }

    const id = params.id

    console.log("Deleting business at:", `${API_URL}/business-partners/${id}`)

    const res = await fetch(`${API_URL}/business-partners/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "X-Requested-With": "XMLHttpRequest",
      },
    })

    const data = await res.json()

    if (!res.ok) {
      return NextResponse.json(
        {
          success: false,
          message: data.message || "Failed to delete business",
          error: data.error,
        },
        { status: res.status },
      )
    }

    return NextResponse.json(data, { status: 200 })
  } catch (err) {
    console.error("Error deleting business:", err)
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
        error: err instanceof Error ? err.message : "Unknown error",
      },
      { status: 500 },
=======
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    // Get token from HTTP-only cookie
    const cookieStore = await cookies()
    const token = cookieStore.get('auth_token')?.value

    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Not authenticated. Please log in again.' },
        { status: 401 }
      )
    }

    console.log('Fetching user:', {
      userId: id,
      hasAuth: !!token,
    })

    const response = await fetch(`${LARAVEL_API_URL}/users/${id}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
        'X-Requested-With': 'XMLHttpRequest',
      },
    })

    const data = await response.json()

    console.log('Laravel response:', {
      status: response.status,
      success: data.success,
    })

    return NextResponse.json(data, { status: response.status })

  } catch (error) {
    console.error('API route error:', error)
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : 'Internal server error',
      },
      { status: 500 }
>>>>>>> 561776b9ce8628155506d64a5d7a830f2d0d8d55
    )
  }
}