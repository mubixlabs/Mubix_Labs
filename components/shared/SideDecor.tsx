"use client";

import { motion } from "framer-motion";

export default function SideDecor({ side = "left" }: { side?: "left" | "right" }) {
  const position = side === "left" ? "left-6 lg:left-10" : "right-6 lg:right-10";

  return (
    <motion.svg
      viewBox="0 0 100 100"
      className={`pointer-events-none absolute top-1/2 hidden h-32 w-32 -translate-y-1/2 opacity-10 lg:block ${position}`}
      animate={{ rotate: 360 }}
      transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
    >
      <polygon points="50,5 90,30 90,70 50,95 10,70 10,30" fill="none" stroke="#f97316" strokeWidth="1" />
    </motion.svg>
  );
}