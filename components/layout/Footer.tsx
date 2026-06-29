"use client";

import Link from "next/link";
import Logo from "@/components/shared/Logo";
import SocialIcons from "@/components/shared/SocialIcons";
import { services } from "@/data/services";
import { useServiceNavigation } from "@/components/hooks/useServiceNavigation";

const quickLinks = [
  { label: "About", href: "/about" },
  { label: "Careers", href: "/careers" },
  { label: "Products", href: "/products" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const topServices = services.slice(0, 6);
  const navigateToService = useServiceNavigation();

  return (
    <footer className="border-t border-zinc-800 bg-zinc-900">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="md:col-span-1">
            <Logo light />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-zinc-400">
              We build software that moves the world forward web, mobile, AI, and enterprise solutions.
            </p>
            <SocialIcons className="mt-6" />
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white">Company</h4>
            <ul className="mt-4 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className="text-sm text-zinc-400 transition-colors hover:text-brand-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white">Services</h4>
            <ul className="mt-4 space-y-3">
              {topServices.map((service, index) => (
                <li key={service.title}>
                  <Link
                    href={`/#service-${index}`}
                    onClick={(e) => navigateToService(index, e)}
                    className="text-sm text-zinc-400 transition-colors hover:text-brand-400"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white">Get in touch</h4>
            <ul className="mt-4 space-y-3 text-sm text-zinc-400">
              <li>contact@mubixlabs.studio</li>
              <li>Islamabad, Pakistan</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-zinc-800 pt-8 text-center text-sm text-zinc-500">
          © {year} Mubix Labs. All rights reserved.
        </div>
      </div>
    </footer>
  );
}