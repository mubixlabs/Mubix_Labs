"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import SideDecor from "@/components/shared/SideDecor";
import { products } from "@/data/products";
import Image from "next/image";

export default function FeaturedProduct() {
  const featured = products.find((p) => p.featured);
  if (!featured) return null;

  return (
    <section className="relative bg-gradient-to-b from-white to-brand-50/40 py-20">
      <SideDecor side="left" />
      <SideDecor side="right" />
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wide text-brand-600">
            Featured Product
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
            Built by us, used by developers
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto mt-14 max-w-4xl overflow-hidden rounded-3xl border border-brand-100 bg-white p-10 shadow-xl shadow-brand-100/50 sm:p-14"
        >
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand-100 blur-3xl" />

          <div className="relative z-10 flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
                Featured Product
              </span>

              <h3 className="mt-4 text-2xl font-bold text-zinc-900 sm:text-3xl">
                {featured.name}
              </h3>
              <p className="mt-2 text-base font-medium text-brand-700">{featured.tagline}</p>
              <p className="mt-4 text-zinc-600">{featured.description}</p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href={featured.learnMoreUrl}
                  className="inline-flex items-center gap-1.5 rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-105 hover:bg-brand-700"
                >
                  Learn More
                  <ArrowUpRight size={15} />
                </Link>
                <Link
                  href={featured.licenseUrl}
                  className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 px-6 py-3 text-sm font-semibold text-zinc-800 transition-transform hover:scale-105 hover:border-brand-300"
                >
                  Get License
                </Link>
              </div>
            </div>

           <div className="relative h-48 w-full max-w-xs overflow-hidden rounded-2xl bg-gradient-to-br from-brand-100 to-brand-50 lg:h-56">
              <Image
                src="/images/seo-insight-engine.png"
                alt={`${featured.name} preview`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 400px"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}