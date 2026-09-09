import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { FiPlay, FiSidebar } from "react-icons/fi";
import { BsStars } from "react-icons/bs";
import Sidebar from "../components/Sidebar";
import StatBox from "../components/Statbox";
import InterviewGraph from "../components/InterviewGraph";
import ThemeToggle from "../components/ThemeToggle";
import { useNavigate } from "react-router-dom";
import { getAllInterviews } from "../api/interview.api";
import api from "../utils/axios";

export default function Dashboard({ user, setUser }) {
  const [collapsed, setCollapsed] = useState(false);   // desktop collapse
  const [mobileOpen, setMobileOpen] = useState(false);   // mobile drawer

  const [stats, setStats] = useState({
    totalInterviews: 0,
    totalQuestions: 0,
    completed: 0,
    averageScore: 0,
  });

  const [technicalData, setTechnicalData] = useState([]);
  const [behaviouralData, setBehaviouralData] = useState([]);
  const [technicalCount, setTechnicalCount] = useState(0);
  const [hrCount, setHrCount] = useState(0);

  const firstName = user?.name?.split(" ")[0] ?? "there";
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInterviews = async () => {
      const response = await getAllInterviews();
      if (response) {
        if (response.stats) setStats(response.stats);
        if (response.technicalData) setTechnicalData(response.technicalData);
        if (response.behaviouralData) setBehaviouralData(response.behaviouralData);
        if (response.technicalCount !== undefined) setTechnicalCount(response.technicalCount);
        if (response.hrCount !== undefined) setHrCount(response.hrCount);
      }
    };
    fetchInterviews();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await api.get("/api/auth/logout");
      if (response.data.success) {
        setUser(null);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-[#FAF9F5] dark:bg-[#090A0F] min-h-screen text-[#141414] dark:text-white font-['Plus_Jakarta_Sans',sans-serif] flex selection:bg-[#141414] dark:selection:bg-white selection:text-white dark:selection:text-[#090A0F] transition-colors">
      <Sidebar
        user={user}
        onNewInterview={() => navigate("/interview")}
        onLogout={handleLogout}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />
      {/* Main — desktop margin matches sidebar width */}
      <motion.main
        className={`flex-1 min-h-screen px-3 sm:px-4 md:px-6 py-4 md:py-6 transition-all duration-300 ${
          collapsed ? "md:ml-[72px]" : "md:ml-[260px]"
        }`}
      >
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-5 md:mb-6">
          <div className="flex items-center gap-2.5">
            {/* Mobile hamburger — FiSidebar */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setMobileOpen(true)}
              className="md:hidden p-1.5 rounded-lg text-black/40 dark:text-white/50 hover:text-[#0A0A0A] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              title="Open Navigation"
            >
              <FiSidebar size={18} />
            </motion.button>

            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <p className="text-black/40 dark:text-white/40 text-[11px] md:text-xs font-medium mb-0.5">
                Overview
              </p>
              <h1 className="text-lg md:text-xl font-bold text-[#0A0A0A] dark:text-white">
                Hello, {firstName} 👋
              </h1>
            </motion.div>
          </div>

          {/* Right Action: ThemeToggle + Coins Pill */}
          <div className="flex items-center gap-2">
            <ThemeToggle compact={true} />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              onClick={() => navigate("/pricing")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#E6E2D8] dark:border-[#222634] bg-white dark:bg-[#151822] text-xs font-bold text-[#141414] dark:text-white hover:border-[#141414]/40 dark:hover:border-white/20 cursor-pointer shadow-sm transition-all"
              title="Interview Coins · Click to Top up"
            >
              <BsStars className="text-amber-500" size={13} />
              <span>{user?.interviewCoin ?? 0} Coins</span>
              <span className="text-[10px] font-medium text-[#141414]/50 dark:text-white/50 ml-0.5 hidden sm:inline">+ Top up</span>
            </motion.div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-[#E6E2D8] dark:bg-[#222634] mb-5 md:mb-6" />

        {/* Stat Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-2.5 md:gap-3">
          <StatBox
            label="Total Interviews"
            value={stats?.totalInterviews}
            subHighlight="All Time"
            sub="Interviews Created"
            index={0}
          />

          <StatBox
            label="Questions Solved"
            value={stats?.totalQuestions}
            subHighlight="Answered"
            sub="Across All Interviews"
            index={1}
          />

          <StatBox
            label="Completed"
            value={stats?.completed}
            subHighlight={`${stats?.totalInterviews || 0} Total`}
            sub="Interviews Finished"
            index={2}
          />

          <StatBox
            label="Average Score"
            value={`${Math.round(stats?.averageScore || 0)}/100`}
            subHighlight="Completed Only"
            sub="Average Performance"
            index={3}
          />
        </div>

        {/* Graph Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mb-3 md:mb-4"
        >
          <p className="text-black/40 dark:text-white/40 text-[10px] font-semibold uppercase tracking-widest mt-4 mb-1">
            Performance
          </p>
          <h2 className="text-[#0A0A0A] dark:text-white font-bold text-sm md:text-base mb-3 md:mb-4">
            Interview History
          </h2>
        </motion.div>

        <div className="w-full overflow-x-auto">

          <InterviewGraph

            technicalData={technicalData}

            behaviouralData={behaviouralData}

            technicalCount={technicalCount}

            hrCount={hrCount}

          />

        </div>



      </motion.main>

    </div>

  );

}
