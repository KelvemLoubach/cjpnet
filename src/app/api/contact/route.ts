import { NextRequest, NextResponse } from "next/server";

const WEB3FORMS_KEY =
  process.env.WEB3FORMS_KEY || "fa80c2ce-ec64-4db2-bd19-56f792c784aa";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const payload = {
      access_key: WEB3FORMS_KEY,
      name: body.name,
      email: body.email,
      phone: body.phone || "",
      subject: body._subject || "Novo contato via site CJP NET",
      message: body.message,
    };

    console.log("Sending to Web3Forms, key:", WEB3FORMS_KEY.substring(0, 8) + "...");

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    // Lê como texto primeiro para poder logar a resposta bruta em caso de erro
    const rawText = await res.text();
    console.log("Web3Forms status:", res.status, "body:", rawText.substring(0, 300));

    let data: Record<string, unknown>;
    try {
      data = JSON.parse(rawText);
    } catch {
      data = {
        success: false,
        message: `Erro ${res.status}: ${rawText.substring(0, 150)}`,
      };
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("Contact fetch error:", msg);
    return NextResponse.json(
      { success: false, message: `Erro de rede: ${msg}` },
      { status: 200 }
    );
  }
}
