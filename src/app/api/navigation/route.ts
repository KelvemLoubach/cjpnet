import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const links = await db.navLink.findMany({
      orderBy: { sortOrder: "asc" },
    });
    return NextResponse.json(links);
  } catch (error) {
    console.error("Error fetching nav links:", error);
    return NextResponse.json({ error: "Failed to fetch nav links" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { label, href, active, sortOrder } = body;
    const link = await db.navLink.create({
      data: { label, href, active: active || false, sortOrder: sortOrder || 0 },
    });
    return NextResponse.json(link);
  } catch (error) {
    console.error("Error creating nav link:", error);
    return NextResponse.json({ error: "Failed to create nav link" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, label, href, active, sortOrder } = body;

    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }

    const link = await db.navLink.update({
      where: { id },
      data: {
        ...(label !== undefined && { label }),
        ...(href !== undefined && { href }),
        ...(active !== undefined && { active }),
        ...(sortOrder !== undefined && { sortOrder }),
      },
    });
    return NextResponse.json(link);
  } catch (error) {
    console.error("Error updating nav link:", error);
    return NextResponse.json({ error: "Failed to update nav link" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }

    await db.navLink.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting nav link:", error);
    return NextResponse.json({ error: "Failed to delete nav link" }, { status: 500 });
  }
}
