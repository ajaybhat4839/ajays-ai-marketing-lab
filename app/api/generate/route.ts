import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

// Initialize the Gemini client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    // Call the live Gemini API with the prompt
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash", // Fast, recommended model
      contents: prompt,
    });

    const result = response.text || "I was unable to generate content. Please try again.";

    // Return the result matching your frontend expectations
    return NextResponse.json({
      result: result
    });

  } catch (error) {
    console.error("Gemini Generate Error:", error);
    
    return NextResponse.json(
      {
        error: "Failed to connect to Gemini API"
      },
      {
        status: 500
      }
    );
  }
}