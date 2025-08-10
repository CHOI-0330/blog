"use client";

import { motion } from "framer-motion";

export default function AnimatedTitle({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.h1
      layoutId="hero-title"
      className={className}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
    >
      {children}
    </motion.h1>
  );
}
