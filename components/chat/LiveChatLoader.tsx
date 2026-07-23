"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const LiveChat = dynamic(() => import("@/components/chat/LiveChat"), {
  ssr: false,
});

export default function LiveChatLoader() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setMounted(true), 3000);
    return () => clearTimeout(id);
  }, []);

  return mounted ? <LiveChat /> : null;
}
