import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const links = await db.footerLink.findMany({
      orderBy: { sortOrder: "asc" },
    });
    return NextResponse.json(links);
  } catch (error) {
    console.error("Error fetching footer links:", error);
    return NextResponse.json({ error: "Failed to fetch footer links" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { label, href, sortOrder } = body;
    const link = await db.footerLink.create({
      data: { label, href, sortOrder: sortOrder || 0 },
    });
    return NextResponse.json(link);
  } catch (error) {
    console.error("Error creating footer link:", error);
    return NextResponse.json({ error: "Failed to create footer link" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, label, href, sortOrder } = body;

    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }

    const link = await db.footerLink.update({
      where: { id },
      data: {
        ...(label !== undefined && { label }),
        ...(href !== undefined && { href }),
        ...(sortOrder !== undefined && { sortOrder }),
      },
    });
    return NextResponse.json(link);
  } catch (error) {
    console.error("Error updating footer link:", error);
    return NextResponse.json({ error: "Failed to update footer link" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }

    await db.footerLink.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting footer link:", error);
    return NextResponse.json({ error: "Failed to delete footer link" }, { status: 500 });
  }
}
