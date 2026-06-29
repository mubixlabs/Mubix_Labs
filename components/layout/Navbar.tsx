"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Logo from "@/components/shared/Logo";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/#services" },
  { label: "Products", href: "/products" },
  { label: "Careers", href: "/careers" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
  }, [mobileOpen]);

  const handleNavClick = (href: string, e: React.MouseEvent) => {
    const [path, hash] = href.split("#");
    const targetPath = path || "/";

    if (pathname === targetPath) {
      e.preventDefault();
      if (hash) {
        const target = document.getElementById(hash);
        target?.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-white/70 backdrop-blur-xl shadow-sm border-b border-brand-100"
          : "bg-zinc-900"
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <Logo light={!scrolled} />

        <div className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(link.href, e)}
              className={cn(
                "text-sm font-medium transition-colors duration-300",
                scrolled ? "text-zinc-600 hover:text-brand-600" : "text-zinc-300 hover:text-brand-400"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden lg:block">
          <Link
            href="/contact"
            className="rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-brand-glow transition-transform hover:scale-105 hover:bg-brand-700"
          >
            Start a Project
          </Link>
        </div>

        <button
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
          className={cn(
            "rounded-full p-1.5 transition-colors duration-300 lg:hidden",
            scrolled ? "text-zinc-700 hover:bg-brand-50 hover:text-brand-600" : "text-white hover:bg-white/10 hover:text-brand-400"
          )}
        >
          <Menu size={26} />
        </button>
      </nav>

      {mobileOpen && (
        <div className="fixed inset-0 z-[100] flex h-screen w-screen flex-col bg-white lg:hidden">
          <div className="flex items-center justify-between px-6 py-4">
            <Logo />
            <button
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
              className="rounded-full p-1.5 text-zinc-700 transition-colors hover:bg-brand-50 hover:text-brand-600"
            >
              <X size={26} />
            </button>
          </div>

          <div className="flex flex-1 flex-col gap-1 overflow-y-auto px-6 py-4 pb-[max(2rem,env(safe-area-inset-bottom))]">
            {navLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  href={link.href}
                  onClick={(e) => {
                    handleNavClick(link.href, e);
                    setMobileOpen(false);
                  }}
                  className="block rounded-xl px-3 py-3 text-lg font-medium text-zinc-800 transition-colors hover:bg-brand-50 hover:text-brand-600 active:bg-brand-50 active:text-brand-600"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}

            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="mt-4 rounded-full bg-brand-600 px-5 py-3 text-center text-base font-semibold text-white transition-colors hover:bg-brand-700 active:bg-brand-700"
            >
              Start a Project
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}