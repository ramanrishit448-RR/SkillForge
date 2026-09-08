import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  FiClock,
  FiChevronDown,
  FiChevronUp,
  FiYoutube,
  FiBookOpen,
} from "react-icons/fi";

const difficultyBadges = {
  Easy: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Medium: "bg-amber-50 text-amber-700 border-amber-200",
  Hard: "bg-red-50 text-red-700 border-red-200",
};

const statusStyles = {
  Completed: "bg-emerald-50 text-emerald-700 border-emerald-200",
  "In Progress": "bg-indigo-50 text-indigo-700 border-indigo-200",
  Pending: "bg-[#FAF9F5] text-[#141414]/50 border-[#E6E2D8]",
};

export default function ModuleCard({ mod, index }) {
  const [open, setOpen] = useState(false);

  const formattedIndex = index < 9 ? `0${index + 1}` : `${index + 1}`;

  return (
    <div
      onClick={() => setOpen(!open)}
      className="bg-white border border-[#E6E2D8] rounded-2xl cursor-pointer select-none shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:border-[#141414]/35 transition-all overflow-hidden"
    >
      <div className="flex items-center justify-between p-4 sm:p-5 gap-3">
        <div className="flex items-center gap-3.5 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-[#FAF9F5] border border-[#E6E2D8] flex items-center justify-center text-xs font-mono font-bold text-[#141414] shrink-0">
            {formattedIndex}
          </div>

          <div className="min-w-0">
            <h3 className="text-sm font-bold text-[#141414] truncate">{mod.title}</h3>
            <div className="flex items-center gap-2 mt-0.5 text-xs text-[#141414]/50">
              <span className="flex items-center gap-1">
                <FiClock size={11} /> {mod.duration}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span
            className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${
              statusStyles[mod.status] || statusStyles.Pending
            }`}
          >
            {mod.status || "Planned"}
          </span>

          <span
            className={`hidden sm:inline-block text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${
              difficultyBadges[mod.difficulty] || difficultyBadges.Medium
            }`}
          >
            {mod.difficulty}
          </span>

          <div className="w-7 h-7 rounded-lg border border-[#E6E2D8] flex items-center justify-center text-[#141414]/50">
            {open ? <FiChevronUp size={14} /> : <FiChevronDown size={14} />}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden bg-[#FAF9F5]/60 border-t border-[#E6E2D8]"
          >
            <div className="p-4 sm:p-5">
              <p className="text-xs sm:text-sm text-[#141414]/75 leading-relaxed mb-4">
                {mod.description}
              </p>

              <div className="flex items-center gap-2.5 flex-wrap">
                {mod.youtube && (
                  <a
                    href={mod.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      type="button"
                      className="inline-flex items-center gap-1.5 text-xs px-3.5 py-2 rounded-xl border border-red-200 text-red-700 bg-red-50 hover:bg-red-100 font-semibold transition-all shadow-sm"
                    >
                      <FiYoutube size={14} className="text-red-600" />
                      <span>Watch Tutorial</span>
                    </button>
                  </a>
                )}

                {mod.article && (
                  <a
                    href={mod.article}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      type="button"
                      className="inline-flex items-center gap-1.5 text-xs px-3.5 py-2 rounded-xl border border-[#E6E2D8] text-[#141414] bg-white hover:bg-[#FAF9F5] font-semibold transition-all shadow-sm"
                    >
                      <FiBookOpen size={14} />
                      <span>Read Documentation</span>
                    </button>
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
