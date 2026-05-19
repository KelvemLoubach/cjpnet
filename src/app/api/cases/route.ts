import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const cases = await db.caseStudy.findMany({
      orderBy: { sortOrder: "asc" },
    });
    return NextResponse.json(cases);
  } catch (error) {
    console.error("Error fetching cases:", error);
    return NextResponse.json({ error: "Failed to fetch cases" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, segment, description, highlights, sortOrder } = body;
    const caseStudy = await db.caseStudy.create({
      data: {
        title,
        segment,
        description,
        highlights: JSON.stringify(highlights || []),
        sortOrder: sortOrder || 0,
      },
    });
    return NextResponse.json(caseStudy);
  } catch (error) {
    console.error("Error creating case:", error);
    return NextResponse.json({ error: "Failed to create case" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, title, segment, description, highlights, sortOrder } = body;

    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }

    const caseStudy = await db.caseStudy.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(segment !== undefined && { segment }),
        ...(description !== undefined && { description }),
        ...(highlights !== undefined && { highlights: JSON.stringify(highlights) }),
        ...(sortOrder !== undefined && { sortOrder }),
      },
    });
    return NextResponse.json(caseStudy);
  } catch (error) {
    console.error("Error updating case:", error);
    return NextResponse.json({ error: "Failed to update case" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }

    await db.caseStudy.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting case:", error);
    return NextResponse.json({ error: "Failed to delete case" }, { status: 500 });
  }
}
