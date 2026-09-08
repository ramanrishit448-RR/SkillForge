import { FiArrowLeft, FiDownload, FiCheck } from "react-icons/fi";
import { useState, useEffect, useRef } from "react";
import DownloadButton from "./DownloadButton";
import ATSTemplate from "./ATSTemplate";

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
    <div className="min-h-screen bg-[#FAF9F5] text-[#141414] font-['Plus_Jakarta_Sans',sans-serif] flex flex-col">
      {/* Sticky Editorial Navbar */}
      <div className="sticky top-0 z-30 bg-[#FAF9F5]/90 backdrop-blur-md border-b border-[#E6E2D8]">
        <div className="max-w-6xl mx-auto flex h-14 items-center justify-between px-4 sm:px-6">
          {/* Left Title & Status */}
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="flex items-center gap-1.5 rounded-full border border-[#E6E2D8] bg-white px-3 py-1.5 text-xs font-semibold text-[#141414] hover:border-[#141414]/40 transition-all shadow-sm"
            >
              <FiArrowLeft size={13} />
              <span>Back to Editor</span>
            </button>

            <div className="h-4 w-px bg-[#E6E2D8] hidden sm:block" />

            <div className="hidden sm:flex items-center gap-2">
              <span className="text-sm font-bold text-[#141414]">Standard ATS Template</span>
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                <FiCheck size={11} /> 100% Parse Compliant
              </span>
            </div>
          </div>

          {/* Right Download CTA */}
          <div>
            <DownloadButton
              resumeRef={resumeRef}
              user={user}
              setUser={setUser}
            />
          </div>
        </div>
      </div>

      {/* Canvas Paper Viewport */}
      <div className="flex-1 overflow-auto bg-[#F4F1EA] py-8 px-4 flex justify-center items-start">
        <div
          style={{
            transform: `scale(${scale})`,
            transformOrigin: "top center",
          }}
          className="transition-transform duration-200"
        >
          <div
            ref={resumeRef}
            className="bg-white rounded shadow-[0_8px_40px_rgba(0,0,0,0.08)] border border-[#E6E2D8]"
          >
            <ATSTemplate data={data} />
          </div>
        </div>
      </div>
    </div>
  );
}
