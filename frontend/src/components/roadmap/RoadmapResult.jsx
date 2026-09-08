import { motion } from "motion/react";
import { FiTarget, FiClock, FiCheckCircle, FiMap, FiX } from "react-icons/fi";
import ModuleCard from "./ModuleCard";

export default function RoadmapResult({ roadmap, onClear }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Editorial Header Card */}
      <div className="bg-white border border-[#E6E2D8] rounded-3xl p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
        <div className="flex items-start justify-between gap-4 pb-5 mb-5 border-b border-[#E6E2D8]">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full border border-[#E6E2D8] bg-[#F4F1EA] text-[11px] font-semibold text-[#141414]/70 uppercase tracking-wider mb-2">
              <FiCheckCircle size={12} className="text-emerald-600" />
              Tailored Career Syllabus
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#141414]">
              {roadmap.title}
            </h2>
            <p className="text-xs sm:text-sm text-[#141414]/60 mt-1">
              Target Bracket:{" "}
              <span className="font-bold text-[#141414] bg-[#F4F1EA] px-2 py-0.5 rounded border border-[#E6E2D8]">
                {roadmap.package}
              </span>
            </p>
          </div>

          <button
            onClick={onClear}
            className="p-2 rounded-xl border border-[#E6E2D8] text-[#141414]/50 hover:text-[#141414] hover:bg-[#FAF9F5] transition-colors"
            title="Create another roadmap"
          >
            <FiX size={16} />
          </button>
        </div>

        {/* High-Level Overview Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { icon: FiTarget, label: "Proficiency Level", value: roadmap.level || "Intermediate" },
            { icon: FiClock, label: "Estimated Duration", value: roadmap.duration || "8-12 Weeks" },
            {
              icon: FiCheckCircle,
              label: "Curriculum Modules",
              value: `${roadmap.modules?.length || 0} Topics`,
            },
          ].map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="rounded-2xl p-4 bg-[#FAF9F5] border border-[#E6E2D8] flex flex-col justify-between"
            >
              <div className="flex items-center gap-1.5 mb-1.5 text-[#141414]/50">
                <Icon size={13} />
                <span className="text-[11px] font-semibold uppercase tracking-wider">{label}</span>
              </div>
              <p className="text-base font-bold text-[#141414]">{value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Modules List */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs text-[#141414]/60 font-bold uppercase tracking-wider flex items-center gap-2">
            <FiMap size={13} /> Curriculum Breakdown & Interactive Masterclasses
          </p>
          <span className="text-xs text-[#141414]/50">
            {roadmap.modules?.length || 0} Chapters
          </span>
        </div>

        <div className="space-y-3">
          {roadmap.modules?.map((mod, i) => (
            <ModuleCard key={mod.title || i} mod={mod} index={i} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
