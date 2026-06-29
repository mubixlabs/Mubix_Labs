"use client";

import Carousel from "@/components/ui/Carousel";
import ProductCard from "@/components/ui/ProductCard";
import SideDecor from "@/components/shared/SideDecor";
import { products } from "@/data/products";

export default function ProductsContent() {
  return (
    <>
      <section className="relative bg-white/90 backdrop-blur-sm py-20">
        <SideDecor side="left" />
        <SideDecor side="right" />
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
          <span className="text-sm font-semibold uppercase tracking-wide text-brand-600">
            Our Products
          </span>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
            Software we build for ourselves, too
          </h1>
          <p className="mt-6 text-zinc-600 leading-relaxed">
            Alongside client work, we build our own products tools we&apos;d actually want to use ourselves.
          </p>
        </div>
      </section>

      <section className="bg-brand-50/40 py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <Carousel
            items={products}
            keyExtractor={(p) => p.slug}
            renderItem={(product) => <ProductCard product={product} />}
          />
        </div>
      </section>
    </>
  );
}