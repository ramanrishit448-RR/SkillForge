import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "motion/react";
import {
  FiSend,
  FiFileText,
  FiClock,
  FiZap,
  FiX,
  FiCheck,
  FiChevronDown,
  FiArrowLeft,
  FiCompass,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import RoadmapResult from "../components/roadmap/RoadmapResult";
import api from "../utils/axios";
import { useCoins, refundCoins } from "../api/user.api";

const PACKAGE_OPTIONS = ["10 LPA", "15 LPA", "20 LPA", "30 LPA", "40 LPA"];
const POPULAR_ROLES = [
  "Frontend Architect",
  "Backend Engineer",
  "Full Stack Developer",
  "DevOps Engineer",
  "AI / ML Engineer",
  "System Architect",
];

import ThemeToggle from "../components/ThemeToggle";

// ─── Navbar ───────────────────────────────────────────────────────────────────
function RoadmapNavbar({ onHistoryClick, user }) {
  const navigate = useNavigate();
  return (
    <nav className="sticky top-0 z-40 bg-[#FAF9F5]/90 dark:bg-[#090A0F]/90 backdrop-blur-md border-b border-[#E6E2D8] dark:border-[#222634] transition-colors">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-1.5 text-xs font-medium text-[#141414]/60 dark:text-white/60 hover:text-[#141414] dark:hover:text-white transition-colors"
          >
            <FiArrowLeft size={14} />
            <span className="hidden sm:inline">Dashboard</span>
          </button>

          <div className="h-4 w-px bg-[#E6E2D8] dark:bg-[#222634] hidden sm:block" />

          <div
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="flex items-center -space-x-1">
              <span className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-[#141414] dark:bg-white" />
              <span className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-[#141414]/70 dark:bg-white/60" />
            </div>
            <span className="font-extrabold text-xs sm:text-sm tracking-tight text-[#141414] dark:text-white">
              SkillForge
            </span>
            <span className="hidden md:inline-flex rounded-full bg-[#F4F1EA] dark:bg-[#1A1D29] border border-[#E6E2D8] dark:border-[#222634] px-2 py-0.5 text-[10px] font-medium text-[#141414]/60 dark:text-white/60">
              Roadmap Generator
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2.5">
          <ThemeToggle compact={true} />

          <button
            onClick={onHistoryClick}
            className="flex items-center gap-1 sm:gap-1.5 text-xs font-medium px-2.5 sm:px-3 py-1.5 rounded-full border border-[#E6E2D8] dark:border-[#222634] bg-white dark:bg-[#12141C] text-[#141414]/80 dark:text-white/80 hover:text-[#141414] dark:hover:text-white hover:border-[#141414]/40 dark:hover:border-white/40 transition-all shadow-sm"
          >
            <FiClock size={13} />
            <span className="hidden sm:inline">History</span>
          </button>

          <div
            onClick={() => navigate("/pricing")}
            className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full border border-[#E6E2D8] dark:border-[#222634] bg-[#F4F1EA] dark:bg-[#161822] text-xs font-semibold text-[#141414] dark:text-white hover:border-[#141414]/40 dark:hover:border-white/40 cursor-pointer transition-all shadow-sm"
            title="Interview Coins · Click to Top up"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>{user?.interviewCoin ?? 0}</span>
            <span className="text-[10px] text-[#141414]/50 dark:text-white/40 ml-0.5 hidden sm:inline">Coins</span>
          </div>
        </div>
      </div>
    </nav>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function Roadmap({ setUser, user }) {
  const [historyOpen, setHistoryOpen] = useState(false);
  const [roadmap, setRoadmap] = useState(null);
  const [role, setRole] = useState("");
  const [targetPackage, setTargetPackage] = useState(PACKAGE_OPTIONS[2]); // default "20 LPA"
  const [packageOpen, setPackageOpen] = useState(false);
  const [useResume, setUseResume] = useState(false);
  const [loading, setLoading] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");

  const { resume } = useSelector((state) => state.resume);

  useEffect(() => {
    getRoadmaps();
  }, []);

  const getRoadmaps = async () => {
    try {
      setHistoryLoading(true);
      const response = await api.get("/api/roadmap");
      setHistory(response.data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setHistoryLoading(false);
    }
  };

  const getRoadmapById = async (id) => {
    try {
      const { data } = await api.get(`/api/roadmap/${id}`);
      setRoadmap(data.data);
    } catch (err) {
      console.error(err);
    }
  };

  async function handleGenerate() {
    if (!role.trim() || loading) return;
    setLoading(true);
    setError("");
    let coinDeducted = false;
    try {
      const coinResponse = await useCoins({ coins: 20, action: "roadmap" });
      if (!coinResponse) {
        setError("Insufficient interview coins or session expired. Please top up your coins.");
        setLoading(false);
        return;
      }
      coinDeducted = true;
      if (setUser) {
        setUser((prev) => ({ ...prev, interviewCoin: coinResponse.interviewCoin }));
      }

      const { data } = await api.post("/api/roadmap/generate", {
        role: role.trim(),
        targetPackage,
        useResume,
        resume,
      });
      setRoadmap(data.data);
      getRoadmaps();
    } catch (err) {
      console.error("Failed to generate roadmap:", err);
      if (coinDeducted) {
        const refund = await refundCoins(20);
        if (refund?.interviewCoin !== undefined && setUser) {
          setUser((prev) => ({ ...prev, interviewCoin: refund.interviewCoin }));
        }
      }
      const isRateLimit = err.response?.status === 429 || err.response?.data?.isRateLimit;
      const errorMsg = isRateLimit
        ? "AI service rate limit or quota reached. Your 20 coins have been refunded. Please wait a moment and try again."
        : err.response?.data?.message
        ? `${err.response.data.message} (20 coins refunded)`
        : "Something went wrong while generating your roadmap. 20 coins have been refunded.";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-[#FAF9F5] dark:bg-[#090A0F] text-[#141414] dark:text-[#F9FAFB] font-['Plus_Jakarta_Sans',sans-serif] min-h-screen flex flex-col selection:bg-[#141414] selection:text-white transition-colors">
      <RoadmapNavbar
        user={user}
        onHistoryClick={() => setHistoryOpen(!historyOpen)}
      />

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto pb-32 pt-6 sm:pt-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <AnimatePresence mode="wait">
            {!roadmap ? (
              /* ── Empty State ── */
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center justify-center min-h-[60vh] text-center"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#E6E2D8] dark:border-[#222634] bg-[#F4F1EA] dark:bg-[#161822] text-[11px] font-semibold text-[#141414]/75 dark:text-white/75 uppercase tracking-wider mb-4">
                  <FiCompass size={13} className="text-[#141414] dark:text-white" />
                  Blueprint Engine · 20 Coins
                </div>

                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#141414] dark:text-white max-w-xl">
                  Engineering Roadmaps Designed for Your Dream Package.
                </h1>

                <p className="mt-3 text-xs sm:text-sm text-[#141414]/60 dark:text-white/60 max-w-md leading-relaxed">
                  Enter your target role and salary bracket. Our AI maps out a systematic weekly curriculum with direct YouTube masterclasses and documentation.
                </p>

                {error && (
                  <div className="mt-4 p-3 rounded-xl border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-950/40 text-xs text-red-600 dark:text-red-400 max-w-md">
                    {error}
                  </div>
                )}

                {/* Popular Roles Chips */}
                <div className="mt-8">
                  <p className="text-[11px] font-semibold text-[#141414]/45 dark:text-white/40 uppercase tracking-wider mb-3">
                    Quick Start Suggestions
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-2 max-w-lg">
                    {POPULAR_ROLES.map((r) => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => setRole(r)}
                        className={`text-xs px-3.5 py-1.5 rounded-full border transition-all ${
                          role === r
                            ? "bg-[#141414] dark:bg-white text-white dark:text-[#141414] border-[#141414] dark:border-white font-semibold"
                            : "bg-white dark:bg-[#12141C] text-[#141414]/70 dark:text-white/70 border-[#E6E2D8] dark:border-[#222634] hover:border-[#141414]/40 dark:hover:border-white/40 hover:text-[#141414] dark:hover:text-white shadow-sm"
                        }`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : (
              <RoadmapResult
                key="roadmap"
                roadmap={roadmap}
                onClear={() => setRoadmap(null)}
              />
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* ── Fixed Bottom Console ── */}
      <div className="fixed bottom-0 left-0 right-0 z-30 pb-4 pt-3 px-3 sm:px-4 bg-gradient-to-t from-[#FAF9F5] via-[#FAF9F5]/95 dark:from-[#090A0F] dark:via-[#090A0F]/95 to-transparent">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 p-2 rounded-2xl bg-white dark:bg-[#12141C] border border-[#E6E2D8] dark:border-[#222634] shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.4)] transition-colors">
            {/* Input */}
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
              placeholder="Enter target role (e.g. Senior Backend Engineer)..."
              className="flex-1 min-w-0 bg-transparent text-xs sm:text-sm text-[#141414] dark:text-white placeholder-[#141414]/35 dark:placeholder-white/30 outline-none px-3 py-2"
            />

            <div className="flex items-center gap-1.5 sm:gap-2 justify-between sm:justify-end">
              {/* Target Package Dropdown */}
              <div className="relative flex-1 sm:flex-initial">
                <button
                  type="button"
                  onClick={() => setPackageOpen(!packageOpen)}
                  className="w-full flex items-center justify-between sm:justify-start gap-1 text-xs px-2.5 sm:px-3 py-2 rounded-xl border border-[#E6E2D8] dark:border-[#222634] bg-[#FAF9F5] dark:bg-[#161822] text-[#141414] dark:text-white font-semibold hover:border-[#141414]/30 dark:hover:border-white/30 transition-all whitespace-nowrap"
                >
                  <span>{targetPackage}</span>
                  <FiChevronDown
                    size={12}
                    className={`transition-transform text-[#141414]/50 dark:text-white/50 ${packageOpen ? "rotate-180" : ""}`}
                  />
                </button>

                <AnimatePresence>
                  {packageOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 6, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.97 }}
                      transition={{ duration: 0.15 }}
                      className="absolute bottom-full mb-2 right-0 w-32 rounded-xl overflow-hidden border border-[#E6E2D8] dark:border-[#222634] bg-white dark:bg-[#161822] shadow-[0_8px_24px_rgba(0,0,0,0.12)] z-50 py-1"
                    >
                      {PACKAGE_OPTIONS.map((pkg) => (
                        <button
                          key={pkg}
                          onClick={() => {
                            setTargetPackage(pkg);
                            setPackageOpen(false);
                          }}
                          className={`w-full text-left text-xs px-3 py-2 transition-colors ${
                            pkg === targetPackage
                              ? "bg-[#FAF9F5] dark:bg-[#202533] text-[#141414] dark:text-white font-bold"
                              : "text-[#141414]/70 dark:text-white/70 hover:bg-[#FAF9F5] dark:hover:bg-[#202533] hover:text-[#141414] dark:hover:text-white"
                          }`}
                        >
                          {pkg}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Use Resume Button */}
              <button
                type="button"
                onClick={() => setUseResume(!useResume)}
                className={`flex items-center text-xs gap-1.5 px-2.5 sm:px-3 py-2 rounded-xl border transition-all whitespace-nowrap ${
                  useResume
                    ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border-emerald-300 dark:border-emerald-800 font-semibold"
                    : "bg-white dark:bg-[#12141C] text-[#141414]/60 dark:text-white/60 border-[#E6E2D8] dark:border-[#222634] hover:border-[#141414]/30 dark:hover:border-white/30"
                }`}
              >
                {useResume ? (
                  <>
                    <FiCheck size={12} />
                    <span className="hidden sm:inline">Resume Attached</span>
                    <span className="sm:hidden">Resume</span>
                  </>
                ) : (
                  <>
                    <FiFileText size={12} />
                    <span className="hidden sm:inline">Use Resume</span>
                    <span className="sm:hidden">Resume</span>
                  </>
                )}
              </button>

              {/* Generate CTA */}
              <button
                onClick={handleGenerate}
                disabled={loading || !role.trim()}
                className="flex items-center justify-center gap-1.5 text-xs px-3.5 sm:px-4 py-2 rounded-xl font-semibold text-white dark:text-[#141414] bg-[#141414] dark:bg-white hover:bg-black dark:hover:bg-slate-200 transition-all disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap shadow-sm"
              >
                {loading ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    <span className="hidden sm:inline">Generating…</span>
                  </>
                ) : (
                  <>
                    <FiSend size={12} />
                    <span className="hidden sm:inline">Generate</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── History Drawer ── */}
      <AnimatePresence>
        {historyOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setHistoryOpen(false)}
              className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            />
            <motion.aside
              key="drawer"
              initial={{ x: 320 }}
              animate={{ x: 0 }}
              exit={{ x: 320 }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-[320px] max-w-[85vw] bg-[#FAF9F5] dark:bg-[#0E1017] border-l border-[#E6E2D8] dark:border-[#222634] flex flex-col overflow-y-auto shadow-2xl"
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-[#E6E2D8] dark:border-[#222634] sticky top-0 bg-[#FAF9F5]/95 dark:bg-[#0E1017]/95 backdrop-blur-md">
                <span className="text-sm font-bold text-[#141414] dark:text-white">Saved Roadmaps</span>
                <button
                  onClick={() => setHistoryOpen(false)}
                  className="w-7 h-7 rounded-lg border border-[#E6E2D8] dark:border-[#222634] flex items-center justify-center text-[#141414]/60 dark:text-white/60 hover:text-[#141414] dark:hover:text-white hover:bg-white dark:hover:bg-[#1A1D29] transition-all"
                >
                  <FiX size={15} />
                </button>
              </div>

              <div className="flex flex-col gap-2.5 p-4">
                {historyLoading ? (
                  <p className="text-xs text-[#141414]/40 dark:text-white/40 text-center py-8">Loading history…</p>
                ) : history.length === 0 ? (
                  <p className="text-xs text-[#141414]/40 dark:text-white/40 text-center py-8">No saved roadmaps yet.</p>
                ) : (
                  history.map((item) => (
                    <button
                      key={item._id}
                      onClick={() => {
                        getRoadmapById(item._id);
                        setHistoryOpen(false);
                      }}
                      className="text-left p-4 rounded-2xl bg-white dark:bg-[#141722] border border-[#E6E2D8] dark:border-[#222634] hover:border-[#141414]/40 dark:hover:border-white/40 transition-all shadow-sm"
                    >
                      <h3 className="text-xs font-bold text-[#141414] dark:text-white line-clamp-1">{item.title}</h3>
                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#E6E2D8]/60 dark:border-[#222634]">
                        <span className="text-[10px] font-semibold text-[#141414] dark:text-white bg-[#F4F1EA] dark:bg-[#1A1D29] px-2 py-0.5 rounded border border-[#E6E2D8] dark:border-[#222634]">
                          {item.targetPackage}
                        </span>
                        <span className="text-[10px] text-[#141414]/50 dark:text-white/40">{item.duration}</span>
                      </div>
                      <p className="text-[10px] text-[#141414]/40 dark:text-white/30 mt-1">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </p>
                    </button>
                  ))
                )}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
