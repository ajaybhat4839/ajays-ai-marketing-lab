export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { askAI } from "@/lib/ai";

export async function POST(req: Request) {
  try {
    const { resume, job } = await req.json();

    if (!resume || !job) {
      return NextResponse.json({
        result: "Resume and job description required"
      });
    }

    const prompt = `
You are a professional ATS Resume Analyzer.

Analyze this resume:

${resume}

Compare it with this job description:

${job}

Return the result in this format:

ATS Score: __/100

Missing Keywords:
-

Resume Problems:
-

ATS Improvements:
-

Improved Resume:

(write optimized resume)

Suggestions:
-`;

    const result = await askAI(prompt);

    // Lazy-load supabase only at request time
    const { getSupabase } = await import("@/lib/supabase");
    const supabase = getSupabase();

    const { error } = await supabase
      .from("ats_reports")
      .insert({
        user_id: "guest",
        resume: resume,
        result: result
      });

    if (error) {
      console.log("Supabase save error:", error);
    }

    return NextResponse.json({ result });

  } catch (error) {
    return NextResponse.json({
      result: "Server Error: " + error
    });
  }
}