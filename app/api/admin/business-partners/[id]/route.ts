import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params
    const cookieStore = await cookies()
    const authToken = cookieStore.get("auth_token")

    if (!authToken) {
      return NextResponse.json(
        { success: false, message: "Authentication required - no auth token found" },
        { status: 401 }
      );
    }

    // Get FormData from frontend
    const formData = await req.formData();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/business-partners/${id}`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${authToken.value}`,
        },
        credentials: "include",
        body: formData,
      }
    );

    const contentType = response.headers.get("content-type");
    let data: any;

    if (contentType?.includes("application/json")) {
      data = await response.json();
    } else {
      const text = await response.text();
      console.error("Non-JSON response from Laravel:", text);
      return NextResponse.json(
        { success: false, message: "Invalid response from server" },
        { status: 500 }
      );
    }

    // Handle Laravel validation errors
    if (response.status === 422) {
      console.warn("Validation errors:", data.errors);
      return NextResponse.json(
        {
          success: false,
          message: data.message || "Validation failed",
          errors: data.errors || {},
        },
        { status: 422 }
      );
    }

    if (!response.ok) {
      console.error("Backend error:", data);
      return NextResponse.json(
        {
          success: false,
          message: data.message || "Failed to update business",
          errors: data.errors,
          error: data.error,
        },
        { status: response.status }
      )
    }

    return NextResponse.json(data, { status: 200 })
  } catch (error) {
    console.error("Error updating business:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}

// DELETE - Delete business partner (Admin)
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params
    const cookieStore = await cookies()
    const authToken = cookieStore.get("auth_token")

    if (!authToken) {
      return NextResponse.json(
        { success: false, message: "Authentication required - no auth token found" },
        { status: 401 }
      )
    }

    console.log("=== DELETE REQUEST ===")
    console.log("URL:", `${API_URL}/admin/business-partners/${id}`)

    const response = await fetch(`${API_URL}/admin/business-partners/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${authToken.value}`,
        "X-Requested-With": "XMLHttpRequest",
      },
    })

    console.log("Laravel response status:", response.status)

    const contentType = response.headers.get("content-type")
    let data
    
    if (contentType?.includes("application/json")) {
      data = await response.json()
      console.log("Laravel response data:", data)
    } else {
      const text = await response.text()
      console.error("Non-JSON response from Laravel:", text)
      return NextResponse.json(
        { 
          success: false, 
          message: "Invalid response from server",
          debug: text.substring(0, 500)
        },
        { status: 500 }
      )
    }

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          message: data.message || "Failed to delete business",
          errors: data.errors,
          error: data.error,
        },
        { status: response.status }
      )
    }

    return NextResponse.json(data, { status: 200 })
  } catch (error) {
    console.error("Error deleting business:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}
