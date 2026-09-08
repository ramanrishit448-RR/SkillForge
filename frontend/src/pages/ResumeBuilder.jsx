import { useState } from "react";
import { FiArrowLeft, FiArrowRight, FiEye, FiCheck } from "react-icons/fi";
import ResumePreview from "../components/resume/ResumePreview";
import ResumeForm from "../components/resume/ResumeForm";
import initialData from "../components/resume/initialData";
import { useNavigate } from "react-router-dom";

const STEPS = [
  { step: 1, label: "Contact", title: "Personal Contact Information", subtitle: "Your primary contact details for recruiters" },
  { step: 2, label: "Summary", title: "Executive Professional Summary", subtitle: "A concise 2-3 sentence overview of your technical background" },
  { step: 3, label: "Skills", title: "Technical Skills & Competencies", subtitle: "Languages, frameworks, databases, and development tools" },
  { step: 4, label: "Experience", title: "Professional Work Experience", subtitle: "Past full-time positions, internships, or freelance engagements" },
  { step: 5, label: "Projects", title: "Featured Technical Projects", subtitle: "Highlight applications, open-source repositories, and key metrics" },
  { step: 6, label: "Education", title: "Academic Background", subtitle: "Degrees, university credentials, and graduation timelines" },
];

const TOTAL_STEPS = STEPS.length;

export default function ResumeBuilder({ user, setUser }) {
  const [data, setData] = useState(initialData);
  const [currentStep, setCurrentStep] = useState(1);
  const [showPreview, setShowPreview] = useState(false);

  const navigate = useNavigate();

  const goNext = () => {
    if (currentStep < TOTAL_STEPS) setCurrentStep(currentStep + 1);
  };

  const goPrev = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const isLastStep = currentStep === TOTAL_STEPS;
  const progressPct = ((currentStep - 1) / (TOTAL_STEPS - 1)) * 100;
  const activeStep = STEPS.find((s) => s.step === currentStep) || STEPS[0];

  // ── Show Preview Mode ──────────────────────────────────────────────────────
  if (showPreview) {
    return (
      <ResumePreview
        data={data}
        user={user}
        setUser={setUser}
        onBack={() => setShowPreview(false)}
      />
    );
  }

  // ── Show Form Mode ─────────────────────────────────────────────────────────
  return (
    <div className="bg-[#FAF9F5] text-[#141414] font-['Plus_Jakarta_Sans',sans-serif] min-h-screen flex flex-col selection:bg-[#141414] selection:text-white">
      {/* Sticky Editorial Navbar */}
      <nav className="sticky top-0 z-30 bg-[#FAF9F5]/90 backdrop-blur-md border-b border-[#E6E2D8]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
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
                Resume Architect
              </span>
            </div>
          </div>

          <button
            onClick={() => setShowPreview(true)}
            className="flex items-center gap-1.5 text-xs font-semibold px-3.5 py-1.5 rounded-full border border-[#E6E2D8] bg-white text-[#141414] hover:border-[#141414]/40 transition-all shadow-sm"
          >
            <FiEye size={13} />
            <span>Preview ATS Resume</span>
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 py-8">
        {/* Step Progress Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-[#141414]/45 uppercase tracking-wider">
              Step 0{currentStep} of 0{TOTAL_STEPS}
            </span>
            <span className="text-[11px] font-medium text-[#141414]/55">
              {Math.round(progressPct)}% Completed
            </span>
          </div>

          {/* Minimalist Progress Line */}
          <div className="w-full h-1 bg-[#E6E2D8] rounded-full overflow-hidden mb-6">
            <div
              className="h-full bg-[#141414] rounded-full transition-all duration-300"
              style={{ width: `${progressPct}%` }}
            />
          </div>

          {/* Quick Step Switcher Bar */}
          <div className="grid grid-cols-6 gap-1.5 mb-6">
            {STEPS.map((s) => (
              <button
                key={s.step}
                type="button"
                onClick={() => setCurrentStep(s.step)}
                className={`py-1.5 px-1 rounded-lg text-center transition-all text-[11px] font-medium truncate ${
                  s.step === currentStep
                    ? "bg-[#141414] text-white shadow-sm"
                    : s.step < currentStep
                    ? "bg-white border border-[#E6E2D8] text-[#141414]/80 hover:border-[#141414]/30"
                    : "bg-[#FAF9F5] border border-transparent text-[#141414]/40 hover:text-[#141414]/70"
                }`}
              >
                {s.step < currentStep ? "✓ " : `${s.step}. `}
                {s.label}
              </button>
            ))}
          </div>

          {/* Step Title Header */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#141414]">
              {activeStep.title}
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-[#141414]/60">
              {activeStep.subtitle}
            </p>
          </div>
        </div>

        {/* Form Container Card */}
        <div className="bg-white border border-[#E6E2D8] rounded-3xl p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
          <ResumeForm step={currentStep} data={data} setData={setData} />

          {/* Action Button Navigation */}
          <div className="flex items-center justify-between pt-6 mt-8 border-t border-[#E6E2D8]">
            <button
              onClick={goPrev}
              disabled={currentStep === 1}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                currentStep === 1
                  ? "border-[#E6E2D8] text-[#141414]/25 cursor-not-allowed bg-transparent"
                  : "border-[#E6E2D8] bg-white text-[#141414] hover:border-[#141414]/40 shadow-sm"
              }`}
            >
              <FiArrowLeft size={14} />
              <span>Previous Step</span>
            </button>

            {isLastStep ? (
              <button
                onClick={() => setShowPreview(true)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-[#141414] text-white hover:bg-black transition-all shadow-sm"
              >
                <span>Final ATS Preview</span>
                <FiEye size={14} />
              </button>
            ) : (
              <button
                onClick={goNext}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-[#141414] text-white hover:bg-black transition-all shadow-sm"
              >
                <span>Continue</span>
                <FiArrowRight size={14} />
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
