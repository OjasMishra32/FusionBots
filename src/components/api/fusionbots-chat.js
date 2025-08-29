// api/fusionbots-chat.js
// Vercel Serverless Function → proxies your chat to Groq (OpenAI-compatible)

const ALLOWED_ORIGIN = "*"; // for same-origin on Vercel this is fine. Lock down later if you want.

function cors(res) {
  res.setHeader("Access-Control-Allow-Origin", ALLOWED_ORIGIN);
  res.setHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
}

module.exports = async (req, res) => {
  cors(res);

  if (req.method === "GET") {
    // quick health check in the browser
    return res.status(200).json({ ok: true, route: "/api/fusionbots-chat" });
  }
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    if (!process.env.GROQ_API_KEY) {
      return res.status(500).json({ error: "Missing GROQ_API_KEY env var" });
    }

    // Parse request body safely
    let body = req.body;
    if (typeof body === "string") {
      try { body = JSON.parse(body); } catch { body = {}; }
    }
    body = body || {};

    const brand = body.brand || "FusionBots";
    const context = (body.context || "").toString().slice(0, 4000); // guard length
    const userMessages = Array.isArray(body.messages) ? body.messages : [];

    // Allow overriding model via env or request. Default = your curl model.
    const model =
      process.env.GROQ_MODEL ||
      body.model ||
      "meta-llama/llama-4-scout-17b-16e-instruct";

    const system = [
      `You are the ${brand} website assistant.`,
      `Be concise, friendly, and factual about robotics kits, curriculum, workshops, and simulators.`,
      `If unsure, say you're not sure and suggest contacting ojasvamishra32@gmail.com.`,
      context ? `Helpful context:\n${context}` : ``,
    ].filter(Boolean).join("\n\n");

    const messages = [
      { role: "system", content: system },
      ...userMessages
    ];

    // Call Groq (OpenAI-compatible)
    const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model,
        messages,
        temperature: 0.3,
        max_tokens: 700
      })
    });

    if (!groqRes.ok) {
      const errorText = await groqRes.text().catch(() => "");
      return res.status(502).json({ error: "Groq upstream error", detail: errorText });
    }

    const data = await groqRes.json();
    const answer = data?.choices?.[0]?.message?.content?.trim() || "Sorry, I don’t have that info yet.";
    return res.status(200).json({ answer });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Unexpected server error" });
  }
};
