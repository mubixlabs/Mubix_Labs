"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import SocialIcons from "@/components/shared/SocialIcons";
import { personalSocialLinks } from "@/data/personalSocials";

function FounderAvatar() {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="relative flex h-40 w-40 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-4xl font-bold text-white shadow-brand-glow sm:h-48 sm:w-48">
        MM
      </div>
    );
  }

  return (
    <div className="relative h-40 w-40 flex-shrink-0 overflow-hidden rounded-2xl sm:h-48 sm:w-48">
      <Image
        src="/images/founder.png"
        alt="Muhammad Mubeen | Founder & CEO, Mubix Labs"
        fill
       className="object-cover object-[center_20%]"
       sizes="(max-width: 768px) 160px, 192px"
        onError={() => setFailed(true)}
      />
    </div>
  );
}

export default function MeetFounder() {
  return (
    <section className="relative bg-white/90 backdrop-blur-sm py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wide text-brand-600">
            The Person Behind Mubix Labs
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
            Meet the Founder
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mt-14 flex max-w-4xl flex-col items-center gap-10 rounded-3xl border border-zinc-100 bg-white p-8 shadow-sm sm:p-12 lg:flex-row lg:items-start"
        >
          <FounderAvatar />

          <div className="flex-1 text-center lg:text-left">
            <h3 className="text-2xl font-bold text-zinc-900">Muhammad Mubeen</h3>
            <p className="mt-1 text-sm font-medium text-brand-600">Founder & CEO, Mubix Labs</p>

            <p className="mt-5 text-zinc-600 leading-relaxed">
              Muhammad Mubeen is a full-stack developer and entrepreneur passionate about
              building developer tools and software solutions that solve real-world problems.
              He founded Mubix Labs with a vision to create world-class software products and
              services.
            </p>

            <div className="mt-7 flex flex-col items-center gap-5 lg:flex-row lg:justify-between">
              <SocialIcons links={personalSocialLinks} />

              <a
                href="mailto:mubeen@mubixlabs.studio?subject=Hello Mubeen"
                className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:scale-105 hover:bg-brand-700"
              >
                <Mail size={16} className="shrink-0" />
                Get in Touch with Me
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}