import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const contents = await db.siteContent.findMany({
      orderBy: { group: "asc" },
    });
    return NextResponse.json(contents);
  } catch (error) {
    console.error("Error fetching content:", error);
    return NextResponse.json({ error: "Failed to fetch content" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, key, value, type, group } = body;

    if (id) {
      const updated = await db.siteContent.update({
        where: { id },
        data: { value, type, group },
      });
      return NextResponse.json(updated);
    }

    if (key) {
      const upserted = await db.siteContent.upsert({
        where: { key },
        update: { value, type, group },
        create: { key, value, type, group },
      });
      return NextResponse.json(upserted);
    }

    return NextResponse.json({ error: "Missing id or key" }, { status: 400 });
  } catch (error) {
    console.error("Error updating content:", error);
    return NextResponse.json({ error: "Failed to update content" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (Array.isArray(body)) {
      const results = [];
      for (const item of body) {
        const result = await db.siteContent.upsert({
          where: { key: item.key },
          update: { value: item.value, type: item.type, group: item.group },
          create: { key: item.key, value: item.value, type: item.type || "text", group: item.group },
        });
        results.push(result);
      }
      return NextResponse.json(results);
    }

    const { key, value, type, group } = body;
    const created = await db.siteContent.create({
      data: { key, value, type: type || "text", group },
    });
    return NextResponse.json(created);
  } catch (error) {
    console.error("Error creating content:", error);
    return NextResponse.json({ error: "Failed to create content" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }

    await db.siteContent.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting content:", error);
    return NextResponse.json({ error: "Failed to delete content" }, { status: 500 });
  }
}
