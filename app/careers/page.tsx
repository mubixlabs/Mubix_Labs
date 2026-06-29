import type { Metadata } from "next";
import CareersContent from "@/components/sections/CareersContent";

export const metadata: Metadata = {
  title: "Careers",
  description: "Join Mubix Labs explore open positions and apply to work with our team.",
  alternates: { canonical: "https://mubixlabs.studio/careers" },
};

export default function CareersPage() {
  return (
    <div className="pt-24">
      <CareersContent />
    </div>
  );
}