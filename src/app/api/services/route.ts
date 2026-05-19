import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const services = await db.service.findMany({
      orderBy: { sortOrder: "asc" },
    });
    return NextResponse.json(services);
  } catch (error) {
    console.error("Error fetching services:", error);
    return NextResponse.json({ error: "Failed to fetch services" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, icon, featured, sortOrder, ctaText, highlight, checkItems } = body;
    const service = await db.service.create({
      data: {
        title,
        description,
        icon: icon || "cloud",
        featured: featured || false,
        sortOrder: sortOrder || 0,
        ctaText,
        highlight: highlight || false,
        checkItems: JSON.stringify(checkItems || []),
      },
    });
    return NextResponse.json(service);
  } catch (error) {
    console.error("Error creating service:", error);
    return NextResponse.json({ error: "Failed to create service" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, title, description, icon, featured, sortOrder, ctaText, highlight, checkItems } = body;

    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }

    const service = await db.service.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(description !== undefined && { description }),
        ...(icon !== undefined && { icon }),
        ...(featured !== undefined && { featured }),
        ...(sortOrder !== undefined && { sortOrder }),
        ...(ctaText !== undefined && { ctaText }),
        ...(highlight !== undefined && { highlight }),
        ...(checkItems !== undefined && { checkItems: JSON.stringify(checkItems) }),
      },
    });
    return NextResponse.json(service);
  } catch (error) {
    console.error("Error updating service:", error);
    return NextResponse.json({ error: "Failed to update service" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }

    await db.service.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting service:", error);
    return NextResponse.json({ error: "Failed to delete service" }, { status: 500 });
  }
}
