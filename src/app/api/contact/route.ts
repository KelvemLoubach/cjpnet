import { NextRequest, NextResponse } from "next/server";

const WEB3FORMS_KEY =
  process.env.WEB3FORMS_KEY || "fa80c2ce-ec64-4db2-bd19-56f792c784aa";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: WEB3FORMS_KEY,
        name: body.name,
        email: body.email,
        phone: body.phone,
        subject: body._subject || "Novo contato via site CJP NET",
        message: body.message,
      }),
    });

    let data: Record<string, unknown>;
    try {
      data = await res.json();
    } catch {
      return NextResponse.json(
        { success: false, message: "Serviço de e-mail temporariamente indisponível" },
        { status: 502 }
      );
    }

    return NextResponse.json(data, { status: res.ok ? 200 : 502 });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ success: false, message: "Falha ao enviar mensagem" }, { status: 500 });
  }
}
