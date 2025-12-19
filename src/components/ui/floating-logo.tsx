import { motion } from "framer-motion";
import logoImage from "@/assets/aayup-logo.webp";

export const FloatingLogo = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
      <motion.div
        className="absolute left-1/2 -translate-x-1/2"
        initial={{ bottom: "-20%", opacity: 0 }}
        animate={{ 
          bottom: "120%",
          opacity: [0, 0.50, 0.50, 0]
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
          opacity: {
            times: [0, 0.15, 0.85, 1],
            duration: 25
          }
        }}
      >
        <img
          src={logoImage}
          alt="Aayup Technologies"
          className="w-72 h-72 md:w-96 md:h-96 object-contain opacity-60 dark:opacity-40"
          style={{ filter: "blur(0.5px)" }}
        />
      </motion.div>
    </div>
  );
};
