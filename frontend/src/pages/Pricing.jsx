import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsStars } from "react-icons/bs";
import {
  FiArrowLeft,
  FiShield,
  FiZap,
  FiHelpCircle,
  FiChevronDown,
  FiChevronUp,
  FiCheck,
} from "react-icons/fi";
import PricingCard from "../components/PricingCard";
import api from "../utils/axios";

const plans = [
  {
    title: "Free",
    price: "Free",
    coins: 150,
    button: "Claimed upon Signup",
    popular: false,
    disabled: true,
    features: [
      "150 Starter Coins credited on registration",
      "3 Full-Length AI Mock Interviews (50 coins each)",
      "7 Tailored Engineering Roadmaps (20 coins each)",
      "15 Complete Resume ATS Audits (10 coins each)",
      "Standard AI model inference queue",
    ],
  },
  {
    title: "Starter",
    price: "199",
    coins: 300,
    button: "Get 300 Coins (₹199)",
    popular: true,
    disabled: false,
    features: [
      "+300 Additional Interview Coins",
      "6 Full Mock Interviews with Live IDE & Voice Evaluation",
      "15 In-Depth Career Blueprint Roadmaps & YouTube Guides",
      "30 Comprehensive Resume ATS Keyword & Bullet Audits",
      "Priority AI Throughput & Dedicated Model Routing",
      "Automatic Coin Refund Protection on Any AI Service Error",
    ],
  },
];

const COIN_COST_ITEMS = [
  { feature: "AI Mock Interview Session", cost: "50 Coins", desc: "Live code editor, real-time voice, follow-up questions & scorecard" },
  { feature: "Career Roadmap Generator", cost: "20 Coins", desc: "Personalized syllabus with curated YouTube videos & documentation" },
  { feature: "Resume ATS Scorer & Audit", cost: "10 Coins", desc: "Keyword gap detection, score gauge, and line-by-line recommendations" },
  { feature: "ATS Resume PDF Download", cost: "10 Coins", desc: "High-compliance, recruiter-ready PDF export" },
];

import ThemeToggle from "../components/ThemeToggle";

