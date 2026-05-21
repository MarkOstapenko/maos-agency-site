"use client";

import { motion } from "framer-motion";
import { pageEnter } from "@/lib/motion";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={pageEnter}
    >
      {children}
    </motion.div>
  );
}
