import type { Metadata } from "next";
import AboutContent from "@/components/sections/AboutContent";
import MeetFounder from "@/components/sections/MeetFounder";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Mubix Labs our story, mission, vision, and the team building software that moves the world forward.",
  alternates: { canonical: "https://mubixlabs.studio/about" },
};

export default function AboutPage() {
  return (
    <>
      <div className="pt-24">
        <AboutContent />
      </div>
      <MeetFounder />
    </>
  );
}