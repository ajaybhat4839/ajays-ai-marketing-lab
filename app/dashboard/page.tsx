"use client";

import { useState } from "react";

export default function Dashboard() {
  const [prompt, setPrompt] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    setLoading(true);

    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();
    setOutput(data.output);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-3xl font-bold">AI Marketing Dashboard</h1>

      <textarea
        className="w-full mt-6 p-4 text-black"
        placeholder="Write: Generate ad for gym business..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <button
        onClick={generate}
        className="mt-4 px-6 py-3 bg-white text-black rounded"
      >
        {loading ? "Generating..." : "Generate"}
      </button>

      <div className="mt-8 p-4 bg-white/10 rounded">
        {output}
      </div>
    </div>
  );
}<div className="mt-10 space-x-4">
  <a href="/dashboard">Dashboard</a>
  <a href="/ads">Ads</a>
  <a href="/seo">SEO</a>
  <a href="/email">Email</a>
  <a href="/blog">Blog</a>
</div>