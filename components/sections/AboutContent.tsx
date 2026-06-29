"use client";

import { motion } from "framer-motion";
import { Target, Eye, Rocket, ShieldCheck, Users, Sparkles } from "lucide-react";
import SideDecor from "@/components/shared/SideDecor";

const values = [
  {
    icon: Rocket,
    title: "Move with purpose",
    description: "We ship fast, but never at the cost of quality. Every release earns its place.",
  },
  {
    icon: ShieldCheck,
    title: "Build to last",
    description: "Code that's secure, maintainable, and built for the long run not just a demo.",
  },
  {
    icon: Users,
    title: "Client-first thinking",
    description: "We treat every project like it's our own product, not just a line item.",
  },
  {
    icon: Sparkles,
    title: "Stay curious",
    description: "New tools, new techniques we're always learning so our work doesn't go stale.",
  },
];

export default function AboutContent() {
  return (
    <>
      {/* Story */}
      <section className="bg-white/90 backdrop-blur-sm py-20">
        <SideDecor side="left" />
        <SideDecor side="right" />
        
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
          {/* Motion hata diya - ab plain div (redundant animation avoid) */}
          <div>
            <span className="text-sm font-semibold uppercase tracking-wide text-brand-600">
              Our Story
            </span>

            <h1 className="mt-3 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
              Why we started Mubix Labs
            </h1>

            <p className="mt-6 text-zinc-600 leading-relaxed">
              Mubix Labs started with a simple idea software should be built
              properly, not just shipped quickly. What began as a single developer
              solving real problems for real clients has grown into a software house
              that handles everything from web and mobile apps to AI-powered systems
              and enterprise solutions. We're still small by choice, because it lets
              us care about every project the same way we did the first one.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-brand-50/40 py-20">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-3xl border border-zinc-100 bg-white p-8 shadow-sm sm:p-10"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <Target size={22} />
              </div>
              <h3 className="mt-5 text-xl font-bold text-zinc-900">Our Mission</h3>
              <p className="mt-3 text-zinc-600 leading-relaxed">
                To build reliable, well-engineered software that helps businesses and individuals
                solve real problems without the bloat, delays, or excuses.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-3xl border border-zinc-100 bg-white p-8 shadow-sm sm:p-10"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <Eye size={22} />
              </div>
              <h3 className="mt-5 text-xl font-bold text-zinc-900">Our Vision</h3>
              <p className="mt-3 text-zinc-600 leading-relaxed">
                To grow into a software house known for both our client work and our own
                products a team people trust the moment they hear the name Mubix Labs.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-white/90 backdrop-blur-sm py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wide text-brand-600">
              How we work
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
              Our values
            </h2>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
               className="rounded-2xl border-2 border-zinc-200 p-6 text-center transition-all hover:-translate-y-1 hover:border-brand-400 hover:shadow-sm"
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <value.icon size={20} />
                </div>
                <h4 className="mt-4 font-semibold text-zinc-900">{value.title}</h4>
                <p className="mt-2 text-sm text-zinc-500">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}