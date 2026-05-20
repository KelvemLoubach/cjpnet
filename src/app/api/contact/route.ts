import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const emailRecord = await db.siteContent.findUnique({
      where: { key: "contact_email" },
    });
    const contactEmail = emailRecord?.value || "contato@cjpnet.com.br";

    const res = await fetch(`https://formsubmit.co/ajax/${contactEmail}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        ...body,
        _captcha: "false",
        _template: "table",
      }),
    });

    // FormSubmit pode retornar HTML em erros de gateway (522, 5xx)
    let data: Record<string, unknown>;
    try {
      data = await res.json();
    } catch {
      return NextResponse.json(
        { success: "false", error: "Serviço de e-mail temporariamente indisponível" },
        { status: 502 }
      );
    }

    return NextResponse.json(data, { status: res.ok ? 200 : 502 });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Falha ao enviar mensagem" }, { status: 500 });
  }
}
