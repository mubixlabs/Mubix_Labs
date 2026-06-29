import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Code2 } from "lucide-react";
import type { Product } from "@/data/products";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-zinc-100 bg-white p-8 shadow-sm transition-all duration-150 hover:-translate-y-1 hover:border-brand-200 hover:shadow-brand-glow">
      
      {/* Real Product Image */}
      <div className="relative h-40 overflow-hidden rounded-2xl bg-gradient-to-br from-brand-100 to-brand-50">
        <Image
          src="/images/seo-insight-engine.png"
          alt={`${product.name} preview`}
          fill
          className="object-cover transition-transform group-hover:scale-105"
          sizes="(max-width: 768px) 160px, 192px"
        />
      </div>

      <h3 className="mt-6 text-xl font-bold text-zinc-900">{product.name}</h3>
      <p className="mt-1.5 text-sm font-medium text-brand-700">{product.tagline}</p>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-500">{product.description}</p>

      <div className="mt-5 inline-flex w-fit items-center gap-1.5 rounded-full bg-zinc-50 px-3 py-1.5 text-xs font-medium text-zinc-600">
        <Code2 size={12} />
        Works inside VS Code
      </div>

      <div className="mt-6 flex gap-3">
        <Link
          href={product.learnMoreUrl}
          className="inline-flex items-center gap-1.5 rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-105 hover:bg-brand-700"
        >
          Learn More
          <ArrowUpRight size={14} />
        </Link>
        <Link
          href={product.licenseUrl}
          className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 px-5 py-2.5 text-sm font-semibold text-zinc-800 transition-transform hover:scale-105 hover:border-brand-300"
        >
          Get License
        </Link>
      </div>
    </div>
  );
}