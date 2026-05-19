import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const segments = await db.segment.findMany({
      orderBy: { sortOrder: "asc" },
    });
    return NextResponse.json(segments);
  } catch (error) {
    console.error("Error fetching segments:", error);
    return NextResponse.json({ error: "Failed to fetch segments" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, subtitle, description, applications, icon, sortOrder } = body;
    const segment = await db.segment.create({
      data: {
        title,
        subtitle,
        description,
        applications: JSON.stringify(applications || []),
        icon: icon || "globe",
        sortOrder: sortOrder || 0,
      },
    });
    return NextResponse.json(segment);
  } catch (error) {
    console.error("Error creating segment:", error);
    return NextResponse.json({ error: "Failed to create segment" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, title, subtitle, description, applications, icon, sortOrder } = body;

    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }

    const segment = await db.segment.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(subtitle !== undefined && { subtitle }),
        ...(description !== undefined && { description }),
        ...(applications !== undefined && { applications: JSON.stringify(applications) }),
        ...(icon !== undefined && { icon }),
        ...(sortOrder !== undefined && { sortOrder }),
      },
    });
    return NextResponse.json(segment);
  } catch (error) {
    console.error("Error updating segment:", error);
    return NextResponse.json({ error: "Failed to update segment" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }

    await db.segment.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting segment:", error);
    return NextResponse.json({ error: "Failed to delete segment" }, { status: 500 });
  }
}
