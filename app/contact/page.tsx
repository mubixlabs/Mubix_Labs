import type { Metadata } from "next";
import Contact from "@/components/sections/Contact";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Mubix Labs tell us about your project and we'll get back to you within a day or two.",
  alternates: { canonical: "https://mubixlabs.studio/contact" },
};

export default function ContactPage() {
  return (
    <div className="pt-24">
      <Contact />
    </div>
  );
}
