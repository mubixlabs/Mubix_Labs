import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import FeaturedProduct from "@/components/sections/FeaturedProduct";
import MeetFounder from "@/components/sections/MeetFounder";
import CareersPreview from "@/components/sections/CareersPreview";
import Contact from "@/components/sections/Contact";
import FAQ from "@/components/sections/FAQ";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <FeaturedProduct />
      <MeetFounder />
      <CareersPreview />
      <FAQ />
      <Contact />
    </>
  );
}