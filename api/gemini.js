import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `You are NoorNikah's AI assistant for a Bangladeshi halal matrimony platform.
Reply in the same language as the user, using clear and respectful language.
Help only with using NoorNikah, profile writing, marriage preparation, safety, privacy, and general Islamic marriage etiquette.
Do not claim to be a scholar, lawyer, doctor, or human matchmaker. For religious rulings, legal, medical, crisis, or abuse concerns, recommend an appropriate qualified professional.
Never request or expose passwords, OTPs, NID numbers, phone numbers, addresses, financial information, or other sensitive personal data.
Do not rank a person's worth, infer sensitive traits, or promise compatibility or marriage outcomes.
Keep answers concise and practical.`;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "শুধু POST request গ্রহণ করা হয়।" });
  }
  if (!process.env.GEMINI_API_KEY) {
    return res.status(503).json({ error: "Gemini API key এখনো server-এ configure করা হয়নি।" });
  }

  const message = typeof req.body?.message === "string" ? req.body.message.trim() : "";
  if (!message) return res.status(400).json({ error: "একটি প্রশ্ন লিখুন।" });
  if (message.length > 1500) return res.status(400).json({ error: "প্রশ্নটি ১৫০০ অক্ষরের মধ্যে রাখুন।" });

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const response = await ai.models.generateContent({
      model: process.env.GEMINI_MODEL || "gemini-3.5-flash",
      contents: message,
      config: { systemInstruction: SYSTEM_INSTRUCTION, temperature: 0.4, maxOutputTokens: 700 },
    });
    const text = response.text?.trim();
    if (!text) throw new Error("Empty Gemini response");
    return res.status(200).json({ text });
  } catch (error) {
    console.error("Gemini request failed:", error?.message || error);
    return res.status(502).json({ error: "AI সহায়ক এখন উত্তর দিতে পারছে না। একটু পরে আবার চেষ্টা করুন।" });
  }
}
