import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  FiArrowLeft,
  FiArrowRight,
  FiBriefcase,
  FiCheck,
  FiCheckCircle,
  FiFileText,
  FiUploadCloud,
  FiZap,
  FiShield,
} from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setResume } from "../../redux/resumeSlice";
import api from "../../utils/axios";
import { startInterview } from "../../api/interview.api";
import { useCoins, refundCoins } from "../../api/user.api";

const POPULAR_ROLES = [
  "Frontend Developer",
  "Backend Engineer",
  "Full Stack Developer",
  "DevOps Engineer",
  "AI / ML Engineer",
];

function Step1SetUp({ user, setUser }) {
  const dispatch = useDispatch();
  const { resume } = useSelector((state) => state.resume);

  const [role, setRole] = useState("");
  const [type, setType] = useState("technical");
  const [useResume, setUseResume] = useState(!!resume);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [starting, setStarting] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setUseResume(!!resume);
    if (resume?.role) setRole(resume.role);
  }, [resume]);

  const uploadResume = async () => {
    if (!file) return;
    let coinDeducted = false;
    try {
      setUploading(true);
      const coinResponse = await useCoins({ coins: 10, action: "resume-score" });
      if (!coinResponse) {
        alert("Insufficient interview coins or session expired.");
        setUploading(false);
        return;
      }
      coinDeducted = true;
      setUser((prev) => ({ ...prev, interviewCoin: coinResponse.interviewCoin }));
      const formData = new FormData();
      formData.append("resume", file);
      const response = await api.post("/api/resume/upload", formData);
      dispatch(setResume(response.data.data));
      setUploading(false);
    } catch (error) {
      console.log(error);
      if (coinDeducted) {
        const refund = await refundCoins(10);
        if (refund?.interviewCoin !== undefined) {
          setUser((prev) => ({ ...prev, interviewCoin: refund.interviewCoin }));
        }
      }
      const isRateLimit = error.response?.status === 429 || error.response?.data?.isRateLimit;
      alert(
        isRateLimit
          ? "AI rate limit or quota reached. Your 10 coins have been refunded."
          : error.response?.data?.message
          ? `${error.response.data.message} (10 coins refunded)`
          : "Failed to analyze resume. Coins refunded."
      );
      setUploading(false);
    }
  };

  const start = async () => {
    if (!role.trim()) {
      alert("Please enter or select a target role");
      return;
    }

    if (!user?.interviewCoin || user.interviewCoin < 50) {
      alert("You need at least 50 interview coins to start an interview. Please top up your coins.");
      return;
    }

    try {
      setStarting(true);
      const response = await startInterview({ role, type, useResume, resume });

      if (response && response.interviewId) {
        const coinResponse = await useCoins({ coins: 50, action: "interview" });
        if (coinResponse?.interviewCoin !== undefined) {
          setUser((prev) => ({ ...prev, interviewCoin: coinResponse.interviewCoin }));
        }
        setStarting(false);
        navigate(`/interview/${response.interviewId}`);
      } else {
        alert("Failed to start interview. Please try again.");
        setStarting(false);
      }
    } catch (error) {
      console.log(error);
      const isRateLimit = error.response?.status === 429 || error.response?.data?.isRateLimit;
      alert(
        isRateLimit
          ? "AI service rate limit or quota reached. No coins were charged. Please wait a moment and try again."
          : error.response?.data?.message || "Failed to start interview. No coins were charged."
      );
      setStarting(false);
    }
  };

  const firstName = user?.name?.split(" ")[0] || "Candidate";

  return (
    <div className="bg-[#FAF9F5] text-[#141414] font-['Plus_Jakarta_Sans',sans-serif] min-h-screen flex flex-col justify-between py-6 sm:py-10 px-4">
      {/* Top Bar Navigation */}
      <div className="max-w-5xl mx-auto w-full flex items-center justify-between mb-6">
        <button
          onClick={() => navigate("/dashboard")}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#E6E2D8] bg-white text-xs font-medium text-[#141414]/70 hover:text-[#141414] hover:border-[#141414]/40 transition-all shadow-sm"
        >
          <FiArrowLeft size={13} />
          <span>Back to Dashboard</span>
        </button>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#E6E2D8] bg-[#F4F1EA] text-xs font-semibold text-[#141414]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>{user?.interviewCoin || 0} Coins</span>
          </div>
        </div>
      </div>

      {/* Main Cockpit Card */}
      <div className="max-w-5xl mx-auto w-full bg-white border border-[#E6E2D8] rounded-3xl overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.03)] grid lg:grid-cols-[40%_60%] my-auto">
        {/* ── LEFT PANEL ── */}
        <div className="bg-[#FDFBF7] p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-[#E6E2D8] flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#E6E2D8] bg-[#F4F1EA] text-[11px] font-semibold text-[#141414]/75 uppercase tracking-wider mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#141414]" />
              AI Simulation Suite · 50 Coins
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#141414] leading-tight">
              Ready for your next round, {firstName}?
            </h1>

            <p className="mt-2 text-xs sm:text-sm text-[#141414]/60 leading-relaxed">
              Practice hyper-realistic engineering interviews. Our AI interviewer asks deep contextual follow-ups, evaluates syntax, and delivers an instant performance rubric.
            </p>

            {/* Feature Checklist */}
            <div className="mt-6 space-y-2.5">
              {[
                { title: "Personalized AI Questions", desc: "Tailored directly to your seniority and tech stack" },
                { title: "Resume-Grounded Scenarios", desc: "Questions referenced from your past accomplishments" },
                { title: "Deep Evaluation Rubric", desc: "Instant score on communication, accuracy, and depth" },
                { title: "Real-Time Voice & IDE Support", desc: "Integrated code editor with interactive follow-ups" },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-2.5 rounded-xl border border-[#E6E2D8] bg-white shadow-sm"
                >
                  <div className="w-5 h-5 rounded-md bg-[#141414] text-white flex items-center justify-center shrink-0 mt-0.5">
                    <FiCheck size={12} />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-[#141414]">{item.title}</h3>
                    <p className="text-[10px] text-[#141414]/55 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Guarantee / Cost Footer */}
          <div className="mt-8 pt-4 border-t border-[#E6E2D8] flex items-center justify-between text-[11px] text-[#141414]/60">
            <span className="flex items-center gap-1.5">
              <FiShield className="text-emerald-600" size={13} /> Safe Guarantee: Zero coins charged on system errors.
            </span>
          </div>
        </div>

        {/* ── RIGHT PANEL: CONFIGURATION ── */}
        <div className="p-6 sm:p-8 bg-white flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#E6E2D8]">
              <div>
                <h2 className="text-lg font-bold text-[#141414]">Configure Interview</h2>
                <p className="text-xs text-[#141414]/50">Choose your targeted position and interview format</p>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-[#E6E2D8] bg-[#FAF9F5] text-[#141414]/60">
                STEP 1 OF 2
              </span>
            </div>

            <div className="mt-5 space-y-5">
              {/* Role Input */}
              <div>
                <label className="text-[11px] font-semibold text-[#141414]/80 uppercase tracking-wider block mb-1.5">
                  Target Engineering Role
                </label>
                <div className="relative">
                  <FiBriefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#141414]/40" size={15} />
                  <input
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="e.g. Senior Backend Engineer"
                    className="w-full h-11 rounded-xl bg-[#FAF9F5] border border-[#DCD7CB] pl-10 pr-4 text-xs sm:text-sm text-[#141414] placeholder-[#141414]/30 outline-none focus:border-[#141414] focus:bg-white transition"
                  />
                </div>

                {/* Popular Role Chips */}
                <div className="flex flex-wrap gap-1.5 mt-2.5">
                  {POPULAR_ROLES.map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setRole(r)}
                      className={`text-[11px] px-2.5 py-1 rounded-lg border transition-all ${
                        role === r
                          ? "bg-[#141414] text-white border-[#141414]"
                          : "bg-white text-[#141414]/70 border-[#E6E2D8] hover:border-[#141414]/40"
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              {/* Interview Type Selector */}
              <div>
                <label className="text-[11px] font-semibold text-[#141414]/80 uppercase tracking-wider block mb-1.5">
                  Interview Track
                </label>
                <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-[#FAF9F5] border border-[#E6E2D8]">
                  {[
                    { id: "technical", label: "Technical Round", desc: "Data structures, system architecture, coding" },
                    { id: "hr", label: "HR / Behavioral", desc: "Situational questions, leadership, soft skills" },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setType(item.id)}
                      className={`p-2.5 rounded-lg text-left transition-all ${
                        type === item.id
                          ? "bg-white text-[#141414] shadow-sm border border-[#E6E2D8]"
                          : "text-[#141414]/60 hover:text-[#141414]"
                      }`}
                    >
                      <p className="text-xs font-bold">{item.label}</p>
                      <p className="text-[10px] text-[#141414]/50 mt-0.5 leading-snug">{item.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Resume Toggle Card */}
              <div className="rounded-2xl border border-[#E6E2D8] bg-[#FAF9F5] p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h3 className="text-xs font-bold text-[#141414]">Personalize with Resume</h3>
                    <p className="text-[11px] text-[#141414]/60 mt-0.5">
                      Ground interview questions in your specific career projects and tech stacks.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setUseResume(!useResume)}
                    className={`relative shrink-0 w-11 h-6 rounded-full transition-colors ${
                      useResume ? "bg-[#141414]" : "bg-[#DCD7CB]"
                    }`}
                  >
                    <div
                      className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all shadow-sm ${
                        useResume ? "left-5.5" : "left-0.5"
                      }`}
                    />
                  </button>
                </div>

                {/* Resume Status / Upload Area */}
                {useResume && (
                  <div className="mt-3 pt-3 border-t border-[#E6E2D8]">
                    {resume ? (
                      <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-emerald-200">
                        <div className="flex items-center gap-2 min-w-0">
                          <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                            <FiFileText size={14} />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-semibold text-[#141414] truncate">
                              {resume.name || "Uploaded Resume Detected"}
                            </p>
                            <p className="text-[10px] text-emerald-700">Resume parsed & ready</p>
                          </div>
                        </div>
                        <span className="text-[10px] font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                          Active
                        </span>
                      </div>
                    ) : (
                      <div className="border border-dashed border-[#DCD7CB] hover:border-[#141414] rounded-xl p-3 bg-white text-center cursor-pointer">
                        <label className="cursor-pointer block">
                          <FiUploadCloud className="mx-auto text-[#141414]/40 mb-1" size={18} />
                          <p className="text-xs font-medium text-[#141414]">
                            {file ? file.name : "Upload a PDF Resume (10 Coins)"}
                          </p>
                          <p className="text-[10px] text-[#141414]/40 mt-0.5">Max 20MB · PDF only</p>
                          <input
                            hidden
                            type="file"
                            accept=".pdf"
                            onChange={(e) => {
                              if (e.target.files?.[0]) setFile(e.target.files[0]);
                            }}
                          />
                        </label>
                        {file && (
                          <button
                            type="button"
                            onClick={uploadResume}
                            disabled={uploading}
                            className="mt-2 text-xs px-3 py-1 rounded-lg bg-[#141414] text-white font-medium hover:bg-black transition-all"
                          >
                            {uploading ? "Parsing..." : "Confirm & Parse Resume"}
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Action CTA Button */}
          <div className="pt-4 border-t border-[#E6E2D8]">
            <button
              disabled={!role.trim() || starting || (useResume && !resume)}
              onClick={start}
              className="w-full h-12 rounded-xl bg-[#141414] text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 hover:bg-black disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm"
            >
              {starting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Configuring AI Agents & Rooms…</span>
                </>
              ) : (
                <>
                  <span>Begin Interview Session (50 Coins)</span>
                  <FiArrowRight size={15} />
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Footer Credit */}
      <div className="text-center mt-6 text-xs text-[#141414]/40">
        SkillForge · AI Career Acceleration Platform
      </div>
    </div>
  );
}

export default Step1SetUp;
