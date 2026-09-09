import { motion } from "motion/react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useTheme } from "../context/ThemeContext";

const DEFAULT_SKILLS = [
  { skill: "Correctness", score: 0 },
  { skill: "Clarity", score: 0 },
  { skill: "Relevance", score: 0 },
  { skill: "Detail", score: 0 },
  { skill: "Efficiency", score: 0 },
  { skill: "Communication", score: 0 },
  { skill: "Problem solving", score: 0 },
  { skill: "Creativity", score: 0 },
];

function CustomTooltip({ active, payload }) {
  if (active && payload?.length) {
    return (
      <div className="bg-[#141414] dark:bg-[#1A1E2B] text-white border border-[#141414] dark:border-white/10 rounded-xl px-3 py-1.5 text-xs shadow-xl">
        <p className="text-white/60 text-[10px] mb-0.5">{payload[0]?.payload?.skill}</p>
        <p className="font-bold">{payload[0]?.value}%</p>
      </div>
    );
  }
  return null;
}

function RadarCard({ title, data, color, darkColor, index }) {
  const { isDark } = useTheme();
  const strokeColor = isDark ? (darkColor || "#E05A3E") : (color || "#141414");
  const chartData = (data && data.length > 0) ? data : DEFAULT_SKILLS;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.15 + index * 0.08 }}
      whileHover={{ y: -2 }}
      className="bg-white dark:bg-[#12141C] border border-[#E6E2D8] dark:border-[#222634] rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-[0_2px_10px_rgba(0,0,0,0.02)] dark:shadow-[0_2px_10px_rgba(0,0,0,0.3)] hover:border-[#141414]/30 dark:hover:border-white/20 transition-all"
    >
      <div className="flex items-center justify-between pb-3 mb-2 border-b border-[#E6E2D8]/60 dark:border-[#222634]">
        <h3 className="text-xs sm:text-sm font-bold text-[#141414] dark:text-white">{title}</h3>
        <span className="text-[10px] font-semibold text-[#141414]/50 dark:text-white/60 bg-[#F4F1EA] dark:bg-[#1C202C] px-2 py-0.5 rounded border border-[#E6E2D8] dark:border-[#222634]">
          Competency Radar
        </span>
      </div>

      <div className="w-full">
        <ResponsiveContainer width="100%" height={210}>
          <RadarChart key={isDark ? "radar-dark" : "radar-light"} data={chartData} cx="50%" cy="50%" outerRadius="68%">
            <PolarGrid stroke={isDark ? "#2A2E3D" : "#E6E2D8"} gridType="circle" />
            <PolarAngleAxis
              dataKey="skill"
              tick={{ fill: isDark ? "#CBD5E1" : "#141414", fontSize: 10, fontWeight: 500 }}
            />
            <Radar
              name={title}
              dataKey="score"
              stroke={strokeColor}
              fill={strokeColor}
              fillOpacity={isDark ? 0.25 : 0.12}
              strokeWidth={2}
              dot={{ r: 3, fill: strokeColor, strokeWidth: 0 }}
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
        darkColor="#E05A3E"
        index={0}
      />
      <RadarCard
        title={`HR & Behavioral Performance (${hrCount || 0})`}
        data={behaviouralData}
        color="#4B5563"
        darkColor="#38BDF8"
        index={1}
      />
    </div>
  );
}

