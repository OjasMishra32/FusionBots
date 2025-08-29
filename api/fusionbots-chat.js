// /api/fusionbots-chat.js
// Minimal, stable CommonJS handler for Vercel Node.js 20 runtime

const ALLOWED_ORIGIN = "*"; // tighten later to your domain

function setCORS(res) {
  res.setHeader("Access-Control-Allow-Origin", ALLOWED_ORIGIN);
  res.setHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
}

module.exports = async (req, res) => {
  setCORS(res);

  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method === "GET") return res.status(200).json({ ok: true, route: "/api/fusionbots-chat" });
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "Missing GROQ_API_KEY env var (set it in Vercel → Settings → Environment Variables → Production)" });
    }

    // Safe body parse (Vercel usually gives an object already)
    let body = req.body;
    if (typeof body === "string") {
      try { body = JSON.parse(body); } catch { body = {}; }
    }
    if (!body || typeof body !== "object") body = {};

    const brand = body.brand || "FusionBots";
    const context = (body.context || "").toString().slice(0, 4000);
    const userMessages = Array.isArray(body.messages) ? body.messages : [];

    // Stable Groq model (override via env GROQ_MODEL if you want)
    const model = process.env.GROQ_MODEL || "llama-3.1-70b-versatile";

    const system = [
      `You are the ${brand} website assistant.`,
      `Be concise, friendly, and factual about robotics kits, curriculum, workshops, and simulators.`,
      `If unsure, say you're not sure and suggest contacting ojasvamishra32@gmail.com.`,
      context ? `Helpful context:\n${context}` : ``
    ].filter(Boolean).join("\n\n");

    const messages = [{ role: "system", content: system }, ...userMessages];

    const upstream = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model,
        messages,
        temperature: 0.3,
        max_tokens: 700
      })
    });

    const text = await upstream.text();

    if (!upstream.ok) {
      // return details so you can see the real reason in the browser + Vercel logs
      console.error("Groq upstream error:", upstream.status, text);
      return res.status(502).json({ error: "Groq upstream error", status: upstream.status, detail: text });
    }

    let data = {};
    try { data = JSON.parse(text); } catch {}
    const answer = data?.choices?.[0]?.message?.content?.trim() || "Sorry, I don’t have that info yet.";
    return res.status(200).json({ answer });
  } catch (err) {
    console.error("Server error:", err);
    return res.status(500).json({ error: "Unexpected server error" });
  }
};
