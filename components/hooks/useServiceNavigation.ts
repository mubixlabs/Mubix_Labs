"use client";

import { useRouter, usePathname } from "next/navigation";

export function useServiceNavigation() {
  const router = useRouter();
  const pathname = usePathname();

  return (index: number, e: React.MouseEvent) => {
    e.preventDefault();
    const hash = `service-${index}`;

    if (pathname === "/") {
      window.history.replaceState(null, "", `/#${hash}`);
      const target = document.getElementById(hash);
      target?.scrollIntoView({ behavior: "smooth", block: "start" });
      window.dispatchEvent(new CustomEvent("service-highlight", { detail: index }));
    } else {
      router.push(`/#${hash}`);
    }
  };
}