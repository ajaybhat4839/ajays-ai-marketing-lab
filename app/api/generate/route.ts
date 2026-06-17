import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


export async function POST(req: Request) {

  try {

    const body = await req.json();

    const response = await client.chat.completions.create({

      model: "gpt-4.1-mini",

      messages: [
        {
          role: "system",
          content:
          "You are an expert digital marketing AI assistant."
        },
        {
          role: "user",
          content: body.prompt
        }
      ],

    });


    return NextResponse.json({

      result:
      response.choices[0].message.content

    });


  } catch(error) {

    console.log(error);

    return NextResponse.json(
      {
        error:"AI generation failed"
      },
      {
        status:500
      }
    );

  }

}