import React, { useEffect, useRef, useState } from "react";

const WELCOME = "আসসালামু আলাইকুম! নূর নিকাহ ব্যবহার, নিরাপত্তা বা সুন্দর বায়োডাটা লেখার বিষয়ে প্রশ্ন করতে পারেন।";

export default function AiAssistant() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([{ role: "assistant", text: WELCOME }]);
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);

  useEffect(() => { if (open) endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, loading, open]);

  const submit = async (event) => {
    event.preventDefault();
    const next = message.trim();
    if (!next || loading) return;
    setMessage("");
    setMessages((current) => [...current, { role: "user", text: next }]);
    setLoading(true);
    try {
      const response = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: next }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || "AI সহায়কের সঙ্গে সংযোগ করা যায়নি।");
      setMessages((current) => [...current, { role: "assistant", text: data.text }]);
    } catch (error) {
      setMessages((current) => [...current, { role: "error", text: error.message }]);
    } finally { setLoading(false); }
  };

  return <div className="ai-assistant notranslate">
    {open && <section className="ai-panel" aria-label="নূর AI সহায়ক">
      <div className="ai-head"><div><strong>নূর AI সহায়ক</strong><span>Gemini দ্বারা পরিচালিত</span></div><button type="button" onClick={() => setOpen(false)} aria-label="AI সহায়ক বন্ধ করুন">×</button></div>
      <div className="ai-messages" aria-live="polite">
        {messages.map((item, index) => <div className={`ai-message ${item.role}`} key={`${item.role}-${index}`}>{item.text}</div>)}
        {loading && <div className="ai-message assistant ai-typing">উত্তর তৈরি হচ্ছে…</div>}<div ref={endRef} />
      </div>
      <p className="ai-note">সংবেদনশীল ব্যক্তিগত তথ্য লিখবেন না। AI-এর উত্তর ভুল হতে পারে।</p>
      <form className="ai-form" onSubmit={submit}>
        <textarea value={message} onChange={(event) => setMessage(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter" && !event.shiftKey) submit(event); }} maxLength={1500} rows={2} placeholder="আপনার প্রশ্ন লিখুন…" aria-label="AI সহায়ককে প্রশ্ন করুন" />
        <button type="submit" disabled={!message.trim() || loading} aria-label="প্রশ্ন পাঠান">➤</button>
      </form>
    </section>}
    <button className="ai-launcher" type="button" onClick={() => setOpen((current) => !current)} aria-expanded={open} aria-label={open ? "AI সহায়ক বন্ধ করুন" : "AI সহায়ক খুলুন"}><span aria-hidden="true">✦</span> {open ? "বন্ধ করুন" : "AI সহায়ক"}</button>
  </div>;
}
