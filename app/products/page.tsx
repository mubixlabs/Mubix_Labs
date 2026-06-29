import type { Metadata } from "next";
import ProductsContent from "@/components/sections/ProductsContent";
import { products } from "@/data/products";

export const metadata: Metadata = {
  title: "Products",
  description: "Explore the software products built by Mubix Labs.",
  alternates: { canonical: "https://mubixlabs.studio/products" },
};

export default function ProductsPage() {
  const featured = products.find((p) => p.featured);

  const jsonLd = featured
    ? {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: featured.name,
        description: featured.description,
        applicationCategory: "DeveloperApplication",
        operatingSystem: "Any",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
      }
    : null;

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
        <div className="pt-24">
      <ProductsContent />
      </div>
    </>
  );
}