"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import SocialIcons from "@/components/shared/SocialIcons";

const ThreeBackground = dynamic(
  () => import("@/components/three/ThreeBackground"),
  { ssr: false }
);

type Status = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    try {
      await addDoc(collection(db, "contacts"), {
        ...form,
        createdAt: serverTimestamp(),
      });
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden bg-white/90 backdrop-blur-sm py-20">
      {/* Three.js Background */}
      <div className="absolute inset-0 opacity-40">
        <ThreeBackground />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wide text-brand-600">
            Get In Touch
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
            Let's build something together
          </h2>
          <p className="mt-4 text-zinc-600">
            Tell us a bit about your project we usually reply within a day or two.
          </p>
        </div>

        <div className="mx-auto mt-14 max-w-2xl rounded-3xl border border-zinc-100 bg-white p-8 shadow-sm sm:p-10">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
            <label htmlFor="name" className="text-sm font-bold text-zinc-900">
  Name
</label>
              <input
                id="name"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                placeholder="Your full name"
                className="mt-1.5 w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm outline-none transition-colors focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
              />
            </div>
            <div>
              <label htmlFor="email" className="text-sm font-bold text-zinc-900">
  Email
</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="you@company.com"
                className="mt-1.5 w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm outline-none transition-colors focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
              />
            </div>
            <div>
            <label htmlFor="message" className="text-sm font-bold text-zinc-900">
  Message
</label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={form.message}
                onChange={handleChange}
                placeholder="Tell us about your project..."
                className="mt-1.5 w-full resize-none rounded-xl border border-zinc-200 px-4 py-3 text-sm outline-none transition-colors focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
              />
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-brand-700 disabled:opacity-60"
            >
              {status === "loading" ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send size={16} />
                  Send Message
                </>
              )}
            </button>

            {status === "success" && (
              <p className="flex items-center gap-2 text-sm font-medium text-green-600">
                <CheckCircle2 size={16} />
                Message sent! We'll get back to you soon.
              </p>
            )}
            {status === "error" && (
              <p className="flex items-center gap-2 text-sm font-medium text-red-600">
                <AlertCircle size={16} />
                Something went wrong. Please try again.
              </p>
            )}
          </form>

          <div className="mt-8 border-t border-zinc-100 pt-6 text-center">
            <p className="text-sm text-zinc-500">Or find us here</p>
            <div className="mt-3 flex justify-center">
              <SocialIcons />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}