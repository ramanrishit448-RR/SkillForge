import { FiArrowLeft, FiDownload, FiCheck } from "react-icons/fi";
import { useState, useEffect, useRef } from "react";
import DownloadButton from "./DownloadButton";
import ATSTemplate from "./ATSTemplate";
import ThemeToggle from "../ThemeToggle";

export default function ResumePreview({ data, onBack, user, setUser }) {
  const resumeRef = useRef(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      if (window.innerWidth < 640) {
        setScale(0.44);
      } else if (window.innerWidth < 768) {
        setScale(0.6);
      } else if (window.innerWidth < 1024) {
        setScale(0.75);
      } else {
        setScale(0.92);
      }
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF9F5] dark:bg-[#090A0F] text-[#141414] dark:text-[#F9FAFB] font-['Plus_Jakarta_Sans',sans-serif] flex flex-col transition-colors">
      {/* Sticky Editorial Navbar */}
      <div className="sticky top-0 z-30 bg-[#FAF9F5]/90 dark:bg-[#090A0F]/90 backdrop-blur-md border-b border-[#E6E2D8] dark:border-[#222634] transition-colors">
        <div className="max-w-6xl mx-auto flex h-14 items-center justify-between px-3 sm:px-6">
          {/* Left Title & Status */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onBack}
              className="flex items-center gap-1.5 rounded-full border border-[#E6E2D8] dark:border-[#222634] bg-white dark:bg-[#12141C] px-3 py-1.5 text-xs font-semibold text-[#141414] dark:text-white hover:border-[#141414]/40 dark:hover:border-white/40 transition-all shadow-sm"
            >
              <FiArrowLeft size={13} />
              <span className="hidden sm:inline">Back to Editor</span>
              <span className="sm:hidden">Edit</span>
            </button>

            <div className="h-4 w-px bg-[#E6E2D8] dark:bg-[#222634] hidden sm:block" />

            <div className="hidden sm:flex items-center gap-2">
              <span className="text-sm font-bold text-[#141414] dark:text-white">Standard ATS Template</span>
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 px-2 py-0.5 rounded-full">
                <FiCheck size={11} /> 100% Parse Compliant
              </span>
            </div>
          </div>

          {/* Right Action: ThemeToggle & Download CTA */}
          <div className="flex items-center gap-2">
            <ThemeToggle compact={true} />
            <DownloadButton
              resumeRef={resumeRef}
              user={user}
              setUser={setUser}
            />
          </div>
        </div>
      </div>

      {/* Canvas Paper Viewport */}
      <div className="flex-1 overflow-auto bg-[#F4F1EA] dark:bg-[#06070A] py-8 px-4 flex justify-center items-start transition-colors">
        <div
          style={{
            transform: `scale(${scale})`,
            transformOrigin: "top center",
          }}
          className="transition-transform duration-200"
        >
          <div
            ref={resumeRef}
            className="bg-white text-black rounded shadow-[0_8px_40px_rgba(0,0,0,0.12)] border border-[#E6E2D8] dark:border-[#222634]"
          >
            <ATSTemplate data={data} />
          </div>
        </div>
      </div>
    </div>
  );
}
