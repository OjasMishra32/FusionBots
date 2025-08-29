import { useEffect, useMemo, useRef, useState } from "react";
import "./FBChat.css";

/**
 * FusionBots AI Chat — compact, auto-hide on scroll, positioned left of Events button
 * - apiPath: POST endpoint returning { answer }
 * - faqs: optional fallback/context
 */

export default function FBChat({
  apiPath = "/api/fusionbots-chat",
  brand = "FusionBots",
  starterTips = [
    "What do your beginner workshops cover?",
    "Do I need hardware or can I use simulators?",
    "How do I join the next free session?",
    "How do the kits and curriculum work?",
  ],
  faqs = [
    { q: "What is FusionBots?", a: "We provide accessible robotics education via kits, curriculum, and workshops." },
    { q: "Do I need hardware?", a: "No hardware required for starters—use simulators like https://vr.vex.com/." },
    { q: "How long are workshops?", a: "Intro sessions are ~90 minutes. Check our events or announcements for exact times." },
    { q: "Website", a: "https://fusionbots.org" },
    { q: "Contact", a: "Email: ojasvamishra32@gmail.com" }
  ],
}) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);
  const [hidden, setHidden] = useState(false); // auto-hide on scroll
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("fb_chat");
    return saved
      ? JSON.parse(saved)
      : [{ role: "assistant", content: `Hi! I’m the ${brand} assistant. Ask me anything about robotics kits, curriculum, or workshops.` }];
  });

  // hide on scroll (debounced)
  useEffect(() => {
    let t;
    let lastY = window.scrollY;
    const onScroll = () => {
      // hide immediately when scrolling
      setHidden(true);
      clearTimeout(t);
      // show again after scrolling stops for 350ms
      t = setTimeout(() => setHidden(false), 350);
      lastY = window.scrollY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(t);
    };
  }, []);

  const listRef = useRef(null);
  useEffect(() => {
    localStorage.setItem("fb_chat", JSON.stringify(messages));
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, open]);

  // --- tiny FAQ search for context ---
  const vector = useMemo(() => buildVectors(faqs), [faqs]);
  function selectContext(query, k = 3) {
    if (!faqs?.length) return "";
    const qv = new Array(vector.vocab.length).fill(0);
    tokenize(query).forEach(t => {
      const i = vector.map.get(t);
      if (i != null) qv[i] += 1;
    });
    const qn = normalize(qv);
    const scored = vector.tfidf.map((v, idx) => ({ idx, s: cosine(qn, v) }));
    scored.sort((a, b) => b.s - a.s);
    const top = scored.slice(0, k).map(({ idx }) => `Q: ${faqs[idx].q}\nA: ${faqs[idx].a}`);
    return top.join("\n\n");
  }

  async function send(text) {
    const content = text.trim();
    if (!content || busy) return;
    setError(null);
    setBusy(true);

    const userMsg = { role: "user", content };
    setMessages(m => [...m, userMsg]);

    const context = selectContext(content, 3);

    try {
      const res = await fetch(apiPath, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            { role: "system", content: systemPrompt(brand) },
            ...messages,
            userMsg,
          ],
          context,
        }),
      });

      if (!res.ok) throw new Error(`Server ${res.status}`);
      const data = await res.json();
      const answer = (data.answer || "").trim() || "Sorry, I don’t have that info yet.";
      setMessages(m => [...m, { role: "assistant", content: answer }]);
    } catch (e) {
      console.error(e);
      setError("Couldn’t reach the AI service. Showing FAQ-based help.");
      // Fallback: FAQ answer blob
      const fallback = context ? context.replaceAll("\n\n", "\n") : "Please try again later or email ojasvamishra32@gmail.com.";
      setMessages(m => [...m, { role: "assistant", content: fallback }]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className={`fb-root ${hidden ? "fb-hidden" : ""}`}>
      {/* FAB */}
      <button className="fb-fab" aria-label="Open chat" onClick={() => setOpen(v => !v)}>
        <span className="fb-fab-icon">🤖</span>
        <div className="fb-fab-text">
          <div className="fb-fab-title">Chat with {brand}</div>
          <div className="fb-fab-sub">AI answers • 24/7</div>
        </div>
      </button>

      {open && (
        <div className="fb-panel">
          <div className="fb-header">
            <div className="fb-header-left">
              <div className="fb-logo">🤖</div>
              <div>
                <div className="fb-header-title">{brand} Assistant</div>
                <div className="fb-header-sub">Robotics • Kits • Workshops</div>
              </div>
            </div>
            <button className="fb-close" aria-label="Close chat" onClick={() => setOpen(false)}>✕</button>
          </div>

          <div className="fb-messages" ref={listRef}>
            {messages.map((m, i) => (
              <div key={i} className={`fb-bubble ${m.role === "user" ? "me" : "bot"}`}>
                {linkify(m.content)}
              </div>
            ))}
            {error && <div className="fb-error">{error}</div>}

            {!messages.some(m => m.role === "user") && starterTips?.length > 0 && (
              <div className="fb-suggestions">
                <div className="fb-suggest-label">Try one:</div>
                <div className="fb-suggest-list">
                  {starterTips.map((t, idx) => (
                    <button key={idx} className="fb-suggest" onClick={() => send(t)}>{t}</button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <form
            className="fb-inputbar"
            onSubmit={e => {
              e.preventDefault();
              if (!busy) send(input);
              setInput("");
            }}
          >
            <textarea
              className="fb-textarea"
              value={input}
              placeholder="Ask about workshops, kits, events, partnerships…"
              rows={1}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  if (!busy) { send(input); setInput(""); }
                }
              }}
            />
            <button className="fb-send" disabled={busy} type="submit">
              {busy ? "Sending…" : "Send"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

// --- helpers ---
function systemPrompt(brand) {
  return `You are the ${brand} website assistant. Be concise, friendly, and factual about robotics education, workshops, kits, and simulators.
If unsure, say you're not sure and suggest contacting ojasvamishra32@gmail.com. Prefer clear steps, links, and sign-up instructions.`;
}

function linkify(text) {
  const parts = text.split(/(https?:\/\/[^\s]+)/g);
  return parts.map((p, i) =>
    /^https?:\/\//.test(p) ? (
      <a key={i} href={p} target="_blank" rel="noreferrer" className="fb-link">{p}</a>
    ) : (
      <span key={i}>{p}</span>
    )
  );
}

// --- ultra-light TF-IDF for FAQ context ----
function tokenize(s) {
  return s.toLowerCase().replace(/[^a-z0-9@.+:\/\-\s]/g, " ").split(/\s+/).filter(Boolean);
}
function normalize(v) {
  const n = Math.sqrt(v.reduce((acc, x) => acc + x * x, 0)) || 1;
  return v.map(x => x / n);
}
function cosine(a, b) {
  let s = 0, n = Math.min(a.length, b.length);
  for (let i = 0; i < n; i++) s += a[i] * b[i];
  return s;
}
function buildVectors(faqs) {
  const docs = faqs.map(f => `${f.q}\n${f.a}`);
  const map = new Map();
  const tf = docs.map(doc => {
    const counts = new Map();
    tokenize(doc).forEach(t => counts.set(t, (counts.get(t) || 0) + 1));
    counts.forEach((_, t) => { if (!map.has(t)) map.set(t, map.size); });
    const vec = new Array(map.size).fill(0);
    counts.forEach((c, t) => { vec[map.get(t)] = c; });
    return vec;
  });
  const df = new Array(map.size).fill(0);
  tf.forEach(vec => vec.forEach((v, i) => (df[i] += v > 0 ? 1 : 0)));
  const idf = df.map(d => Math.log((docs.length + 1) / (d + 1)) + 1);
  const tfidf = tf.map(vec => normalize(vec.map((v, i) => v * idf[i])));
  return { map, vocab: Array.from(map.keys()), tfidf };
}
