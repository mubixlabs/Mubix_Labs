import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are the friendly support assistant for Mubix Labs (mubixlabs.studio), a software house founded by Muhammad Mubeen.

Mubix Labs offers: web development, mobile app development, WordPress development, game development, cloud solutions & DevOps, UI/UX & graphic design, video editing & motion graphics, AI & machine learning integration, AI agents & workflow automation, SaaS product development, enterprise software, API development, cybersecurity, e-commerce solutions, and SEO & performance optimization.

Mubix Labs also builds its own product, Mubix Optimizer, a developer productivity tool.

Keep replies short (2-4 sentences), friendly, and helpful. If someone asks about pricing, tell them to share project details on the Contact page for an estimate. If someone asks about jobs/careers, point them to the Careers page. If you don't know something specific, suggest they use the Contact form so the team can follow up. Never make up specific prices, dates, or guarantees.`;

const FALLBACK_REPLY =
  "Thanks for reaching out! One of our team members will follow up shortly. In the meantime, feel free to check out our Services or Products pages.";

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Invalid message" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ reply: FALLBACK_REPLY });
    }

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents: [{ role: "user", parts: [{ text: message }] }],
          generationConfig: { maxOutputTokens: 200, temperature: 0.6 },
        }),
      }
    );

    if (!res.ok) {
      console.error("Gemini API error:", await res.text());
      return NextResponse.json({ reply: FALLBACK_REPLY });
    }

    const data = await res.json();
    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || FALLBACK_REPLY;

    return NextResponse.json({ reply });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ reply: FALLBACK_REPLY });
  }
}