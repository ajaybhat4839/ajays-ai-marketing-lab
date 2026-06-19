"use client";

import { useState } from "react";

export default function ChatPage() {

  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  const [model, setModel] = useState("gemini");


  async function sendMessage() {

    if (!message) return;

    setLoading(true);
    setReply("");

    try {

      const res = await fetch("/api/chat", {

        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          message,
          model
        })

      });


      const data = await res.json();


      if (data.error) {

        setReply(`Error: ${data.error}`);

      } else {

        setReply(data.reply);

      }


    } catch(err) {

      console.log(err);

      setReply(
        "Failed to connect to AI Assistant."
      );

    } finally {

      setLoading(false);

    }

  }


  return (

    <div className="min-h-screen bg-black text-white p-10">


      <h1 className="text-5xl font-bold">
        AI Marketing Assistant 🤖
      </h1>


      <p className="mt-3 text-gray-400">
        Ask anything about SEO, Ads, Content or Growth.
      </p>


      <div className="mt-8">


        <select
          value={model}
          onChange={(e)=>setModel(e.target.value)}
          className="bg-white text-black p-3 rounded-xl"
        >

          <option value="gemini">
            Google Gemini
          </option>

          <option value="openai">
            OpenAI GPT
          </option>

        </select>



        <textarea

          value={message}

          onChange={(e)=>setMessage(e.target.value)}

          placeholder="Create SEO strategy..."

          className="
          mt-5
          w-full
          h-40
          p-5
          rounded-2xl
          bg-white/10
          border
          border-white/20
          "

        />



        <button

          onClick={sendMessage}

          className="
          mt-5
          px-8
          py-4
          rounded-xl
          bg-white
          text-black
          font-bold
          "

        >

          Generate

        </button>



        {loading && (

          <p className="mt-5 text-blue-400">
            AI is thinking...
          </p>

        )}



        {reply && (

          <div className="mt-8 p-6 rounded-2xl bg-white/5">

            <pre className="whitespace-pre-wrap">
              {reply}
            </pre>

          </div>

        )}


      </div>


    </div>

  );

}