import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  FiVideo,
  FiFileText,
  FiMap,
  FiBarChart2,
  FiCode,
  FiSearch,
  FiBell,
  FiCheck,
  FiArrowRight,
  FiLayers,
  FiAward,
  FiTrendingUp,
  FiBookOpen,
  FiCheckCircle,
} from "react-icons/fi";
import { LoginModal } from "../components/LoginModel";
import QuarterCircleOrbit from "../components/QuarterCircleOrbit";

export default function Home({ user, setUser }) {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="bg-[#FAF9F5] text-[#141414] font-['Plus_Jakarta_Sans',sans-serif] min-h-screen overflow-x-hidden selection:bg-[#141414] selection:text-white">
      {/* ── TOP ARCHITECTURAL GRID GUIDE ── */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-8">
        {/* Crosshair Top-Left */}
        <div className="hidden lg:flex absolute top-[68px] left-4 -translate-x-1/2 -translate-y-1/2 text-black/35 text-xs font-mono select-none pointer-events-none z-20">
          +
        </div>
        {/* Crosshair Top-Right */}
        <div className="hidden lg:flex absolute top-[68px] right-4 translate-x-1/2 -translate-y-1/2 text-black/35 text-xs font-mono select-none pointer-events-none z-20">
          +
        </div>

        {/* ── TOP NAVIGATION ── */}
        <header className="relative z-30 pt-6 pb-4 border-b border-[#E6E2D8] flex items-center justify-between">
          {/* Brand */}
          <div className="flex items-center gap-2.5">
            {/* Minimalist modern dual pebble logo */}
            <div className="flex items-center -space-x-1.5">
              <span className="w-3.5 h-3.5 rounded-full bg-[#141414]" />
              <span className="w-3.5 h-3.5 rounded-full bg-[#141414]/75" />
            </div>
            <span className="font-extrabold text-lg tracking-tight text-[#141414]">
              SkillForge
            </span>
          </div>

          {/* Nav Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-7 text-xs font-medium text-[#141414]/70">
            <a
              href="#platform"
              className="hover:text-[#141414] transition-colors flex items-center gap-1"
            >
              For Candidates <span className="text-[10px] text-black/40">▾</span>
            </a>
            <a
              href="#agents"
              className="hover:text-[#141414] transition-colors flex items-center gap-1"
            >
              AI Agents <span className="text-[10px] text-black/40">▾</span>
            </a>
            <a
              href="#features"
              className="hover:text-[#141414] transition-colors"
            >
              How It Works
            </a>
            <a
              href="#pricing"
              onClick={(e) => {
                e.preventDefault();
                setShowLoginModal(true);
              }}
              className="hover:text-[#141414] transition-colors"
            >
              Interview Coins
            </a>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setShowLoginModal(true)}
              className="px-3.5 py-1.5 rounded-md border border-[#DCD7CB] text-xs font-medium text-[#141414] hover:border-[#141414]/40 hover:bg-white/60 transition-all cursor-pointer"
            >
              Login
            </button>
            <button
              onClick={() => setShowLoginModal(true)}
              className="px-4 py-1.5 rounded-md bg-[#141414] text-white text-xs font-semibold hover:bg-black/90 shadow-sm transition-all cursor-pointer"
            >
              Get Started
            </button>
          </div>
        </header>

        {/* ── HERO SECTION WITH ROTATING ORBITAL TRACK ── */}
        <section className="relative pt-8 sm:pt-12 pb-6 sm:pb-10 overflow-visible">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-4 items-end min-h-[580px]">
            {/* Left Editorial Content */}
            <div className="lg:col-span-6 z-20 text-left pb-6">
              {/* Eyebrow Pill Tag */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#FBDCD0] bg-[#FFF2ED] text-[#E05A3E] text-[11px] font-bold tracking-wider uppercase mb-5"
              >
                <span>FROM PREPARATION TO OFFER</span>
              </motion.div>

              {/* Main Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.05 }}
                className="text-4xl sm:text-5xl lg:text-[60px] font-extrabold tracking-tight text-[#141414] leading-[1.05]"
              >
                AI Workforce.<br />
                Built for Tech Careers.
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.12 }}
                className="mt-4 text-xs sm:text-sm text-[#141414]/65 max-w-lg leading-relaxed font-normal"
              >
                They simulate, evaluate and guide across live technical interviews, ATS resume audits, and customized engineering roadmaps so you land top-tier tech offers.
              </motion.p>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.18 }}
                className="mt-7 flex items-center gap-3"
              >
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="px-6 py-3 rounded-xl bg-[#E55734] hover:bg-[#D44725] text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-all cursor-pointer"
                >
                  Start Preparation
                </button>
                <a
                  href="#platform"
                  className="px-5 py-3 rounded-xl border border-[#DCD7CB] bg-white text-[#141414] text-xs font-semibold hover:border-[#141414]/40 transition-all cursor-pointer"
                >
                  Explore Agents
                </a>
              </motion.div>

              {/* Floating AI Team Stack Card (Bottom Left) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="mt-10 pt-4"
              >
                <p className="text-[10px] font-bold text-[#141414]/40 uppercase tracking-wider mb-2.5">
                  YOUR AI TEAM
                </p>

                <div className="relative">
                  {/* Background Ghost Card 2 */}
                  <div className="absolute -left-3 -top-2.5 w-64 sm:w-72 h-32 rounded-2xl bg-white/40 border border-[#E6E2D8] -rotate-3 pointer-events-none" />
                  {/* Background Ghost Card 1 */}
                  <div className="absolute -left-1.5 -top-1 w-64 sm:w-72 h-32 rounded-2xl bg-white/60 border border-[#E6E2D8] -rotate-1.5 pointer-events-none" />

                  {/* Active Foreground Card */}
                  <div className="relative w-full max-w-sm rounded-2xl bg-white/95 backdrop-blur-xl border border-[#E6E2D8] p-4 sm:p-5 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
                    <div className="flex items-center justify-between mb-1.5">
                      <h4 className="text-xs font-bold text-[#141414] tracking-tight">
                        INTERVIEW AGENT
                      </h4>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[10px] font-semibold text-emerald-700">Active</span>
                      </div>
                    </div>

                    <p className="text-[11px] text-[#141414]/65 leading-relaxed">
                      Conducts realistic technical rounds with code execution, speech analysis, and follow-up questioning.
                    </p>

                    <div className="flex items-center gap-1.5 mt-3 flex-wrap">
                      <span className="text-[9px] font-bold px-2 py-0.5 rounded-md bg-[#FAF9F5] border border-[#E6E2D8] text-[#141414]/75">
                        VOICE
                      </span>
                      <span className="text-[9px] font-bold px-2 py-0.5 rounded-md bg-[#FAF9F5] border border-[#E6E2D8] text-[#141414]/75">
                        LIVE IDE
                      </span>
                      <span className="text-[9px] font-bold px-2 py-0.5 rounded-md bg-[#FAF9F5] border border-[#E6E2D8] text-[#141414]/75">
                        RUBRIC
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Orbital Quarter-Circle Animated Track */}
            <div className="lg:col-span-6 relative flex items-end justify-center lg:justify-end overflow-visible">
              <QuarterCircleOrbit className="translate-y-2 sm:translate-y-6" />
            </div>
          </div>

          {/* ── EMBEDDED DASHBOARD CONTAINER (MOCKUP LIKE SCREENSHOT) ── */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="mt-14 max-w-5xl mx-auto rounded-2xl border border-[#DCD7CB] bg-[#FAF9F5] shadow-[0_12px_40px_rgba(0,0,0,0.06)] overflow-hidden text-left"
          >
            {/* Window Header */}
            <div className="border-b border-[#E6E2D8] bg-[#F5F3EC] px-4 py-3 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 font-bold text-xs tracking-tight text-[#141414]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#141414]" />
                  SkillForge Studio
                </div>
                <span className="text-[#141414]/30">|</span>
                <span className="font-semibold text-xs text-[#141414]">
                  Hello, {user?.name || "Candidate"}
                </span>
              </div>

              {/* Search Pill */}
              <div className="hidden sm:flex items-center gap-2 bg-white/80 border border-[#E6E2D8] rounded-full px-3.5 py-1 text-xs text-[#141414]/50 w-64">
                <FiSearch size={13} />
                <span>Search roles, skills, or roadmaps...</span>
              </div>

              {/* Status Icons */}
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full border border-[#E6E2D8] flex items-center justify-center text-[#141414]/70 bg-white/50">
                  <FiBell size={12} />
                </div>
                <span className="px-2.5 py-0.5 rounded-full border border-black/15 bg-white text-[11px] font-medium text-[#141414]/80">
                  Interview Ready
                </span>
              </div>
            </div>

            {/* Window Body (Sidebar + Content Area) */}
            <div className="grid md:grid-cols-[180px_1fr] bg-white min-h-[360px]">
              {/* Left Sidebar */}
              <aside className="border-r border-[#EAE6DE] bg-[#F8F6F0] p-4 hidden md:flex flex-col justify-between text-xs">
                <div className="space-y-4">
                  <p className="text-[10px] uppercase font-bold text-black/40 tracking-wider">
                    Menu
                  </p>
                  <ul className="space-y-1">
                    {[
                      { id: "overview", label: "Overview", icon: <FiLayers size={13} /> },
                      { id: "interview", label: "Mock Interview", icon: <FiVideo size={13} /> },
                      { id: "resume", label: "ATS Resume", icon: <FiFileText size={13} /> },
                      { id: "roadmap", label: "AI Roadmaps", icon: <FiMap size={13} /> },
                      { id: "metrics", label: "Performance", icon: <FiBarChart2 size={13} /> },
                    ].map((item) => (
                      <li key={item.id}>
                        <button
                          onClick={() => setActiveTab(item.id)}
                          className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors text-left ${
                            activeTab === item.id
                              ? "bg-white text-[#141414] shadow-xs border border-[#E6E2D8]"
                              : "text-black/60 hover:text-[#141414] hover:bg-black/5"
                          }`}
                        >
                          {item.icon}
                          {item.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-2.5 rounded-xl bg-white border border-[#E6E2D8] text-[11px] text-black/60">
                  <span className="font-bold text-[#141414] block mb-0.5">
                    Interview Coins
                  </span>
                  Available: <span className="font-semibold text-black">150 Coins</span>
                </div>
              </aside>

              {/* Main App Canvas */}
              <main className="p-4 sm:p-6 space-y-4 bg-[#FBFBFC]">
                {/* Panel 1: Upcoming Interview */}
                <div className="rounded-xl border border-[#E8E4DA] bg-white p-4 sm:p-5 shadow-xs transition-all hover:border-[#141414]/20">
                  <div className="flex items-center justify-between border-b border-[#F0ECE4] pb-3 mb-3">
                    <div className="flex items-center gap-2 font-bold text-xs text-[#141414]">
                      <FiVideo size={14} className="text-black/70" />
                      <span>Upcoming Proctored Interview</span>
                    </div>
                    <span className="text-[10px] uppercase font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      Live AI Simulator
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#141414] text-white font-bold flex items-center justify-center text-xs">
                        AM
                      </div>
                      <div>
                        <h4 className="font-bold text-xs text-[#141414]">
                          Alex Morgan
                        </h4>
                        <p className="text-[11px] text-black/45">
                          Senior Full-Stack Engineer · React & Node.js
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 text-xs">
                      <div>
                        <span className="text-[10px] text-black/40 block">Duration</span>
                        <span className="font-medium text-[#141414]">45 mins (Monaco Code)</span>
                      </div>
                      <div className="hidden lg:block">
                        <span className="text-[10px] text-black/40 block">Focus Area</span>
                        <span className="font-medium text-[#141414]">System Architecture & DSA</span>
                      </div>
                      <button
                        onClick={() => setShowLoginModal(true)}
                        className="px-3.5 py-1.5 rounded-md border border-[#DCD7CB] text-xs font-medium text-[#141414] hover:bg-black hover:text-white hover:border-black transition-all cursor-pointer"
                      >
                        Enter Session
                      </button>
                    </div>
                  </div>
                </div>

                {/* Panel 2: Resume & Roadmap Twin Cards */}
                <div className="grid sm:grid-cols-2 gap-4">
                  {/* ATS Resume Scorer */}
                  <div className="rounded-xl border border-[#E8E4DA] bg-white p-4 shadow-xs">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2 font-bold text-xs text-[#141414]">
                        <FiFileText size={13} className="text-black/70" />
                        <span>ATS Vector Scorer</span>
                      </div>
                      <span className="text-[11px] font-bold text-emerald-600">
                        88/100 Strong
                      </span>
                    </div>
                    <p className="text-xs text-black/50 leading-relaxed mb-3">
                      Semantic match against 1,200+ industry job descriptions using Qdrant vector index.
                    </p>
                    <div className="flex items-center justify-between pt-2 border-t border-[#F0ECE4] text-[11px]">
                      <span className="text-black/45">Missing: GraphQL, K8s</span>
                      <button
                        onClick={() => setShowLoginModal(true)}
                        className="font-medium text-[#141414] hover:underline"
                      >
                        View Report →
                      </button>
                    </div>
                  </div>

                  {/* AI Learning Roadmap */}
                  <div className="rounded-xl border border-[#E8E4DA] bg-white p-4 shadow-xs">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2 font-bold text-xs text-[#141414]">
                        <FiMap size={13} className="text-black/70" />
                        <span>Dynamic Roadmap</span>
                      </div>
                      <span className="text-[11px] font-semibold text-black/70">
                        65% Completed
                      </span>
                    </div>
                    <p className="text-xs text-black/50 leading-relaxed mb-3">
                      Current module: <strong className="text-black">Microservices & Distributed Redis</strong> with direct video tutorials.
                    </p>
                    <div className="flex items-center justify-between pt-2 border-t border-[#F0ECE4] text-[11px]">
                      <span className="text-black/45">12 Modules · 4 Weeks</span>
                      <button
                        onClick={() => setShowLoginModal(true)}
                        className="font-medium text-[#141414] hover:underline"
                      >
                        Continue Path →
                      </button>
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </motion.div>
        </section>

        {/* ── MULTI-AGENT FLEET SECTION ── */}
        <section id="agents" className="py-20 border-t border-[#E6E2D8]">
          <div className="max-w-5xl mx-auto">
            <div className="text-center max-w-xl mx-auto mb-14">
              <span className="text-[11px] font-mono uppercase tracking-widest text-black/40 block mb-2">
                Multi-Agent Architecture
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#141414]">
                Specialized Agents For Every Step
              </h2>
              <p className="text-xs sm:text-sm text-black/50 mt-3 leading-relaxed">
                Autonomous AI micro-agents working together in a unified pipeline to prepare you for senior roles.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  icon: <FiFileText size={16} />,
                  name: "Resume Agent",
                  badge: "Semantic ATS",
                  desc: "Indexes resumes in Qdrant Vector DB with Google Gemini reasoning to identify critical keyword and architectural gaps.",
                },
                {
                  icon: <FiVideo size={16} />,
                  name: "Interview Agent",
                  badge: "Proctored Simulator",
                  desc: "Conducts realistic multi-turn technical coding and HR simulations with live Monaco Editor execution.",
                },
                {
                  icon: <FiBarChart2 size={16} />,
                  name: "Feedback Agent",
                  badge: "Logic & Code Diagnostics",
                  desc: "Evaluates edge cases, algorithmic efficiency, and communication clarity to return structured grading reports.",
                },
                {
                  icon: <FiMap size={16} />,
                  name: "Roadmap Agent",
                  badge: "Agentic Curricula",
                  desc: "Builds custom multi-week learning paths backed by real-time web verification and YouTube tutorials.",
                },
              ].map((agent, index) => (
                <motion.div
                  key={agent.name}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  whileHover={{ y: -4 }}
                  className="rounded-xl border border-[#DCD7CB] bg-white p-5 shadow-xs flex flex-col justify-between hover:border-[#141414]/40 transition-all"
                >
                  <div>
                    <div className="w-8 h-8 rounded-lg bg-[#FAF9F5] border border-[#E6E2D8] flex items-center justify-center text-[#141414] mb-3.5">
                      {agent.icon}
                    </div>
                    <h3 className="font-bold text-sm text-[#141414] mb-0.5">
                      {agent.name}
                    </h3>
                    <span className="text-[10px] font-mono text-black/40 uppercase tracking-wider block mb-2.5">
                      {agent.badge}
                    </span>
                    <p className="text-xs text-black/60 leading-relaxed font-normal">
                      {agent.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ARCHITECTURAL ADVANTAGES (WHY SKILLFORGE) ── */}
        <section id="features" className="py-20 border-t border-[#E6E2D8] bg-[#F5F3EC]/50 -mx-4 sm:-mx-8 px-4 sm:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="space-y-2">
                <span className="text-[11px] font-mono uppercase text-black/40 tracking-wider">
                  01 / Simulation
                </span>
                <h3 className="text-base font-bold text-[#141414]">
                  Realistic Live Code Proctored Environment
                </h3>
                <p className="text-xs text-black/60 leading-relaxed">
                  Move beyond multiple-choice tests. Write real code in an embedded Monaco Editor evaluated turn-by-turn by Groq and LangGraph.
                </p>
              </div>

              <div className="space-y-2">
                <span className="text-[11px] font-mono uppercase text-black/40 tracking-wider">
                  02 / Vector Search
                </span>
                <h3 className="text-base font-bold text-[#141414]">
                  Contextual ATS Vector Matching
                </h3>
                <p className="text-xs text-black/60 leading-relaxed">
                  Traditional platforms use simple keyword regex. SkillForge maps your project descriptions semantically against target tech stacks.
                </p>
              </div>

              <div className="space-y-2">
                <span className="text-[11px] font-mono uppercase text-black/40 tracking-wider">
                  03 / Transparent
                </span>
                <h3 className="text-base font-bold text-[#141414]">
                  Usage-Based Coin Economics
                </h3>
                <p className="text-xs text-black/60 leading-relaxed">
                  Zero recurring subscription locks. Pay only for the interviews, roadmaps, and resume analyses you actually use.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── CALL TO ACTION SECTION ── */}
        <section className="py-20 border-t border-[#E6E2D8] text-center">
          <div className="max-w-xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#141414]">
              Start Your Career Preparation Today
            </h2>
            <p className="text-xs sm:text-sm text-black/55 mt-3 leading-relaxed">
              Create an account in seconds and receive complimentary Interview Coins to analyze your resume and practice your first AI mock session.
            </p>
            <div className="mt-7 flex items-center justify-center gap-3">
              <button
                onClick={() => setShowLoginModal(true)}
                className="px-5 py-2.5 rounded-md bg-[#141414] text-white text-xs font-semibold hover:bg-black/90 shadow-sm transition-all cursor-pointer"
              >
                Create Free Account
              </button>
              <button
                onClick={() => setShowLoginModal(true)}
                className="px-5 py-2.5 rounded-md border border-[#DCD7CB] bg-white text-[#141414] text-xs font-medium hover:border-[#141414]/40 transition-all cursor-pointer"
              >
                Sign In
              </button>
            </div>
          </div>
        </section>

        {/* ── CLEAN EDITORIAL FOOTER ── */}
        <footer className="border-t border-[#E6E2D8] py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-black/50">
          <div className="flex items-center gap-2 font-bold text-xs text-[#141414]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#141414]" />
            SkillForge
          </div>
          <p className="text-xs text-black/40">
            Multi-Agent Career Preparation Platform · Engineered for developers worldwide
          </p>
          <div className="text-[11px] text-black/30 font-mono">
            © {new Date().getFullYear()} SkillForge
          </div>
        </footer>
      </div>

      {/* Login Modal */}
      {showLoginModal && (
        <LoginModal
          onClose={() => setShowLoginModal(false)}
          setUser={setUser}
        />
      )}
    </div>
  );
}
