import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  FiUploadCloud,
  FiCheckCircle,
  FiAlertCircle,
  FiTrendingUp,
  FiUser,
  FiZap,
  FiArrowLeft,
  FiFileText,
  FiRefreshCw,
  FiAward,
  FiCheck,
  FiChevronRight,
} from "react-icons/fi";
import { RadialBarChart, RadialBar, PolarAngleAxis } from "recharts";
import { setResume } from "../redux/resumeSlice";
import api from "../utils/axios";
import { useCoins, refundCoins } from "../api/user.api";

// ─── Score Gauge ──────────────────────────────────────────────
function ScoreGauge({ score }) {
  const color = score >= 75 ? "#10B981" : score >= 50 ? "#F59E0B" : "#EF4444";
  const label = score >= 75 ? "Excellent Match" : score >= 50 ? "Competitive" : "Needs Refinement";

  return (
    <div className="flex flex-col sm:flex-row items-center gap-6">
      <div className="relative flex items-center justify-center">
        <RadialBarChart
          width={130}
          height={130}
          cx={65}
          cy={65}
          innerRadius={46}
          outerRadius={60}
          startAngle={90}
          endAngle={-270}
          data={[{ value: score, fill: color }]}
          barSize={10}
        >
          <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
          <RadialBar background={{ fill: "#EAE6DC" }} dataKey="value" cornerRadius={10} />
        </RadialBarChart>

        <div className="absolute flex flex-col items-center justify-center">
          <span className="text-2xl font-extrabold text-[#141414] tracking-tight leading-none">
            {score}
          </span>
          <span className="text-[10px] uppercase font-semibold text-[#141414]/40 mt-1">
            out of 100
          </span>
        </div>
      </div>

      <div className="text-center sm:text-left">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wide uppercase mb-1.5"
          style={{
            backgroundColor: score >= 75 ? "#ECFDF5" : score >= 50 ? "#FFFBEB" : "#FEF2F2",
            color: color,
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
          {label}
        </div>
        <p className="text-xs text-[#141414]/60 max-w-xs leading-relaxed">
          Evaluated against modern ATS algorithms, industry-standard skill taxonomies, and recruiter benchmarks.
        </p>
      </div>
    </div>
  );
}

// ─── Clean Pill Tag ───────────────────────────────────────────
function PillTag({ text, variant = "default" }) {
  const styles = {
    green: "bg-[#ECFDF5] text-[#047857] border-[#A7F3D0]",
    yellow: "bg-[#FFFBEB] text-[#B45309] border-[#FDE68A]",
    red: "bg-[#FEF2F2] text-[#B91C1C] border-[#FECACA]",
    default: "bg-[#FAF9F5] text-[#141414]/80 border-[#E6E2D8]",
  };

  return (
    <span
      className={`inline-flex items-center text-xs font-medium px-3 py-1 rounded-lg border transition-all ${
        styles[variant] || styles.default
      }`}
    >
      {text}
    </span>
  );
}

// ─── Top Editorial Navbar ─────────────────────────────────────
function ScorerNavbar({ user }) {
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-40 bg-[#FAF9F5]/90 backdrop-blur-md border-b border-[#E6E2D8]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-1.5 text-xs font-medium text-[#141414]/60 hover:text-[#141414] transition-colors"
          >
            <FiArrowLeft size={14} />
            <span className="hidden sm:inline">Dashboard</span>
          </button>

          <div className="h-4 w-px bg-[#E6E2D8] hidden sm:block" />

          <div
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="flex items-center -space-x-1">
              <span className="w-3 h-3 rounded-full bg-[#141414]" />
              <span className="w-3 h-3 rounded-full bg-[#141414]/70" />
            </div>
            <span className="font-extrabold text-sm tracking-tight text-[#141414]">
              SkillForge
            </span>
            <span className="rounded-full bg-[#F4F1EA] border border-[#E6E2D8] px-2 py-0.5 text-[10px] font-medium text-[#141414]/60">
              Resume Scorer
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#E6E2D8] bg-[#F4F1EA] text-xs font-medium text-[#141414]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>{user?.interviewCoin || 0} Coins</span>
          </div>
        </div>
      </div>
    </nav>
  );
}

// ─── Main Component ───────────────────────────────────────────
export default function Scorer({ setUser, user }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { resume } = useSelector((s) => s.resume);
  const navigate = useNavigate();

  const uploadResume = async () => {
    if (!file) return alert("Please select a PDF file.");
    let coinDeducted = false;
    try {
      setLoading(true);

      const coinResponse = await useCoins({ coins: 10, action: "resume-score" });
      if (!coinResponse) {
        alert("Insufficient interview coins or session expired. Please recharge your coins.");
        setLoading(false);
        return;
      }
      coinDeducted = true;

      setUser((prev) => ({
        ...prev,
        interviewCoin: coinResponse.interviewCoin,
      }));

      const formData = new FormData();
      formData.append("resume", file);
      const response = await api.post("/api/resume/upload", formData);
      dispatch(setResume(response.data.data));
    } catch (err) {
      console.log(err);
      if (coinDeducted) {
        const refund = await refundCoins(10);
        if (refund?.interviewCoin !== undefined) {
          setUser((prev) => ({ ...prev, interviewCoin: refund.interviewCoin }));
        }
      }
      const isRateLimit = err.response?.status === 429 || err.response?.data?.isRateLimit;
      const msg = isRateLimit
        ? "AI rate limit or quota exceeded. Your 10 coins have been refunded. Please wait a moment and try again."
        : err.response?.data?.message
        ? `${err.response.data.message} (10 coins refunded)`
        : "Upload Failed. 10 coins refunded.";
      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  // ── Step 2: Results View ─────────────────────────────────────
  if (resume) {
    return (
      <div className="bg-[#FAF9F5] text-[#141414] font-['Plus_Jakarta_Sans',sans-serif] min-h-screen">
        <ScorerNavbar user={user} />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-6">
          {/* Header Title & Actions */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 pb-6 border-b border-[#E6E2D8]">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full border border-[#E6E2D8] bg-[#F4F1EA] text-[11px] font-semibold text-[#141414]/70 uppercase tracking-wider mb-2">
                <FiAward size={13} className="text-[#141414]" />
                ATS Verification Complete
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#141414]">
                {resume.name || "Candidate Resume"}
              </h1>
              <p className="text-xs sm:text-sm text-[#141414]/60 mt-1">
                Synthesized evaluation based on resume structure, bullet point impact, and role alignment.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => dispatch(setResume(null))}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[#E6E2D8] bg-white text-xs font-semibold text-[#141414] hover:border-[#141414]/40 transition-all shadow-sm"
              >
                <FiRefreshCw size={13} />
                Re-upload Resume
              </button>
              <button
                onClick={() => navigate("/interview")}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#141414] text-white text-xs font-semibold hover:bg-black transition-all shadow-sm"
              >
                Practice Interview
                <FiChevronRight size={14} />
              </button>
            </div>
          </div>

          {/* Primary Score & Suggested Role Cockpit */}
          <div className="bg-white border border-[#E6E2D8] rounded-2xl p-6 sm:p-8 shadow-[0_2px_16px_rgba(0,0,0,0.03)] grid md:grid-cols-[55%_45%] gap-6 items-center">
            <div>
              <p className="text-[10px] uppercase font-bold text-[#141414]/40 tracking-wider mb-3">
                Overall Compatibility Score
              </p>
              <ScoreGauge score={resume.score || 0} />
            </div>

            <div className="md:border-l md:border-[#E6E2D8] md:pl-8 flex flex-col justify-center space-y-3">
              <p className="text-[10px] uppercase font-bold text-[#141414]/40 tracking-wider">
                Predicted Role Fit
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FAF9F5] border border-[#E6E2D8] flex items-center justify-center text-[#141414] shrink-0">
                  <FiUser size={18} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#141414] leading-snug">
                    {resume.suggestedRole || "Software Engineer"}
                  </h3>
                  <p className="text-xs text-[#141414]/50">
                    Highest confidence match based on extracted competencies
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Strengths & Weaknesses Grid */}
          <div className="grid md:grid-cols-2 gap-5">
            {/* Strengths */}
            <div className="bg-white border border-[#E6E2D8] rounded-2xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex flex-col">
              <div className="flex items-center gap-2 pb-3 mb-4 border-b border-[#E6E2D8]">
                <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <FiCheckCircle size={15} />
                </div>
                <h3 className="text-sm font-bold text-[#141414]">
                  Key Strengths & Highlights
                </h3>
              </div>

              <div className="flex flex-wrap gap-2 flex-1">
                {resume.strengths && resume.strengths.length > 0 ? (
                  resume.strengths.map((s, idx) => (
                    <PillTag key={idx} text={s} variant="green" />
                  ))
                ) : (
                  <p className="text-xs text-[#141414]/40">No specific strengths detected.</p>
                )}
              </div>
            </div>

            {/* Weaknesses */}
            <div className="bg-white border border-[#E6E2D8] rounded-2xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex flex-col">
              <div className="flex items-center gap-2 pb-3 mb-4 border-b border-[#E6E2D8]">
                <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                  <FiAlertCircle size={15} />
                </div>
                <h3 className="text-sm font-bold text-[#141414]">
                  Areas for Improvement
                </h3>
              </div>

              <div className="flex flex-wrap gap-2 flex-1">
                {resume.weaknesses && resume.weaknesses.length > 0 ? (
                  resume.weaknesses.map((w, idx) => (
                    <PillTag key={idx} text={w} variant="yellow" />
                  ))
                ) : (
                  <p className="text-xs text-[#141414]/40">No immediate red flags detected.</p>
                )}
              </div>
            </div>
          </div>

          {/* Missing Skills */}
          <div className="bg-white border border-[#E6E2D8] rounded-2xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
            <div className="flex items-center gap-2 pb-3 mb-4 border-b border-[#E6E2D8]">
              <div className="w-7 h-7 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
                <FiZap size={15} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#141414]">
                  Missing Target Skills & Keywords
                </h3>
                <p className="text-[11px] text-[#141414]/50">
                  Adding these tools or paradigms will significantly boost your recruiter keyword match.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {resume.missingSkills && resume.missingSkills.length > 0 ? (
                resume.missingSkills.map((s, idx) => (
                  <PillTag key={idx} text={s} variant="red" />
                ))
              ) : (
                <p className="text-xs text-[#141414]/40">No missing skills detected for this profile.</p>
              )}
            </div>
          </div>

          {/* Strategic Recommendations */}
          <div className="bg-white border border-[#E6E2D8] rounded-2xl p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
            <div className="flex items-center gap-2 pb-3 mb-5 border-b border-[#E6E2D8]">
              <div className="w-7 h-7 rounded-lg bg-[#FAF9F5] border border-[#E6E2D8] text-[#141414] flex items-center justify-center">
                <FiTrendingUp size={15} />
              </div>
              <h3 className="text-sm font-bold text-[#141414]">
                Actionable Next Steps & Revisions
              </h3>
            </div>

            <div className="space-y-3">
              {resume.recommendations && resume.recommendations.length > 0 ? (
                resume.recommendations.map((rec, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-3.5 rounded-xl bg-[#FAF9F5] border border-[#E6E2D8]/80 text-xs sm:text-sm text-[#141414]/80 leading-relaxed"
                  >
                    <span className="w-5 h-5 rounded-md bg-[#141414] text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <p>{rec}</p>
                  </div>
                ))
              ) : (
                <p className="text-xs text-[#141414]/40">No pending recommendations.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Step 1: Upload View ──────────────────────────────────────
  return (
    <div className="bg-[#FAF9F5] text-[#141414] font-['Plus_Jakarta_Sans',sans-serif] min-h-screen flex flex-col">
      <ScorerNavbar user={user} />

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-xl">
          {/* Architectural Crosshair Top Note */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#E6E2D8] bg-[#F4F1EA] text-[11px] font-semibold text-[#141414]/75 uppercase tracking-wider mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#141414]" />
              AI Resume Scorer · 10 Coins
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#141414]">
              How Does Your Resume Rate?
            </h1>
            <p className="text-xs sm:text-sm text-[#141414]/60 max-w-md mx-auto mt-2">
              Upload your PDF resume to receive a comprehensive ATS compatibility grade, detected skills overview, and high-impact improvement tips.
            </p>
          </div>

          {/* Main Card */}
          <div className="bg-white border border-[#E6E2D8] rounded-3xl p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.03)] relative overflow-hidden">
            {/* Step Counter */}
            <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#E6E2D8]">
              <span className="text-[11px] font-semibold tracking-wider text-[#141414]/40 uppercase">
                Step 01 / 02
              </span>
              <span className="text-[11px] font-medium text-[#141414]/60">
                PDF Document Required
              </span>
            </div>

            {/* Drop Zone */}
            <label
              className={`flex flex-col items-center justify-center w-full min-h-[220px] rounded-2xl border-2 border-dashed cursor-pointer transition-all p-6 text-center ${
                file
                  ? "border-[#141414] bg-[#FAF9F5]"
                  : "border-[#DCD7CB] hover:border-[#141414] bg-[#FAF9F5]/50 hover:bg-[#FAF9F5]"
              }`}
            >
              <div className="w-12 h-12 rounded-2xl bg-white border border-[#E6E2D8] shadow-sm flex items-center justify-center text-[#141414] mb-3">
                {file ? <FiFileText size={22} /> : <FiUploadCloud size={24} />}
              </div>

              {file ? (
                <div>
                  <p className="text-sm font-bold text-[#141414] truncate max-w-xs sm:max-w-md">
                    {file.name}
                  </p>
                  <p className="text-[11px] text-[#141414]/50 mt-1">
                    {(file.size / (1024 * 1024)).toFixed(2)} MB · Ready for Analysis
                  </p>
                  <span className="inline-block mt-3 text-[11px] font-medium text-[#141414] underline underline-offset-2">
                    Click to choose a different PDF
                  </span>
                </div>
              ) : (
                <div>
                  <p className="text-sm font-semibold text-[#141414]">
                    Click or drag your resume PDF here
                  </p>
                  <p className="text-[11px] text-[#141414]/45 mt-1">
                    Supports .pdf files up to 20MB
                  </p>
                </div>
              )}

              <input
                type="file"
                accept=".pdf"
                className="hidden"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
            </label>

            {/* Pricing / Guarantee Note */}
            <div className="flex items-center justify-between mt-4 px-1 text-[11px] text-[#141414]/50">
              <span className="flex items-center gap-1">
                <FiCheck size={12} className="text-emerald-600" /> Auto-refund on AI error
              </span>
              <span>10 Coins per audit</span>
            </div>

            {/* Action Button */}
            <button
              onClick={uploadResume}
              disabled={loading || !file}
              className="mt-5 w-full h-11 rounded-xl font-semibold text-xs bg-[#141414] text-white hover:bg-black disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Analyzing Resume with AI…</span>
                </>
              ) : (
                <>
                  <span>Analyze Resume & Calculate Score</span>
                  <FiChevronRight size={14} />
                </>
              )}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
