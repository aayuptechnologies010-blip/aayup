"use client";

import { motion } from "framer-motion";

interface LoadingScreenProps {
  onFinish?: () => void;
}

export default function LoadingScreen({ onFinish }: LoadingScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white dark:bg-[#173B57] backdrop-blur-2xl overflow-hidden"
    >
      {/* Background Animated Gradient Aura */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.15, 0.35, 0.15],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] rounded-full bg-gradient-to-tr from-[#1769AA] via-[#2D86C9] to-[#0D4F85] blur-3xl opacity-25"
        />
      </div>

      <div className="relative flex flex-col items-center">
        {/* Orbital System Container */}
        <div className="relative w-56 h-56 flex items-center justify-center">
          
          {/* Outer Ring 1: Navy & Black Counter-Clockwise Rotation */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border-[2.5px] border-dashed border-[#173B57]/40 dark:border-black/50"
          />

          {/* Outer Ring 2: Dark Blue & Black Accent Ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
            className="absolute inset-2 rounded-full p-[2px] bg-gradient-to-tr from-[#0D4F85] via-black/70 to-[#173B57]"
          >
            <div className="w-full h-full rounded-full bg-transparent" />
          </motion.div>

          {/* Middle Ring 3: Brand Blue (#1769AA) with Glowing Satellite Nodes */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            className="absolute inset-5 rounded-full border-2 border-[#1769AA]/80 shadow-[0_0_20px_rgba(23,105,170,0.45)]"
          >
            {/* Satellite Node orbiting on ring */}
            <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#2D86C9] shadow-[0_0_10px_#2D86C9]" />
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#173B57] dark:bg-white" />
          </motion.div>

          {/* Inner Ring 4: Light Blue (#2D86C9) Fast Spin */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
            className="absolute inset-9 rounded-full border-[2px] border-t-[#2D86C9] border-r-transparent border-b-[#1769AA] border-l-transparent shadow-[0_0_15px_rgba(45,134,201,0.5)]"
          />

          {/* Center Logo with Breathing ZOOM IN / OUT Effect (NO Rotation on logo) */}
          <motion.div
            animate={{
              scale: [0.92, 1.12, 0.92],
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative z-20 w-32 h-32 rounded-full bg-white dark:bg-[#0D4F85] shadow-[0_12px_40px_rgba(13,79,133,0.35)] p-3 flex items-center justify-center border-2 border-[#2D86C9]/40"
          >
            <img
              src="/logo.webp"
              alt="Aayup Technologies Logo"
              width={105}
              height={105}
              className="object-contain filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.18)]"
            />
          </motion.div>
        </div>

        {/* Company Title & Tagline with Smooth Stagger */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-8 text-center space-y-1.5 z-10"
        >
          <h2 className="text-2xl font-extrabold tracking-tight text-[#0D4F85] dark:text-white">
            Aayup <span className="text-[#2D86C9]">Technologies</span>
          </h2>
          <p className="text-xs uppercase tracking-[0.28em] text-[#173B57]/70 dark:text-white/70 font-semibold">
            Next-Gen Digital Innovations
          </p>
        </motion.div>

        {/* Clean Branded Progress Bar */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 140, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="relative mt-5 h-1.5 w-36 rounded-full bg-[#F3F7FA] dark:bg-white/10 overflow-hidden border border-[#2D86C9]/20"
        >
          <motion.div
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 1.3, repeat: Infinity, ease: "easeInOut" }}
            className="h-full w-1/2 rounded-full bg-gradient-to-r from-[#0D4F85] via-[#1769AA] to-[#2D86C9]"
          />
        </motion.div>
      </div>
    </motion.div>
  );
}