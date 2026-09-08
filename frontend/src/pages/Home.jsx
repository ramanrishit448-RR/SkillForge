import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FiVideo,
  FiFileText,
  FiMap,
  FiBarChart2,
  FiSearch,
  FiBell,
  FiLayers,
  FiArrowRight,
  FiCheckCircle,
  FiCpu,
  FiTerminal,
  FiZap,
} from "react-icons/fi";
import { LoginModal } from "../components/LoginModel";
import QuarterCircleOrbit from "../components/QuarterCircleOrbit";

gsap.registerPlugin(ScrollTrigger);

const AI_TEAM_MEMBERS = [
  {
    id: "interview",
    name: "INTERVIEW AGENT",
    status: "Active",
    statusDot: "bg-emerald-500",
    statusText: "text-emerald-700",
    desc: "Conducts realistic technical rounds with code execution, speech analysis, and follow-up questioning.",
    tags: ["VOICE", "LIVE IDE", "RUBRIC"],
  },
  {
    id: "resume",
    name: "RESUME AGENT",
    status: "Active",
    statusDot: "bg-blue-500",
    statusText: "text-blue-700",
    desc: "Vector-indexes resumes against 1,200+ industry job descriptions using Qdrant & Gemini to catch gaps.",
    tags: ["QDRANT", "ATS AUDIT", "SEMANTIC"],
  },
  {
    id: "roadmap",
    name: "ROADMAP AGENT",
    status: "Active",
    statusDot: "bg-amber-500",
    statusText: "text-amber-700",
    desc: "Generates custom multi-week engineering curricula backed by real-time web verification and tutorials.",
    tags: ["AGENTIC", "YOUTUBE", "PROJECTS"],
  },
  {
    id: "feedback",
    name: "FEEDBACK AGENT",
    status: "Active",
    statusDot: "bg-purple-500",
    statusText: "text-purple-700",
    desc: "Evaluates edge cases, algorithmic efficiency, and communication clarity to return structured grading reports.",
    tags: ["DIAGNOSTICS", "SCORING", "INSIGHTS"],
  },
];

const FEATURE_ITEMS = [
  {
    tag: "01 / SIMULATION",
    badge: "Live Monaco Code",
    title: "Realistic Live Code Proctored Environment",
    desc: "Move beyond multiple-choice tests. Write real code in an embedded Monaco Editor evaluated turn-by-turn by Groq and LangGraph.",
    subtext: "Groq LPU · Sub-second Evaluation",
  },
  {
    tag: "02 / VECTOR SEARCH",
    badge: "Qdrant Semantic",
    title: "Contextual ATS Vector Matching",
    desc: "Traditional platforms use simple keyword regex. SkillForge maps your project descriptions semantically against target tech stacks.",
    subtext: "1,200+ Live Tech Job Profiles",
  },
  {
    tag: "03 / TRANSPARENT",
    badge: "Pay-As-You-Go",
    title: "Usage-Based Coin Economics",
    desc: "Zero recurring subscription locks. Pay only for the interviews, roadmaps, and resume analyses you actually use.",
    subtext: "150 Coins Free On Signup",
  },
  {
    tag: "04 / AGENTIC ROADMAPS",
    badge: "Adaptive Curricula",
    title: "Dynamic Skill Gap Curricula",
    desc: "Continuous skill gap analysis maps curated video tutorials, real-world milestones, and architectural repos directly into your learning tree.",
    subtext: "Curated YouTube & Web Sources",
  },
  {
    tag: "05 / RUBRIC DIAGNOSTICS",
    badge: "Granular Scoring",
    title: "Algorithmic & Speech Diagnostics",
    desc: "In-depth post-session diagnostics evaluating algorithmic edge cases, architectural tradeoffs, and vocal articulation clarity.",
    subtext: "Detailed Turn-by-Turn Breakdown",
  },
  {
    tag: "06 / REAL-TIME VOICE",
    badge: "Speech Simulator",
    title: "Conversational Tech & HR Proctors",
    desc: "Engage with conversational HR and Senior Staff engineer personas that challenge your answers with contextual dynamic follow-ups.",
    subtext: "Natural Speech Synthesis",
  },
];

