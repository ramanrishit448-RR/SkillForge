import { useState } from "react";
import { motion } from "motion/react";
import {
  FiMic,
  FiFileText,
  FiBarChart2,
  FiMap,
  FiCode,
  FiCheckCircle,
  FiZap,
  FiArrowRight,
  FiTrendingUp,
} from "react-icons/fi";
import { GiArtificialHive } from "react-icons/gi";
import { LoginModal } from "../components/LoginModel";
import img from "../assets/image.png";

export default function Home({ user, setUser }) {
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <div className="bg-white text-[#0A0A0A] font-sans min-h-screen overflow-x-hidden selection:bg-black selection:text-white">
      {/* ── NAVBAR ── */}
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 h-[56px] flex items-center justify-between px-5 sm:px-8 bg-white/80 backdrop-blur-xl border-b border-black/5"
      >
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#0A0A0A] flex items-center justify-center shadow-[0_4px_14px_rgba(0,0,0,0.18)]">
            <GiArtificialHive size={17} color="white" />
          </div>
          <span className="font-extrabold text-base tracking-tight text-[#0A0A0A]">
            SkillForge
          </span>
          <span className="hidden sm:inline-flex text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-black/5 text-black/50 border border-black/5">
            AI Platform
          </span>
        </div>

        {/* Action Button */}
        <motion.button
          onClick={() => setShowLoginModal(true)}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="bg-[#0A0A0A] text-white font-medium rounded-lg px-4 py-2 text-xs cursor-pointer transition-all hover:bg-black/90 shadow-[0_4px_16px_rgba(0,0,0,0.18)]"
        >
          Get Started →
        </motion.button>
      </motion.nav>

      {/* ── HERO SECTION ── */}
      <section className="relative pt-28 pb-16 overflow-hidden bg-[#FBFBFC]">
        {/* Ambient Glows */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-gradient-to-tr from-black/[0.03] to-violet-500/[0.04] blur-[100px] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-black/10 bg-black/5 text-black/75 text-xs font-semibold mb-6 shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Multi-Agent Career Preparation Platform
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.12 }}
            className="text-3xl sm:text-5xl md:text-6xl font-black leading-[1.12] tracking-tight mb-5 text-[#0A0A0A]"
          >
            Career Preparation, <br />
            <span className="text-black/35 font-extrabold">
              Engineered with Multi-Agents.
            </span>
            <br />
            From First Step to Final Offer.
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="text-black/50 text-sm sm:text-base leading-relaxed max-w-xl mx-auto mb-8 font-normal"
          >
            SkillForge is an autonomous multi-agent ecosystem that accelerates
            your career: build ATS-optimized resumes, simulate proctored coding
            and behavioral interviews, and follow personalized learning paths.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.28 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <motion.button
              onClick={() => setShowLoginModal(true)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="w-full sm:w-auto relative overflow-hidden bg-[#0A0A0A] text-white font-bold px-6 py-3 rounded-xl text-xs sm:text-sm cursor-pointer border border-black shadow-[0_10px_30px_rgba(0,0,0,0.22)] transition-all hover:bg-black/90"
            >
              Start Preparing for Free →
            </motion.button>
          </motion.div>

          {/* Highlights Row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.35 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4 text-[11px] sm:text-xs text-black/60 font-medium"
          >
            <span className="inline-flex items-center gap-1.5">
              <FiCheckCircle className="text-black" /> ATS Resume Vector Scorer
            </span>
            <span className="inline-flex items-center gap-1.5">
              <FiCheckCircle className="text-black" /> Proctored Live Coding (Monaco)
            </span>
            <span className="inline-flex items-center gap-1.5">
              <FiCheckCircle className="text-black" /> Agentic Learning Roadmaps
            </span>
          </motion.div>

          {/* Hero Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -6, scale: 1.01 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-12 rounded-2xl overflow-hidden border border-black/10 shadow-[0_20px_70px_rgba(0,0,0,0.1)] max-w-3xl mx-auto bg-white p-2"
          >
            <img
              src={img}
              alt="SkillForge AI Career Platform Dashboard"
              className="w-full h-auto object-cover rounded-xl block"
              onError={(e) => {
                e.target.src =
                  "https://placehold.co/900x500/F3F4F6/0A0A0A?text=SkillForge+Dashboard";
              }}
            />
          </motion.div>
        </div>
      </section>

      {/* ── SPECIALIZED AGENTS SECTION ── */}
      <section className="py-20 bg-[#F4F5F7]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-black/10 bg-black/5 text-black/70 text-xs font-semibold mb-3">
              <FiZap size={13} className="text-yellow-500" />
              Autonomous Agent Fleet
            </div>

            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-[#0A0A0A]">
              Specialized AI Agents For
              <span className="block text-black/35 font-extrabold">
                Every Step of Your Career Journey
              </span>
            </h2>

            <p className="text-black/45 text-sm max-w-2xl mx-auto mt-3.5 leading-relaxed">
              SkillForge orchestrates dedicated AI micro-agents that coordinate to
              diagnose your skill gaps, polish your resume, conduct real-time mock
              interviews, and guide your daily preparation.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                icon: <FiFileText />,
                title: "Resume Agent",
                subtitle: "Semantic ATS Scorer",
                desc: "Analyzes resumes using vector embeddings (Qdrant + Google Gemini). Identifies missing skills, optimizes formatting, and maximizes interview callback rates.",
              },
              {
                icon: <FiMic />,
                title: "Interview Agent",
                subtitle: "Proctored AI Simulator",
                desc: "Conducts multi-turn HR and Technical interviews. Evaluates logic, edge cases, problem-solving, and communication with live Monaco Editor integration.",
              },
              {
                icon: <FiBarChart2 />,
                title: "Feedback Agent",
                subtitle: "Analytical Diagnostic",
                desc: "Provides instant feedback matrices, competency breakdowns, and actionable tips to turn weaknesses into proven interview strengths.",
              },
              {
                icon: <FiMap />,
                title: "Roadmap Agent",
                subtitle: "Agentic Learning Paths",
                desc: "Constructs custom, multi-week study schedules powered by LangGraph, complete with direct video tutorials and documentation links.",
              },
            ].map((agent, i) => (
              <motion.div
                key={agent.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative overflow-hidden bg-[#0A0A0A] text-white rounded-2xl p-6 shadow-[0_12px_36px_rgba(0,0,0,0.22)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.35)] transition-all flex flex-col justify-between"
              >
                {/* Subtle top glare */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-transparent pointer-events-none" />

                <div>
                  <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-white text-xl mb-5 shadow-inner">
                    {agent.icon}
                  </div>
                  <h3 className="text-lg font-extrabold text-white mb-0.5">
                    {agent.title}
                  </h3>
                  <p className="text-[11px] font-semibold text-white/40 uppercase tracking-wider mb-3">
                    {agent.subtitle}
                  </p>
                  <p className="text-white/60 text-xs leading-relaxed">
                    {agent.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-white/40 group-hover:text-white transition-colors">
                  <span>Explore capability</span>
                  <FiArrowRight />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY SKILLFORGE PILLARS ── */}
      <section className="py-20 bg-white border-t border-black/5">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-2xl sm:text-3xl font-black text-[#0A0A0A] tracking-tight">
              Why Candidates Prepare on SkillForge
            </h2>
            <p className="text-black/45 text-xs sm:text-sm mt-2 max-w-lg mx-auto">
              Moving beyond static question sheets to dynamic, multi-agent AI preparation.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl border border-black/8 bg-[#FBFBFC] hover:border-black/20 transition-all">
              <div className="w-10 h-10 rounded-lg bg-black text-white flex items-center justify-center mb-4">
                <FiCode size={18} />
              </div>
              <h3 className="font-bold text-sm text-[#0A0A0A] mb-2">
                Real-Time Code Execution
              </h3>
              <p className="text-black/50 text-xs leading-relaxed">
                Practice coding problems inside an integrated Monaco Editor with
                instant syntax review, test-case evaluations, and code quality scoring.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-black/8 bg-[#FBFBFC] hover:border-black/20 transition-all">
              <div className="w-10 h-10 rounded-lg bg-black text-white flex items-center justify-center mb-4">
                <FiTrendingUp size={18} />
              </div>
              <h3 className="font-bold text-sm text-[#0A0A0A] mb-2">
                Contextual ATS Scoring
              </h3>
              <p className="text-black/50 text-xs leading-relaxed">
                Vector-based semantic matching checks your resume against real tech
                stacks and job descriptions, identifying gaps before recruiters do.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-black/8 bg-[#FBFBFC] hover:border-black/20 transition-all">
              <div className="w-10 h-10 rounded-lg bg-black text-white flex items-center justify-center mb-4">
                <FiZap size={18} />
              </div>
              <h3 className="font-bold text-sm text-[#0A0A0A] mb-2">
                Pay-As-You-Go Coins
              </h3>
              <p className="text-black/50 text-xs leading-relaxed">
                No expensive recurring subscriptions. Use Interview Coins only
                when you build a resume, generate a roadmap, or take a mock interview.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CALL TO ACTION ── */}
      <section className="py-16 bg-[#0A0A0A] text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-4">
            Ready to Accelerate Your Career?
          </h2>
          <p className="text-white/50 text-xs sm:text-sm max-w-md mx-auto mb-8 leading-relaxed">
            Join candidates using SkillForge to simulate interviews, perfect
            their resumes, and land offers at top tech companies.
          </p>
          <motion.button
            onClick={() => setShowLoginModal(true)}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="bg-white text-black font-bold px-6 py-3 rounded-xl text-xs sm:text-sm cursor-pointer hover:bg-white/90 shadow-[0_10px_30px_rgba(255,255,255,0.15)]"
          >
            Get Started with Free Coins →
          </motion.button>
        </div>
      </section>

      {/* ── LOGIN MODAL ── */}
      {showLoginModal && (
        <LoginModal
          onClose={() => setShowLoginModal(false)}
          setUser={setUser}
        />
      )}

      {/* ── FOOTER ── */}
      <footer className="border-t border-black/7 py-8 text-center bg-white">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="w-6 h-6 rounded-lg bg-[#0A0A0A] flex items-center justify-center">
            <GiArtificialHive size={13} color="white" />
          </div>
          <span className="font-extrabold text-sm text-[#0A0A0A]">
            SkillForge
          </span>
        </div>
        <p className="text-black/40 text-xs">
          Multi-Agent Career Preparation Platform · Master interviews, resumes & roadmaps
        </p>
        <div className="text-black/30 text-[11px] mt-2">
          © {new Date().getFullYear()} SkillForge. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
