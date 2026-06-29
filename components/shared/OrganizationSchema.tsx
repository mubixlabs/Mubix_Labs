import { socialLinks } from "@/data/socials";

export default function OrganizationSchema() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Mubix Labs",
    url: "https://mubixlabs.studio",
    logo: "https://mubixlabs.studio/logo.png",
    description:
      "Mubix Labs builds developer tools, web platforms, mobile apps, and enterprise software solutions that scale.",
    founder: {
      "@type": "Person",
      name: "Muhammad Mubeen",
      jobTitle: "Founder & CEO",
    },
    sameAs: socialLinks
      .filter((link) => link.platform !== "gmail")
      .map((link) => link.url),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}