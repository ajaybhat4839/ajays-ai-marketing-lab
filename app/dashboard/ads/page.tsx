"use client";

import { useState } from "react";

export default function Ads() {
  const [prompt, setPrompt] = useState("");
  const [output, setOutput] = useState("");

  const generate = async () => {
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: `Write high converting Facebook ad copy: ${prompt}`,
      }),
    });

    const data = await res.json();
    setOutput(data.output);
  };

  return (
    <div className="p-10 bg-black text-white min-h-screen">
      <h1 className="text-3xl font-bold">Ads Generator</h1>

      <textarea
        className="w-full mt-5 p-3 text-black"
        placeholder="Enter product or business..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <button onClick={generate} className="mt-4 bg-white text-black px-4 py-2">
        Generate Ads
      </button>

      <pre className="mt-6 whitespace-pre-wrap">{output}</pre>
    </div>
  );
}