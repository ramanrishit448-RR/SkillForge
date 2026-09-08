import { motion } from "motion/react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

function CustomTooltip({ active, payload }) {
  if (active && payload?.length) {
    return (
      <div className="bg-[#141414] text-white border border-[#141414] rounded-xl px-3 py-1.5 text-xs shadow-xl">
        <p className="text-white/60 text-[10px] mb-0.5">{payload[0]?.payload?.skill}</p>
        <p className="font-bold">{payload[0]?.value}%</p>
      </div>
    );
  }
  return null;
}

function RadarCard({ title, data, color = "#141414", index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.15 + index * 0.08 }}
      whileHover={{ y: -2 }}
      className="bg-white border border-[#E6E2D8] rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:border-[#141414]/30 transition-all"
    >
      <div className="flex items-center justify-between pb-3 mb-2 border-b border-[#E6E2D8]/60">
        <h3 className="text-xs sm:text-sm font-bold text-[#141414]">{title}</h3>
        <span className="text-[10px] font-semibold text-[#141414]/50 bg-[#F4F1EA] px-2 py-0.5 rounded border border-[#E6E2D8]">
          Competency Radar
        </span>
      </div>

      <div className="w-full">
        <ResponsiveContainer width="100%" height={200}>
          <RadarChart data={data} cx="50%" cy="50%" outerRadius="68%">
            <PolarGrid stroke="#E6E2D8" gridType="circle" />
            <PolarAngleAxis
              dataKey="skill"
              tick={{ fill: "#141414", fontSize: 10, fontWeight: 500 }}
            />
            <Radar
              name={title}
              dataKey="score"
              stroke={color}
              fill={color}
              fillOpacity={0.12}
              strokeWidth={2}
              dot={{ r: 3, fill: color, strokeWidth: 0 }}
            />
            <Tooltip content={<CustomTooltip />} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}

export default function InterviewGraph({
  technicalData,
  behaviouralData,
  technicalCount,
  hrCount,
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <RadarCard
        title={`Technical Performance (${technicalCount || 0})`}
        data={technicalData}
        color="#141414"
        index={0}
      />
      <RadarCard
        title={`HR & Behavioral Performance (${hrCount || 0})`}
        data={behaviouralData}
        color="#4B5563"
        index={1}
      />
    </div>
  );
}
