import React, { useRef } from "react";
import { motion } from "motion/react";
import {
  FiArrowLeft,
  FiAward,
  FiTarget,
  FiTrendingUp,
} from "react-icons/fi";
import DownloadButton from "../resume/DownloadButton";
import ThemeToggle from "../ThemeToggle";
import { useNavigate } from "react-router-dom";

function Step3Report({
  report,
  user,
  setUser,
}) {
  const reportRef = useRef(null);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FAF9F5] dark:bg-[#090A0F] text-[#141414] dark:text-[#F9FAFB] flex items-center justify-center p-3 sm:p-5 transition-colors">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-5xl rounded-2xl sm:rounded-[24px] bg-white dark:bg-[#12141C] border border-[#E6E2D8] dark:border-[#222634] overflow-hidden shadow-xl transition-colors"
      >
        <div>
          {/* Header */}
          <div className="border-b border-[#E6E2D8] dark:border-[#222634] px-4 sm:px-8 py-5 sm:py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <button
                  onClick={() => navigate("/dashboard")}
                  className="inline-flex items-center gap-1.5 text-white dark:text-black rounded-full border border-black dark:border-white bg-[#141414] dark:bg-white px-3 py-1.5 hover:opacity-90 transition-all text-xs font-semibold"
                >
                  <FiArrowLeft size={13} />
                  <span>Dashboard</span>
                </button>
                <ThemeToggle compact={true} />
              </div>

              <h1 className="text-xl sm:text-2xl font-bold text-[#141414] dark:text-white">
                Interview Performance Report
              </h1>

              <p className="text-xs text-[#141414]/60 dark:text-white/60 mt-1 mb-3">
                AI Synthesized Performance Analysis & Question Rubric
              </p>

              <DownloadButton
                resumeRef={reportRef}
                user={user}
                setUser={setUser}
              />
            </div>

            <div className="flex items-center gap-2.5 self-start sm:self-auto rounded-2xl border border-emerald-300 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/40 px-3 sm:px-4 py-2">
              <FiAward className="text-emerald-600 dark:text-emerald-400" size={16} />
              <span className="text-xs sm:text-sm font-semibold text-emerald-800 dark:text-emerald-300">
                Evaluation Complete
              </span>
            </div>
          </div>

          {/* Body */}
          <div className="p-4 sm:p-8" ref={reportRef}>

            {/* Overall Score */}

            <div className="grid md:grid-cols-3 gap-5">

              <div className="rounded-2xl bg-[#17181E] border border-white/10 p-6">

                <div className="w-10 h-10 rounded-xl bg-white text-black flex items-center justify-center">

                  <FiTarget size={18} />

                </div>

                <p className="mt-5 text-zinc-500 text-xs">

                  Overall Score

                </p>

                <h2 className="mt-2 text-4xl font-bold text-white">

                  {report.overallScore}

                  <span className="text-lg text-zinc-500">

                    /100

                  </span>

                </h2>

              </div>

              <div className="rounded-2xl bg-[#17181E] border border-white/10 p-6">

                <div className="w-10 h-10 rounded-xl bg-white text-black flex items-center justify-center">

                  <FiTrendingUp size={18} />

                </div>

                <p className="mt-5 text-zinc-500 text-xs">

                  Questions

                </p>

                <h2 className="mt-2 text-4xl font-bold text-white">

                  {report.questions?.length || 0}

                </h2>

              </div>

              <div className="rounded-2xl bg-[#17181E] border border-white/10 p-6">

                <div className="w-10 h-10 rounded-xl bg-white text-black flex items-center justify-center">

                  <FiAward size={18} />

                </div>

                <p className="mt-5 text-zinc-500 text-xs">

                  Status

                </p>

                <h2 className="mt-2 text-xl font-bold text-green-400">

                  Completed

                </h2>

              </div>

            </div>
                        {/* Summary */}

            <div className="mt-6 rounded-2xl bg-[#17181E] border border-white/10 p-6">

              <h3 className="text-lg font-semibold text-white">
                Interview Summary
              </h3>

              <p className="mt-3 text-sm leading-7 text-zinc-400">
                {report.summary}
              </p>

            </div>

            {/* Strengths & Weaknesses */}

            <div className="grid lg:grid-cols-2 gap-5 mt-6">

              {/* Strengths */}

              <div className="rounded-2xl bg-[#17181E] border border-green-500/20 p-6">

                <div className="flex items-center gap-2.5">

                  <div className="w-9 h-9 rounded-lg bg-green-500 flex items-center justify-center">

                    <FiTrendingUp
                      className="text-white"
                      size={16}
                    />

                  </div>

                  <h3 className="text-lg font-semibold text-white">

                    Strengths

                  </h3>

                </div>

                <div className="mt-5 space-y-3">

                  {report.strengths?.length > 0 ? (

                    report.strengths.map((item, index) => (

                      <div
                        key={index}
                        className="flex items-start gap-3 rounded-xl bg-green-500/5 border border-green-500/10 p-3.5"
                      >

                        <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 text-xs">

                          ✓

                        </div>

                        <p className="text-sm text-zinc-300 leading-6">

                          {item}

                        </p>

                      </div>

                    ))

                  ) : (

                    <p className="text-zinc-500 text-sm">

                      No strengths available.

                    </p>

                  )}

                </div>

              </div>

              {/* Weaknesses */}

              <div className="rounded-2xl bg-[#17181E] border border-red-500/20 p-6">

                <div className="flex items-center gap-2.5">

                  <div className="w-9 h-9 rounded-lg bg-red-500 flex items-center justify-center text-sm">

                    ✕

                  </div>

                  <h3 className="text-lg font-semibold text-white">

                    Areas to Improve

                  </h3>

                </div>

                <div className="mt-5 space-y-3">

                  {report.weaknesses?.length > 0 ? (

                    report.weaknesses.map((item, index) => (

                      <div
                        key={index}
                        className="flex items-start gap-3 rounded-xl bg-red-500/5 border border-red-500/10 p-3.5"
                      >

                        <div className="w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 text-xs">

                          !

                        </div>

                        <p className="text-sm text-zinc-300 leading-6">

                          {item}

                        </p>

                      </div>

                    ))

                  ) : (

                    <p className="text-zinc-500 text-sm">

                      No weaknesses found.

                    </p>

                  )}

                </div>

              </div>

            </div>
                        {/* Recommendations */}

            <div className="mt-6 rounded-2xl bg-[#17181E] border border-white/10 p-6">

              <h3 className="text-lg font-semibold text-white">
                Recommendations
              </h3>

              <div className="mt-5 space-y-3">

                {report.recommendations?.length > 0 ? (

                  report.recommendations.map((item, index) => (

                    <div
                      key={index}
                      className="flex items-start gap-3.5 rounded-xl border border-white/10 bg-white/[0.03] p-4"
                    >

                      <div className="w-7 h-7 rounded-full bg-white text-black flex items-center justify-center font-semibold flex-shrink-0 text-sm">

                        {index + 1}

                      </div>

                      <p className="text-sm text-zinc-300 leading-6">

                        {item}

                      </p>

                    </div>

                  ))

                ) : (

                  <p className="text-zinc-500 text-sm">

                    No recommendations available.

                  </p>

                )}

              </div>

            </div>

            {/* Question Wise Feedback */}

            <div className="mt-8">

              <h3 className="text-xl font-bold text-white mb-5">

                Question Wise Analysis

              </h3>

              <div className="space-y-5">

                {report.questions?.map((item, index) => (

                  <motion.div

                    key={index}

                    initial={{ opacity: 0 }}

                    animate={{ opacity: 1 }}

                    className="rounded-2xl bg-[#17181E] border border-white/10 p-6"

                  >

                    {/* Question */}

                    <div>

                      <span className="text-[11px] uppercase tracking-widest text-zinc-500">

                        Question {index + 1}

                      </span>

                      <h4 className="mt-2.5 text-base font-semibold text-white leading-7">

                        {item.question}

                      </h4>

                    </div>

                    {/* Answer */}

                    <div className="mt-6">

                      <p className="text-[11px] uppercase tracking-widest text-zinc-500">

                        Your Answer

                      </p>

                      <p className="mt-2.5 text-sm leading-6 text-zinc-300">

                        {item.userAnswer || "No answer submitted"}

                      </p>

                    </div>

                    {/* Metrics */}

                    <div className="grid md:grid-cols-4 gap-3.5 mt-6">

                      <div className="rounded-xl bg-black/20 p-3.5">

                        <p className="text-xs text-zinc-500">
                          Score
                        </p>

                        <h5 className="mt-2 text-xl font-bold text-white">

                          {item.feedback?.score ?? 0}

                        </h5>

                      </div>

                      <div className="rounded-xl bg-black/20 p-3.5">

                        <p className="text-xs text-zinc-500">
                          Clarity
                        </p>

                        <h5 className="mt-2 text-xl font-bold text-white">

                          {item.feedback?.clarity ?? 0}

                        </h5>

                      </div>

                      <div className="rounded-xl bg-black/20 p-3.5">

                        <p className="text-xs text-zinc-500">
                          Relevance
                        </p>

                        <h5 className="mt-2 text-xl font-bold text-white">

                          {item.feedback?.relevance ?? 0}

                        </h5>

                      </div>

                      <div className="rounded-xl bg-black/20 p-3.5">

                        <p className="text-xs text-zinc-500">
                          Communication
                        </p>

                        <h5 className="mt-2 text-xl font-bold text-white">

                          {item.feedback?.communication ?? 0}

                        </h5>

                      </div>

                    </div>

                    {/* AI Feedback */}

                    <div className="mt-6 rounded-xl border border-green-500/20 bg-green-500/5 p-4.5">

                      <p className="text-[11px] uppercase tracking-widest text-green-400">

                        AI Feedback

                      </p>

                      <p className="mt-2.5 text-sm leading-6 text-zinc-300">

                        {item.feedback?.feedback ||
                          "No feedback available."}

                      </p>

                    </div>

                    {/* Improvements */}

                    {item.feedback?.improvements?.length > 0 && (

                      <div className="mt-6">

                        <h5 className="text-sm font-semibold text-white">

                          Suggested Improvements

                        </h5>

                        <div className="mt-3.5 space-y-2.5">

                          {item.feedback.improvements.map((tip, i) => (

                            <div
                              key={i}
                              className="rounded-lg border border-white/10 bg-white/[0.03] p-3.5"
                            >

                              <p className="text-sm text-zinc-300">

                                • {tip}

                              </p>

                            </div>

                          ))}

                        </div>

                      </div>

                    )}

                  </motion.div>

                ))}

              </div>

            </div>

       
        </div>
        </div>

      </motion.div>

    </div>

  );

}

export default Step3Report;