// ... existing code ...
export default function Pricing({ user, setUser }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showCostGuide, setShowCostGuide] = useState(false);

  const handlePayment = async (plan) => {
    if (plan.disabled || loading) return;

    try {
      setLoading(true);

      const result = await api.post("/api/billing/create", {
        planId: plan.title.toLowerCase(),
      });

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: result.data.order.amount,
        currency: result.data.order.currency,
        name: "SkillForge",
        description: `${plan.title} Pack - ${plan.coins} Interview Coins`,
        order_id: result.data.order.id,
        handler: async function (response) {
          try {
            await api.post("/api/billing/verify", response);
            const coinRes = await api.post("/api/auth/add-coins", {
              coins: plan.coins,
            });

            if (setUser && coinRes.data?.interviewCoin !== undefined) {
              setUser((prev) => ({
                ...prev,
                interviewCoin: coinRes.data.interviewCoin,
              }));
            }

            alert("Payment Successful! 🎉 300 Interview Coins added to your account.");
            navigate("/dashboard");
          } catch (error) {
            console.error(error);
            alert(
              error?.response?.data?.message || "Payment verification failed. If charged, contact support."
            );
          } finally {
            setLoading(false);
          }
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
          },
        },
        theme: {
          color: "#141414",
        },
      };

      if (!window.Razorpay) {
        alert("Payment gateway is loading. Please check your internet connection and try again.");
        setLoading(false);
        return;
      }

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Unable to initiate payment. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] dark:bg-[#090A0F] text-[#141414] dark:text-[#F9FAFB] font-['Plus_Jakarta_Sans',sans-serif] flex flex-col selection:bg-[#141414] selection:text-white transition-colors">
      {/* ── TOP EDITORIAL NAVBAR ── */}
      <nav className="sticky top-0 z-40 bg-[#FAF9F5]/90 dark:bg-[#090A0F]/90 backdrop-blur-md border-b border-[#E6E2D8] dark:border-[#222634] transition-colors">
        <div className="max-w-6xl mx-auto flex h-14 items-center justify-between px-3 sm:px-6">
          {/* Back Button & Brand */}
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={() => navigate("/dashboard")}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#E6E2D8] dark:border-[#222634] bg-white dark:bg-[#12141C] text-xs font-semibold text-[#141414] dark:text-white hover:border-[#141414]/40 dark:hover:border-white/40 transition-all shadow-sm"
            >
              <FiArrowLeft size={14} />
              <span className="hidden sm:inline">Back to Dashboard</span>
              <span className="sm:hidden">Back</span>
            </button>

            <div className="h-4 w-px bg-[#E6E2D8] dark:bg-[#222634] hidden sm:block" />

            <div
              onClick={() => navigate("/dashboard")}
              className="hidden sm:flex items-center gap-2 cursor-pointer"
            >
              <div className="flex items-center -space-x-1">
                <span className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-[#141414] dark:bg-white" />
                <span className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-[#141414]/70 dark:bg-white/60" />
              </div>
              <span className="font-extrabold text-xs sm:text-sm tracking-tight text-[#141414] dark:text-white">
                SkillForge
              </span>
              <span className="hidden md:inline-flex rounded-full bg-[#F4F1EA] dark:bg-[#1A1D29] border border-[#E6E2D8] dark:border-[#222634] px-2 py-0.5 text-[10px] font-medium text-[#141414]/60 dark:text-white/60">
                Credits & Pricing
              </span>
            </div>
          </div>

          {/* Right Action: Current Balance Badge & ThemeToggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle compact={true} />

            <div className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full border border-[#E6E2D8] dark:border-[#222634] bg-[#F4F1EA] dark:bg-[#161822] text-xs font-bold text-[#141414] dark:text-white shadow-sm">
              <BsStars className="text-amber-500" size={13} />
              <span>{user?.interviewCoin ?? 0}</span>
              <span className="hidden sm:inline">Coins</span>
            </div>

            <button
              onClick={() => setShowCostGuide(!showCostGuide)}
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#E6E2D8] dark:border-[#222634] bg-white dark:bg-[#12141C] text-xs font-medium text-[#141414]/70 dark:text-white/70 hover:text-[#141414] dark:hover:text-white hover:border-[#141414]/40 dark:hover:border-white/40 transition-all shadow-sm"
            >
              <FiHelpCircle size={13} />
              <span>Coin Usage</span>
              {showCostGuide ? <FiChevronUp size={12} /> : <FiChevronDown size={12} />}
            </button>
          </div>
        </div>
      </nav>

      {/* ── EXPANDABLE COIN USAGE GUIDE DRAWER ── */}
      {showCostGuide && (
        <div className="bg-white dark:bg-[#12141C] border-b border-[#E6E2D8] dark:border-[#222634] py-4 px-4 sm:px-6 transition-all">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#141414] dark:text-white">
                How Interview Coins Work on SkillForge
              </h3>
              <button
                onClick={() => setShowCostGuide(false)}
                className="text-xs text-[#141414]/50 dark:text-white/50 hover:text-[#141414] dark:hover:text-white"
              >
                Dismiss ✕
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              {COIN_COST_ITEMS.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-2xl bg-[#FAF9F5] dark:bg-[#161822] border border-[#E6E2D8] dark:border-[#222634] flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="text-xs font-bold text-[#141414] dark:text-white">{item.feature}</span>
                      <span className="text-[10px] font-bold text-[#141414] dark:text-white bg-white dark:bg-[#1E2230] px-2 py-0.5 rounded border border-[#E6E2D8] dark:border-[#222634]">
                        {item.cost}
                      </span>
                    </div>
                    <p className="text-[10px] text-[#141414]/55 dark:text-white/50 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── MAIN HERO & PRICING CONTAINER ── */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 py-10 sm:py-14">
        {/* Editorial Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#E6E2D8] dark:border-[#222634] bg-[#F4F1EA] dark:bg-[#161822] text-[11px] font-semibold text-[#141414]/75 dark:text-white/75 uppercase tracking-wider mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#141414] dark:bg-white" />
            Transparent Pricing · Zero Hidden Subscriptions
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#141414] dark:text-white leading-tight">
            Interview Coins for Every Career Milestone.
          </h1>

          <p className="mt-3 text-xs sm:text-sm text-[#141414]/60 dark:text-white/60 max-w-lg mx-auto leading-relaxed">
            Every user receives 150 coins upon signup. Top up your balance anytime to practice realistic AI mock interviews, compile step-by-step career roadmaps, and audit your resume against ATS benchmarks.
          </p>
        </div>

        {/* ── PRICING CARDS GRID (FREE & STARTER) ── */}
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 max-w-3xl mx-auto items-stretch">
          {plans.map((plan) => (
            <PricingCard
              key={plan.title}
              {...plan}
              loading={loading && plan.title === "Starter"}
              onBuy={() => handlePayment(plan)}
            />
          ))}
        </div>

        {/* ── GUARANTEE & COIN USAGE REFERENCE STRIP ── */}
        <div className="max-w-3xl mx-auto mt-12 pt-8 border-t border-[#E6E2D8] dark:border-[#222634]">
          <div className="grid sm:grid-cols-3 gap-4 text-center sm:text-left">
            <div className="p-4 rounded-2xl bg-white dark:bg-[#12141C] border border-[#E6E2D8] dark:border-[#222634]">
              <div className="flex items-center gap-2 mb-1 justify-center sm:justify-start">
                <FiZap className="text-amber-500" size={15} />
                <h4 className="text-xs font-bold text-[#141414] dark:text-white">Instant Coin Credit</h4>
              </div>
              <p className="text-[11px] text-[#141414]/55 dark:text-white/50 leading-relaxed">
                Purchased coins are immediately credited to your account balance as soon as payment is confirmed.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-[#12141C] border border-[#E6E2D8] dark:border-[#222634]">
              <div className="flex items-center gap-2 mb-1 justify-center sm:justify-start">
                <FiShield className="text-emerald-600 dark:text-emerald-400" size={15} />
                <h4 className="text-xs font-bold text-[#141414] dark:text-white">Zero-Risk Auto Refund</h4>
              </div>
              <p className="text-[11px] text-[#141414]/55 dark:text-white/50 leading-relaxed">
                If an AI service reaches an API rate limit or error, your coins are refunded back to your account automatically.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-[#12141C] border border-[#E6E2D8] dark:border-[#222634]">
              <div className="flex items-center gap-2 mb-1 justify-center sm:justify-start">
                <BsStars className="text-[#141414] dark:text-white" size={15} />
                <h4 className="text-xs font-bold text-[#141414] dark:text-white">No Expiration Date</h4>
              </div>
              <p className="text-[11px] text-[#141414]/55 dark:text-white/50 leading-relaxed">
                Interview coins never expire. Use them at your own pace across all AI tools on the SkillForge platform.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Note */}
      <footer className="py-6 border-t border-[#E6E2D8] dark:border-[#222634] text-center text-xs text-[#141414]/40 dark:text-white/40">
        SkillForge · Secure Payments Handled via Razorpay
      </footer>
    </div>
  );
}
