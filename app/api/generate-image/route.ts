import { fal } from "@fal-ai/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    // High-tech move: Using FLUX.1 [schnell] for near-instant generation
    const result: any = await fal.subscribe("fal-ai/flux/schnell", {
      input: {
        prompt: prompt,
        image_size: "landscape_4_3",
        num_inference_steps: 4,
      },
      logs: true,
    });

    return NextResponse.json({ imageUrl: result.images[0].url });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Generation failed" }, { status: 500 });
  }
}