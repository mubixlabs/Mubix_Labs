"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

const headline = "We Build Software That Moves The World Forward";
const words = headline.split(" ");

export default function Hero() {
  return (
    <section
      className="relative flex min-h-screen items-center overflow-hidden pt-24"
      style={{ background: "radial-gradient(circle at top, #ffedd5 0%, #ffffff 60%)" }}
    >
      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white/70 px-4 py-1.5 text-sm font-medium text-brand-700 backdrop-blur-sm"
        >
          <Sparkles size={14} />
          Building software since day one
        </motion.div>

        <h1 className="text-balance text-4xl font-bold leading-tight tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl">
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.06 }}
              className="mr-3 inline-block"
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mx-auto mt-6 max-w-2xl text-lg text-zinc-600"
        >
          From powerful developer tools to enterprise web solutions — Mubix Labs delivers innovation that scales.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link
            href="/#services"
            className="group inline-flex items-center gap-2 rounded-full bg-brand-600 px-7 py-3.5 text-sm font-semibold text-white shadow-brand-glow transition-all hover:scale-105 hover:bg-brand-700"
          >
            Explore Our Work
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-7 py-3.5 text-sm font-semibold text-zinc-800 transition-all hover:scale-105 hover:border-brand-300"
          >
            Get In Touch
          </Link>
        </motion.div>
      </div>
    </section>
  );
}