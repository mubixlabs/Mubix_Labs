"use client";

import { useEffect, useState } from "react";
import * as Icons from "lucide-react";
import Carousel from "@/components/ui/Carousel";
import { cn } from "@/lib/utils";
import { services, type Service } from "@/data/services";

function ServiceCard({
  service,
  index,
  highlighted,
}: {
  service: Service;
  index: number;
  highlighted: boolean;
}) {
  const Icon = (Icons[service.icon as keyof typeof Icons] ??
    Icons.Sparkles) as React.ComponentType<{ size?: number; className?: string }>;

  return (
    <div
      id={`service-${index}`}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-white p-7 shadow-sm transition-all duration-150 hover:-translate-y-1 hover:border-brand-200 hover:shadow-brand-glow",
        highlighted ? "border-brand-400 ring-2 ring-brand-300 shadow-brand-glow" : "border-zinc-100"
      )}
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-brand-50 to-transparent opacity-0 transition-opacity duration-150 group-hover:opacity-100" />

      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-colors duration-150 group-hover:bg-brand-600 group-hover:text-white">
        <Icon size={22} />
      </div>

      <h3 className="mt-5 text-lg font-semibold text-zinc-900">{service.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-500">{service.description}</p>
    </div>
  );
}

export default function Services() {
  const [highlightIndex, setHighlightIndex] = useState<number | null>(null);

 useEffect(() => {
  const applyHash = () => {
    const match = window.location.hash.match(/^#?service-(\d+)$/);
    if (match) {
      const index = parseInt(match[1], 10);
      setHighlightIndex(index);
      setTimeout(() => setHighlightIndex(null), 2500);
    }
  };

  const timeout = setTimeout(applyHash, 350);

  const onHighlight = (e: Event) => {
    const index = (e as CustomEvent).detail;
    setHighlightIndex(index);
    setTimeout(() => setHighlightIndex(null), 2500);
  };
  window.addEventListener("service-highlight", onHighlight);

  return () => {
    clearTimeout(timeout);
    window.removeEventListener("service-highlight", onHighlight);
  };
}, []);
  return (
    <section id="services" className="relative bg-white/90 backdrop-blur-sm py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wide text-brand-600">
            What we do
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
            Software solutions built end-to-end
          </h2>
          <p className="mt-4 text-zinc-600">
            From the first line of code to production-grade infrastructure we cover every layer your product needs.
          </p>
        </div>

        <div className="mt-16">
          <Carousel
            items={services}
            keyExtractor={(s) => s.title}
            scrollToIndex={highlightIndex}
            renderItem={(service, index) => (
              <ServiceCard service={service} index={index} highlighted={highlightIndex === index} />
            )}
          />
        </div>
      </div>
    </section>
  );
}