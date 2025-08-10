"use client";

import { motion } from "framer-motion";

export default function AnimatedSubtitle({
  children,
  delay = 0.6,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.p
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay,
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </motion.p>
  );
}
