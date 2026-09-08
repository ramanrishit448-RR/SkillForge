import { motion } from "motion/react";

export default function StatBox({ label, value, sub, subHighlight, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
      whileHover={{ y: -2 }}
      className="bg-white border border-[#E6E2D8] rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:border-[#141414]/30 transition-all"
    >
      <div>
        <p className="text-[#141414]/50 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider mb-1">
          {label}
        </p>
        <p className="text-2xl sm:text-3xl font-extrabold text-[#141414] tracking-tight">
          {value ?? 0}
        </p>
      </div>

      {sub && (
        <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-[#E6E2D8]/60 flex-wrap">
          {subHighlight && (
            <span className="text-[10px] font-semibold bg-[#F4F1EA] text-[#141414] px-2 py-0.5 rounded border border-[#E6E2D8]">
              {subHighlight}
            </span>
          )}
          <span className="text-[#141414]/50 text-[10px] sm:text-xs">{sub}</span>
        </div>
      )}
    </motion.div>
  );
}
