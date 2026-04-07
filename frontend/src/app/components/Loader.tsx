import { motion } from "framer-motion";

export function Loader() {
  return (
    <motion.div
      className="fixed inset-0 bg-white z-[9999] flex items-center justify-center"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 1.2, duration: 0.6 }}
    >
      <motion.h1
        initial={{ opacity: 0, letterSpacing: "0.5em" }}
        animate={{ opacity: 1, letterSpacing: "0.1em" }}
        transition={{ duration: 1 }}
        className="text-[#2B2B2B] text-xl tracking-[0.2em]"
      >
        KAPADNEKAR
      </motion.h1>
    </motion.div>
  );
}