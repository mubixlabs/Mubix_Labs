"use client";
{/*"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useIsMobile } from "@/components/hooks/useIsMobile";

const ThreeBackground = dynamic(() => import("@/components/three/ThreeBackground"), {
  ssr: false,
});

const EXCLUDED_ROUTES = ["/", "/contact"];

export default function GlobalBackground() {
  const pathname = usePathname();
  const isMobile = useIsMobile();

  if (EXCLUDED_ROUTES.includes(pathname)) return null;

  return (
    <div className="fixed inset-0 -z-10 opacity-30">
      <ThreeBackground mobile={isMobile} />
    </div>
  );
}*/}



export default function GlobalBackground() {
  return null;
}