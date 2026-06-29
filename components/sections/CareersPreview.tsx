"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Users } from "lucide-react";

export default function CareersPreview() {
  return (
    <section className="relative bg-brand-50/40 py-20">
      <div className="mx-auto max-w-5xl px-6 text-center lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-600 text-white shadow-brand-glow">
            <Users size={24} />
          </div>

          <h2 className="mt-6 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
            Join Our Team
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-zinc-600">
            We're a small, fast-moving team that cares about craft, ownership, and shipping
            things that actually matter. If you'd rather build than sit in meetings, you'll
            fit right in.
          </p>

          <Link
            href="/careers"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-600 px-7 py-3.5 text-sm font-semibold text-white shadow-brand-glow transition-all hover:scale-105 hover:bg-brand-700"
          >
            View Open Positions
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}