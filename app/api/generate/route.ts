import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are a marketing AI assistant." },
          { role: "user", content: prompt }
        ],
      }),
    });

    const data = await response.json();

    return NextResponse.json({
      result: data.choices?.[0]?.message?.content
    });

  } catch (error) {
    return NextResponse.json(
      { error: "Failed to generate response" },
      { status: 500 }
    );
  }
}export async function GET() {
  return Response.json({
    status: "API working"
  });
}