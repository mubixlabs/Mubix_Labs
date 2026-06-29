export interface Product {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  featured: boolean;
  learnMoreUrl: string;
  licenseUrl: string;
}

export const products: Product[] = [
  {
    slug: "seo-insight-engine",
    name: "SEO Insight Engine",
    tagline: "Real-time SEO analysis, right inside your editor",
    description:
      "SEO Insight Engine scans your codebase for technical SEO issues, missing meta tags, broken structured data, and Core Web Vitals red flags surfacing fixes before you ship, not after Google notices.",
    featured: true,
    learnMoreUrl: "#",
    licenseUrl: "#",
  },
];