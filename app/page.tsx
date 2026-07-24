import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import FeaturedProduct from "@/components/sections/FeaturedProduct";
import CareersPreview from "@/components/sections/CareersPreview";
import FAQ from "@/components/sections/FAQ";
import Contact from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <FeaturedProduct />
      <CareersPreview />
      <FAQ />
      <Contact />
    </>
  );
}