function SwitchableAiTeamStack() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const deckRef = useRef(null);
  const frontCardRef = useRef(null);
  const midCardRef = useRef(null);
  const backCardRef = useRef(null);
  const isShuffling = useRef(false);

  const current = AI_TEAM_MEMBERS[activeIdx];
  const next1 = AI_TEAM_MEMBERS[(activeIdx + 1) % AI_TEAM_MEMBERS.length];
  const next2 = AI_TEAM_MEMBERS[(activeIdx + 2) % AI_TEAM_MEMBERS.length];

  const shuffleTo = (targetIdx) => {
    if (isShuffling.current || targetIdx === activeIdx) return;
    isShuffling.current = true;

    // Animate front card sliding out
    gsap.to(frontCardRef.current, {
      x: 75,
      y: -10,
      rotation: 7,
      opacity: 0,
      scale: 0.92,
      duration: 0.28,
      ease: "power2.in",
      onComplete: () => {
        setActiveIdx(targetIdx);
        // Reset transforms
        gsap.set(frontCardRef.current, { x: 0, y: 0, rotation: 0, opacity: 1, scale: 1 });
        gsap.fromTo(
          frontCardRef.current,
          { scale: 0.95, opacity: 0.8 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.25,
            ease: "back.out(1.4)",
            onComplete: () => {
              isShuffling.current = false;
            },
          }
        );
      },
    });

    // Middle card glides forward into front spot
    gsap.to(midCardRef.current, {
      x: 0,
      y: 0,
      rotation: 0,
      opacity: 1,
      duration: 0.28,
      ease: "power2.out",
    });
  };

  const shuffleNext = () => {
    shuffleTo((activeIdx + 1) % AI_TEAM_MEMBERS.length);
  };

  const shufflePrev = () => {
    shuffleTo((activeIdx - 1 + AI_TEAM_MEMBERS.length) % AI_TEAM_MEMBERS.length);
  };

  // Auto-cycle every 4.5 seconds when not hovering
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      shuffleNext();
    }, 4500);
    return () => clearInterval(interval);
  }, [activeIdx, isHovered]);

  // Fan out animation on hover
  useEffect(() => {
    if (!midCardRef.current || !backCardRef.current) return;
    if (isHovered) {
      gsap.to(midCardRef.current, {
        x: -12,
        y: -9,
        rotation: -3.5,
        duration: 0.35,
        ease: "power2.out",
      });
      gsap.to(backCardRef.current, {
        x: -22,
        y: -17,
        rotation: -7,
        duration: 0.35,
        ease: "power2.out",
      });
    } else {
      gsap.to(midCardRef.current, {
        x: -6,
        y: -5,
        rotation: -2,
        duration: 0.4,
        ease: "power2.out",
      });
      gsap.to(backCardRef.current, {
        x: -12,
        y: -10,
        rotation: -4,
        duration: 0.4,
        ease: "power2.out",
      });
    }
  }, [isHovered]);

  // Continuous subtle floating bob
  useEffect(() => {
    const tween = gsap.to(deckRef.current, {
      y: -6,
      duration: 3.2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
    return () => tween.kill();
  }, []);

  return (
    <div className="mt-10 pt-4">
      {/* Header controls with title and mini switcher */}
      <div className="flex items-center justify-between max-w-sm mb-2.5">
        <p className="text-[10px] font-bold text-[#141414]/40 uppercase tracking-wider">
          YOUR AI TEAM
        </p>
        <div className="flex items-center gap-1.5 text-[10px] font-mono text-black/40">
          <span>{activeIdx + 1}/{AI_TEAM_MEMBERS.length}</span>
          <div className="flex items-center">
            <button
              onClick={shufflePrev}
              className="w-5 h-5 rounded hover:bg-black/5 hover:text-black flex items-center justify-center transition-colors cursor-pointer"
              title="Previous agent"
            >
              ‹
            </button>
            <button
              onClick={shuffleNext}
              className="w-5 h-5 rounded hover:bg-black/5 hover:text-black flex items-center justify-center transition-colors cursor-pointer"
              title="Next agent"
            >
              ›
            </button>
          </div>
        </div>
      </div>

      <div
        ref={deckRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative w-full max-w-sm select-none will-change-transform"
      >
        {/* ── BACK CARD (peek 2) ── */}
        <div
          ref={backCardRef}
          onClick={() => shuffleTo((activeIdx + 2) % AI_TEAM_MEMBERS.length)}
          className="absolute top-0 left-0 w-full rounded-2xl bg-[#F6F4ED] border border-[#E6E2D8] p-4 sm:p-5 shadow-xs cursor-pointer transition-colors hover:bg-white"
          style={{
            transform: "translate(-12px, -10px) rotate(-4deg)",
            zIndex: 10,
          }}
          title={`Click to switch to ${next2.name}`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-[#141414]/50 tracking-tight">
              {next2.name}
            </span>
            <span className={`w-2 h-2 rounded-full ${next2.statusDot} opacity-50`} />
          </div>
        </div>

        {/* ── MIDDLE CARD (peek 1) ── */}
        <div
          ref={midCardRef}
          onClick={() => shuffleTo((activeIdx + 1) % AI_TEAM_MEMBERS.length)}
          className="absolute top-0 left-0 w-full rounded-2xl bg-[#FDFBF7] border border-[#E6E2D8] p-4 sm:p-5 shadow-[0_4px_16px_rgba(0,0,0,0.03)] cursor-pointer transition-colors hover:bg-white"
          style={{
            transform: "translate(-6px, -5px) rotate(-2deg)",
            zIndex: 20,
          }}
          title={`Click to switch to ${next1.name}`}
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-bold text-[#141414]/75 tracking-tight">
              {next1.name}
            </span>
            <div className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${next1.statusDot} opacity-75`} />
              <span className="text-[10px] font-semibold text-[#141414]/50">Next</span>
            </div>
          </div>
          <p className="text-[11px] text-[#141414]/50 line-clamp-2 leading-relaxed">
            {next1.desc}
          </p>
        </div>

        {/* ── FRONT ACTIVE CARD ── */}
        <div
          ref={frontCardRef}
          onClick={shuffleNext}
          className="relative w-full rounded-2xl bg-white border border-[#E6E2D8] p-4 sm:p-5 shadow-[0_12px_36px_rgba(0,0,0,0.06)] cursor-pointer group hover:border-[#141414]/35 transition-colors"
          style={{ zIndex: 30 }}
        >
          <div className="flex items-center justify-between mb-1.5">
            <h4 className="text-xs font-bold text-[#141414] tracking-tight">
              {current.name}
            </h4>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${current.statusDot} animate-pulse`} />
                <span className={`text-[10px] font-semibold ${current.statusText}`}>
                  {current.status}
                </span>
              </div>
              <span className="text-[10px] font-mono text-black/35 group-hover:text-black/70 transition-colors">
                ↻
              </span>
            </div>
          </div>

          <p className="text-[11px] text-[#141414]/65 leading-relaxed min-h-[34px]">
            {current.desc}
          </p>

          <div className="flex items-center justify-between mt-3 pt-1">
            <div className="flex items-center gap-1.5 flex-wrap">
              {current.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[9px] font-bold px-2 py-0.5 rounded-md bg-[#FAF9F5] border border-[#E6E2D8] text-[#141414]/75"
                >
                  {tag}
                </span>
              ))}
            </div>

            <span className="text-[10px] text-black/40 font-medium group-hover:text-[#E05A3E] transition-colors flex items-center gap-1">
              Switch card <FiArrowRight size={10} />
            </span>
          </div>

          {/* Mini progress dots */}
          <div className="flex items-center gap-1.5 mt-3 pt-2 border-t border-[#F0ECE4]">
            {AI_TEAM_MEMBERS.map((m, idx) => (
              <button
                key={m.id}
                onClick={(e) => {
                  e.stopPropagation();
                  shuffleTo(idx);
                }}
                className={`h-1 rounded-full transition-all cursor-pointer ${
                  activeIdx === idx ? "w-5 bg-[#141414]" : "w-2 bg-black/15 hover:bg-black/30"
                }`}
                title={`Switch to ${m.name}`}
              />
            ))}
            <span className="text-[9px] font-mono text-black/30 ml-auto">
              Tap card to switch
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function CollapsibleNavbar({ onLoginClick, onGetStartedClick }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const leaveTimerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseEnter = () => {
    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current);
      leaveTimerRef.current = null;
    }
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current);
    // Graceful delay before collapsing so it doesn't snap shut instantly
    leaveTimerRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 380);
  };

  useEffect(() => {
    return () => {
      if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current);
    };
  }, []);

  const isExpanded = !isScrolled || isHovered;

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="fixed top-4 sm:top-5 left-1/2 -translate-x-1/2 z-50 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] select-none"
    >
      <div
        className={`bg-white border border-[#E6E2D8] shadow-[0_12px_36px_rgba(0,0,0,0.08)] flex items-center justify-between transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] overflow-hidden ${
          isExpanded
            ? "w-[92vw] max-w-4xl h-12 sm:h-13 rounded-full px-4 sm:px-6"
            : "w-12 h-12 rounded-full p-0 justify-center cursor-pointer hover:shadow-lg hover:border-[#141414]/30 hover:scale-105"
        }`}
        title={!isExpanded ? "Hover to expand menu" : ""}
      >
        {/* Brand / Logo (Centered when collapsed, left-aligned when expanded) */}
        <div className={`flex items-center gap-2.5 shrink-0 ${!isExpanded ? "justify-center w-full" : ""}`}>
          <div className="flex items-center -space-x-1.5">
            <span className="w-3.5 h-3.5 rounded-full bg-[#141414]" />
            <span className="w-3.5 h-3.5 rounded-full bg-[#141414]/75" />
          </div>
          {isExpanded && (
            <span className="font-extrabold text-sm sm:text-base tracking-tight text-[#141414] whitespace-nowrap transition-opacity duration-500 delay-150">
              SkillForge
            </span>
          )}
        </div>

        {/* Nav Links (Visible only when expanded) */}
        {isExpanded && (
          <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-[#141414]/70 whitespace-nowrap transition-opacity duration-500 delay-200">
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
                onLoginClick();
              }}
              className="hover:text-[#141414] transition-colors"
            >
              Interview Coins
            </a>
          </nav>
        )}

        {/* Action Buttons (Visible only when expanded) */}
        {isExpanded && (
          <div className="flex items-center gap-2 shrink-0 transition-opacity duration-500 delay-200">
            <button
              onClick={onLoginClick}
              className="px-3.5 py-1.5 rounded-full border border-[#DCD7CB] text-xs font-medium text-[#141414] hover:border-[#141414]/40 hover:bg-[#FAF9F5] transition-all cursor-pointer whitespace-nowrap"
            >
              Login
            </button>
            <button
              onClick={onGetStartedClick}
              className="px-4 py-1.5 rounded-full bg-[#141414] text-white text-xs font-semibold hover:bg-black/90 shadow-xs transition-all cursor-pointer whitespace-nowrap"
            >
              Get Started
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Home({ user, setUser }) {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const containerRef = useRef(null);
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── 1. HERO ENTRANCE TIMELINE ──
      const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });

      heroTl
        .from(".gsap-hero-pill", {
          opacity: 0,
          y: 20,
          scale: 0.9,
          duration: 0.6,
        })
        .from(
          ".gsap-title-line",
          {
            y: 45,
            opacity: 0,
            stagger: 0.12,
            duration: 0.85,
            ease: "power4.out",
          },
          "-=0.3"
        )
        .from(
          ".gsap-hero-sub",
          {
            opacity: 0,
            y: 20,
            duration: 0.7,
          },
          "-=0.5"
        )
        .from(
          ".gsap-hero-btn",
          {
            opacity: 0,
            y: 16,
            scale: 0.95,
            stagger: 0.1,
            duration: 0.55,
          },
          "-=0.4"
        )
        .from(
          ".gsap-team-stack",
          {
            opacity: 0,
            y: 30,
            duration: 0.7,
          },
          "-=0.3"
        )
        .from(
          ".gsap-orbit-wrapper",
          {
            opacity: 0,
            scale: 0.96,
            duration: 1.1,
            ease: "power2.out",
          },
          "-=0.7"
        );

      // ── 2. SCROLL PROGRESS BAR SCROLLTRIGGER ──
      gsap.to(".gsap-scroll-progress", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.2,
        },
        width: "100%",
        ease: "none",
      });

      // ── 3. HERO CONTENT PARALLAX SCROLLTRIGGER ──
      gsap.to(".gsap-hero-left", {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
        y: -40,
        opacity: 0.75,
        ease: "none",
      });

      // ── 4. ORBIT TRACK PARALLAX SCROLLTRIGGER ──
      gsap.to(".gsap-orbit-wrapper", {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.4,
        },
        y: 60,
        ease: "none",
      });

      // ── 5. CANDIDATE STUDIO DASHBOARD SCROLLTRIGGER ──
      gsap.fromTo(
        ".gsap-studio-container",
        {
          y: 75,
          scale: 0.93,
          rotateX: 8,
          transformPerspective: 1200,
          transformOrigin: "center top",
        },
        {
          scrollTrigger: {
            trigger: ".gsap-studio-container",
            start: "top 95%",
            end: "top 45%",
            scrub: 1.2,
          },
          y: 0,
          scale: 1,
          rotateX: 0,
          ease: "power2.out",
        }
      );

      gsap.from(".gsap-candidate-card", {
        scrollTrigger: {
          trigger: ".gsap-studio-container",
          start: "top 80%",
          toggleActions: "play none none none",
        },
        y: 22,
        stagger: 0.12,
        duration: 0.65,
        ease: "power2.out",
      });

      // ── 6. MULTI-AGENT FLEET SCROLLTRIGGER ──
      gsap.from(".gsap-agent-header", {
        scrollTrigger: {
          trigger: "#agents",
          start: "top 80%",
          toggleActions: "play none none none",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from(".gsap-agent-card", {
        scrollTrigger: {
          trigger: "#agents",
          start: "top 75%",
          toggleActions: "play none none none",
        },
        y: 60,
        opacity: 0,
        scale: 0.93,
        stagger: 0.12,
        duration: 0.75,
        ease: "back.out(1.3)",
      });

      // ── 7. ARCHITECTURAL FEATURES SCROLLTRIGGER ──
      gsap.from(".gsap-feature-header", {
        scrollTrigger: {
          trigger: "#features",
          start: "top 80%",
          toggleActions: "play none none none",
        },
        y: 35,
        opacity: 0,
        duration: 0.75,
        ease: "power3.out",
      });

      // ── 8. CTA SECTION SCROLLTRIGGER ──
      gsap.from(".gsap-cta-content", {
        scrollTrigger: {
          trigger: ".gsap-cta-section",
          start: "top 85%",
          toggleActions: "play none none none",
        },
        y: 50,
        scale: 0.94,
        opacity: 0,
        duration: 0.85,
        ease: "power3.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="bg-[#FAF9F5] text-[#141414] font-['Plus_Jakarta_Sans',sans-serif] min-h-screen overflow-x-hidden selection:bg-[#141414] selection:text-white"
    >
      {/* ── HAIRLINE SCROLL PROGRESS INDICATOR ── */}
      <div
        className="gsap-scroll-progress fixed top-0 left-0 h-[2.5px] bg-[#E55734] z-[60] will-change-[width] pointer-events-none"
        style={{ width: "0%" }}
      />

      {/* ── TOP COLLAPSIBLE FLOATING NAVBAR (SCROLL-COLLAPSIBLE & HOVER-EXPANDING) ── */}
      <CollapsibleNavbar
        onLoginClick={() => setShowLoginModal(true)}
        onGetStartedClick={() => setShowLoginModal(true)}
      />

      {/* ── TOP ARCHITECTURAL GRID GUIDE ── */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-8">
        {/* Crosshair Top-Left */}
        <div className="hidden lg:flex absolute top-[28px] left-4 -translate-x-1/2 -translate-y-1/2 text-black/35 text-xs font-mono select-none pointer-events-none z-20">
          +
        </div>
        {/* Crosshair Top-Right */}
        <div className="hidden lg:flex absolute top-[28px] right-4 translate-x-1/2 -translate-y-1/2 text-black/35 text-xs font-mono select-none pointer-events-none z-20">
          +
        </div>

        {/* ── HERO SECTION WITH ROTATING ORBITAL TRACK ── */}
        <section
          ref={heroRef}
          className="relative pt-20 sm:pt-28 pb-6 sm:pb-10 overflow-visible"
        >
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-4 items-end min-h-[580px]">
            {/* Left Editorial Content */}
            <div className="gsap-hero-left lg:col-span-6 z-20 text-left pb-6">
              {/* Eyebrow Pill Tag */}
              <div className="gsap-hero-pill inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#FBDCD0] bg-[#FFF2ED] text-[#E05A3E] text-[11px] font-bold tracking-wider uppercase mb-5">
                <span>PREPARATION TO SENIOR OFFER</span>
              </div>

              {/* Main Headline with Clean Overflow Reveal */}
              <h1 className="text-4xl sm:text-5xl lg:text-[60px] font-extrabold tracking-tight text-[#141414] leading-[1.05]">
                <div className="overflow-hidden">
                  <span className="gsap-title-line inline-block">
                    Forge Your Career.
                  </span>
                </div>
                <div className="overflow-hidden">
                  <span className="gsap-title-line inline-block">
                    Land Top-Tier Offers.
                  </span>
                </div>
              </h1>

              {/* Subtitle */}
              <p className="gsap-hero-sub mt-4 text-xs sm:text-sm text-[#141414]/65 max-w-lg leading-relaxed font-normal">
                Master live technical rounds with proctored AI interviewers, optimize your ATS resume with semantic vector search, and follow structured roadmaps designed for engineering excellence.
              </p>

              {/* Action Buttons */}
              <div className="mt-7 flex items-center gap-3">
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="gsap-hero-btn px-6 py-3 rounded-xl bg-[#E55734] hover:bg-[#D44725] text-white text-xs font-bold uppercase tracking-wider shadow-sm hover:shadow transition-all cursor-pointer"
                >
                  Start Preparation
                </button>
                <a
                  href="#platform"
                  className="gsap-hero-btn px-5 py-3 rounded-xl border border-[#DCD7CB] bg-white text-[#141414] text-xs font-semibold hover:border-[#141414]/40 hover:bg-[#FAF9F5] transition-all cursor-pointer"
                >
                  Explore Agents
                </a>
              </div>

              {/* Floating AI Team Stack Card (Switchable Deck) */}
              <div className="gsap-team-stack">
                <SwitchableAiTeamStack />
              </div>
            </div>

            {/* Right Orbital Quarter-Circle Animated Track */}
            <div className="gsap-orbit-wrapper lg:col-span-6 relative flex items-end justify-center lg:justify-end overflow-visible">
              <QuarterCircleOrbit className="translate-y-2 sm:translate-y-6" />
            </div>
          </div>

          {/* ── EMBEDDED DASHBOARD CONTAINER (MOCKUP LIKE SCREENSHOT) ── */}
          <div
            id="platform"
            className="gsap-studio-container mt-14 max-w-5xl mx-auto rounded-2xl border border-[#DCD7CB] bg-[#FAF9F5] shadow-[0_12px_40px_rgba(0,0,0,0.06)] overflow-hidden text-left"
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
                          className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors text-left cursor-pointer ${
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
                <div className="gsap-candidate-card rounded-xl border border-[#E8E4DA] bg-white p-4 sm:p-5 shadow-xs transition-all hover:border-[#141414]/30">
                  <div className="flex items-center justify-between border-b border-[#F0ECE4] pb-3 mb-3">
                    <div className="flex items-center gap-2 font-bold text-xs text-[#141414]">
                      <FiVideo size={14} className="text-black/70" />
                      <span>Upcoming Proctored Interview</span>
                    </div>
                    <span className="text-[10px] uppercase font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
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
                        <p className="text-[11px] text-[#141414]/65">
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
                  <div className="gsap-candidate-card rounded-xl border border-[#E8E4DA] bg-white p-4.5 shadow-xs hover:border-[#141414]/30 transition-all">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2 font-bold text-xs text-[#141414]">
                        <FiFileText size={13} className="text-black/70" />
                        <span>ATS Vector Scorer</span>
                      </div>
                      <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        88/100 Strong
                      </span>
                    </div>
                    <p className="text-xs text-[#141414]/70 leading-relaxed mb-3">
                      Semantic match against 1,200+ industry job descriptions using Qdrant vector index.
                    </p>
                    <div className="flex items-center justify-between pt-2 border-t border-[#F0ECE4] text-[11px]">
                      <span className="text-[#141414]/60 font-medium">Missing: GraphQL, K8s</span>
                      <button
                        onClick={() => setShowLoginModal(true)}
                        className="font-medium text-[#141414] hover:underline cursor-pointer"
                      >
                        View Report →
                      </button>
                    </div>
                  </div>

                  {/* AI Learning Roadmap */}
                  <div className="gsap-candidate-card rounded-xl border border-[#E8E4DA] bg-white p-4.5 shadow-xs hover:border-[#141414]/30 transition-all">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2 font-bold text-xs text-[#141414]">
                        <FiMap size={13} className="text-black/70" />
                        <span>Dynamic Roadmap</span>
                      </div>
                      <span className="text-[11px] font-semibold text-black/80 bg-[#FAF9F5] px-2 py-0.5 rounded-full border border-[#E6E2D8]">
                        65% Completed
                      </span>
                    </div>
                    <p className="text-xs text-[#141414]/70 leading-relaxed mb-3">
                      Current module: <strong className="text-black">Microservices & Distributed Redis</strong> with direct video tutorials.
                    </p>
                    <div className="flex items-center justify-between pt-2 border-t border-[#F0ECE4] text-[11px]">
                      <span className="text-[#141414]/60 font-medium">12 Modules · 4 Weeks</span>
                      <button
                        onClick={() => setShowLoginModal(true)}
                        className="font-medium text-[#141414] hover:underline cursor-pointer"
                      >
                        Continue Path →
                      </button>
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </div>
        </section>

        {/* ── MULTI-AGENT FLEET SECTION ── */}
        <section id="agents" className="py-20 border-t border-[#E6E2D8]">
          <div className="max-w-5xl mx-auto">
            <div className="gsap-agent-header text-center max-w-xl mx-auto mb-14">
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
              ].map((agent) => (
                <div
                  key={agent.name}
                  onMouseEnter={(e) => {
                    gsap.to(e.currentTarget, {
                      y: -6,
                      borderColor: "rgba(20, 20, 20, 0.4)",
                      boxShadow: "0 10px 25px -5px rgba(0,0,0,0.06)",
                      duration: 0.25,
                      ease: "power2.out",
                    });
                  }}
                  onMouseLeave={(e) => {
                    gsap.to(e.currentTarget, {
                      y: 0,
                      borderColor: "#DCD7CB",
                      boxShadow: "0 1px 2px 0 rgba(0,0,0,0.05)",
                      duration: 0.35,
                      ease: "power2.out",
                    });
                  }}
                  className="gsap-agent-card rounded-xl border border-[#DCD7CB] bg-white p-5 shadow-xs flex flex-col justify-between transition-colors cursor-default"
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
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ARCHITECTURAL ADVANTAGES INFINITE SCROLL MARQUEE ── */}
        <section
          id="features"
          className="py-20 border-t border-[#E6E2D8] bg-[#F5F3EC]/60 -mx-4 sm:-mx-8 overflow-hidden"
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-8 mb-9">
            <div className="gsap-feature-header flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#141414]/45 font-bold block mb-1.5">
                  Continuous Innovation · Architectural Advantages
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#141414]">
                  Engineered For Senior Engineering Standards
                </h2>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#141414]/50">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-mono text-[11px]">Hover card to pause stream</span>
              </div>
            </div>
          </div>

          {/* Marquee Carousel Container with Edge Fades */}
          <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)] py-2">
            <div className="animate-marquee-infinite flex items-stretch gap-6 pl-4">
              {[...FEATURE_ITEMS, ...FEATURE_ITEMS].map((item, idx) => (
                <div
                  key={`feature-card-${idx}`}
                  className="w-[340px] sm:w-[390px] shrink-0 rounded-2xl border border-[#E6E2D8] bg-white p-6 sm:p-7 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col justify-between hover:border-[#141414]/40 hover:shadow-[0_12px_32px_rgba(0,0,0,0.07)] hover:-translate-y-1 transition-all duration-300 select-none group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[11px] font-mono uppercase font-bold text-[#141414]/50 tracking-wider">
                        {item.tag}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FAF9F5] border border-[#E8E4DA] text-[#141414]/70">
                        {item.badge}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-[#141414] leading-snug group-hover:text-black transition-colors mb-2.5">
                      {item.title}
                    </h3>

                    <p className="text-xs sm:text-[13px] text-[#141414]/65 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="pt-4 mt-5 border-t border-[#F0ECE4] flex items-center justify-between text-[11px] text-[#141414]/40">
                    <span className="font-mono text-[10px] text-black/50">{item.subtext}</span>
                    <span className="text-[#E05A3E] font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                      Explore ↗
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CALL TO ACTION SECTION ── */}
        <section className="gsap-cta-section py-20 border-t border-[#E6E2D8] text-center">
          <div className="gsap-cta-content max-w-xl mx-auto">
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
