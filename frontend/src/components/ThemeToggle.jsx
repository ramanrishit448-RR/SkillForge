import React from "react";
import { FiSun, FiMoon } from "react-icons/fi";
import { motion } from "motion/react";
import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle({ compact = true, className = "" }) {
  const { isDark, toggleTheme } = useTheme();

  if (compact) {
    return (
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={toggleTheme}
        type="button"
        aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
        title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
        className={`relative w-8 h-8 rounded-full flex items-center justify-center transition-colors border ${
          isDark
            ? "bg-[#1E2230] border-white/10 text-amber-300 hover:text-amber-200 hover:border-white/20"
            : "bg-[#FAF9F5] border-[#E6E2D8] text-[#141414]/70 hover:text-[#141414] hover:border-[#141414]/30 shadow-xs"
        } ${className}`}
      >
        <motion.div
          key={isDark ? "dark" : "light"}
          initial={{ rotate: -45, opacity: 0, scale: 0.7 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 45, opacity: 0, scale: 0.7 }}
          transition={{ duration: 0.2 }}
        >
          {isDark ? <FiSun size={15} /> : <FiMoon size={15} />}
        </motion.div>
      </motion.button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl border text-xs font-medium transition-all ${
        isDark
          ? "bg-[#161822] border-white/10 text-white/80 hover:text-white hover:bg-white/5"
          : "bg-[#FAF9F5] border-[#E6E2D8] text-[#141414]/80 hover:text-[#141414] hover:bg-[#141414]/5"
      } ${className}`}
    >
      <div className="flex items-center gap-2">
        {isDark ? (
          <FiSun className="text-amber-400" size={15} />
        ) : (
          <FiMoon className="text-[#141414]/60" size={15} />
        )}
        <span>{isDark ? "Light Mode" : "Dark Mode"}</span>
      </div>
      <span
        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
          isDark
            ? "bg-amber-400/10 text-amber-300 border-amber-400/20"
            : "bg-black/5 text-black/60 border-black/10"
        }`}
      >
        {isDark ? "Dark ON" : "Light ON"}
      </span>
    </button>
  );
}
