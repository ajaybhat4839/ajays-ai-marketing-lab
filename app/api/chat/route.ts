import { NextResponse } from "next/server";
import OpenAI from "openai";
import { GoogleGenAI } from "@google/genai";


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


const gemini = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});


const systemPrompt =
"You are Ajay's AI Marketing Lab assistant. Give professional SEO, Ads, Content and Digital Marketing advice. Be structured and actionable.";



export async function POST(req: Request) {

  try {

    const { message } = await req.json();


    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }



    // TRY OPENAI FIRST
    try {

      const response =
        await openai.chat.completions.create({

          model: "gpt-4.1-mini",

          messages: [
            {
              role: "system",
              content: systemPrompt
            },
            {
              role: "user",
              content: message
            }
          ]

        });


      return NextResponse.json({
        reply: response.choices[0].message.content,
        provider: "openai"
      });


    } catch(openaiError) {

      console.log(
        "OpenAI unavailable, switching to Gemini"
      );

    }




    // GEMINI FALLBACK

    const response =
      await gemini.models.generateContent({

        model: "gemini-2.5-flash",

        contents: message,

        config: {
          systemInstruction: systemPrompt
        }

      });



    return NextResponse.json({
      reply: response.text,
      provider: "gemini"
    });



  } catch(error) {


    console.log(error);


    return NextResponse.json(
      {
        error:"AI connection failed"
      },
      {
        status:500
      }
    );

  }

}