"use client";

import dynamic from "next/dynamic";

const LiveChat = dynamic(() => import("@/components/chat/LiveChat"), {
  ssr: false,
});

export default function LiveChatLoader() {
  return <LiveChat />;
}