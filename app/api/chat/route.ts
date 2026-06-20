export async function POST(req: Request) {
  const { messages } = await req.json();

  // Try Groq first
  try {
    const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: 'You are an elite marketing strategist. Be concise and powerful.' },
          ...messages.map((m: any) => ({ role: m.role, content: m.content })),
        ],
      }),
    });

    const groqData = await groqResponse.json();
    if (groqData.choices?.[0]?.message?.content) {
      return new Response(groqData.choices[0].message.content);
    }
  } catch (e) {
    console.log('Groq failed, trying Gemini...');
  }

  // Try Gemini second
  try {
    const geminiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    const lastMessage = messages[messages.length - 1].content;

    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent?key=${geminiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: lastMessage }] }],
        }),
      }
    );

    const geminiData = await geminiResponse.json();
    if (geminiData.candidates?.[0]?.content?.parts?.[0]?.text) {
      return new Response(geminiData.candidates[0].content.parts[0].text);
    }
  } catch (e) {
    console.log('Gemini failed, trying OpenAI...');
  }

  // Try OpenAI last
  try {
    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are an elite marketing strategist. Be concise and powerful.' },
          ...messages.map((m: any) => ({ role: m.role, content: m.content })),
        ],
      }),
    });

    const openaiData = await openaiResponse.json();
    if (openaiData.choices?.[0]?.message?.content) {
      return new Response(openaiData.choices[0].message.content);
    }
  } catch (e) {
    console.log('OpenAI failed too.');
  }

  return new Response('All AI services are currently unavailable. Please try again.');
}