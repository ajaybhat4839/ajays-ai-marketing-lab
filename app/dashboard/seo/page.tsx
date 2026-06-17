"use client";

import { useState } from "react";

export default function SEOPage() {

  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);


  async function generateSEO() {

    setLoading(true);
    setResult("");

    try {

      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: `Create SEO content about: ${prompt}`,
        }),
      });


      const data = await res.json();

      setResult(data.result);

    } catch (error) {

      setResult("Something went wrong");

    }

    setLoading(false);
  }


  return (

    <div className="min-h-screen bg-black text-white p-10">

      <h1 className="text-4xl font-bold">
        SEO Generator
      </h1>


      <input

        className="mt-8 p-4 w-full bg-white/10 rounded-xl"

        placeholder="Enter SEO topic"

        value={prompt}

        onChange={(e)=>setPrompt(e.target.value)}

      />


      <button

        onClick={generateSEO}

        className="mt-5 px-8 py-3 bg-white text-black rounded-xl"

      >

        Generate

      </button>


      {loading && (

        <p className="mt-5">
          Generating...
        </p>

      )}


      {result && (

        <div className="mt-8 p-5 bg-white/10 rounded-xl">

          <pre className="whitespace-pre-wrap">

            {result}

          </pre>

        </div>

      )}


    </div>

  );
}