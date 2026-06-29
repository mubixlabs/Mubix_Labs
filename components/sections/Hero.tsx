"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ArrowRight, Sparkles } from "lucide-react";

const ThreeBackground = dynamic(
  () => import("@/components/three/ThreeBackground"),
  {
    ssr: false,
  }
);

export default function Hero() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const headline = "We Build Software That Moves The World Forward";

  // Three.js ko delay se load karne ke liye
  const [showBg, setShowBg] = useState(false);

  useEffect(() => {
    // Text animation
    if (!headlineRef.current) return;

    const words = headlineRef.current.querySelectorAll(".word");

    gsap.fromTo(
      words,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",
        delay: 0.2,
      }
    );

    // Three.js background ko 200ms delay se mount karo
    const timer = setTimeout(() => {
      setShowBg(true);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-[radial-gradient(circle_at_top,_#ffedd5_0%,_#ffffff_60%)] pt-24">
      {/* Hero Three.js Background with delay */}
      <div className="absolute inset-0">
        {showBg && <ThreeBackground />}
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white/70 px-4 py-1.5 text-sm font-medium text-brand-700 backdrop-blur-sm"
        >
          <Sparkles size={14} />
          Building software since day one
        </motion.div>

        <h1
          ref={headlineRef}
          className="text-balance text-4xl font-bold leading-tight tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl"
        >
          {headline.split(" ").map((word, i) => (
            <span key={i} className="word mr-3 inline-block">
              {word}
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mx-auto mt-6 max-w-2xl text-lg text-zinc-600"
        >
          From powerful developer tools to enterprise web solutions Mubix Labs
          delivers innovation that scales.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link
            href="/#services"
            className="group inline-flex items-center gap-2 rounded-full bg-brand-600 px-7 py-3.5 text-sm font-semibold text-white shadow-brand-glow transition-all hover:scale-105 hover:bg-brand-700"
          >
            Explore Our Work
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
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