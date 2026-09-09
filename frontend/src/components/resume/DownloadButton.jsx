import { FiDownload } from "react-icons/fi";
import { useReactToPrint } from "react-to-print";
import { useCoins } from "../../api/user.api";

export default function DownloadButton({
  resumeRef,
  user,
  setUser,
}) {
  const handlePrint = useReactToPrint({
    contentRef: resumeRef,
    documentTitle: "SkillForge_Resume",
  });

  const handleDownload = async () => {
    try {
      // Deduct 10 Coins
      const response = await useCoins({
        coins: 10,
        action: "resume-builder",
      });

      // Update User Coins
      if (setUser && response?.interviewCoin !== undefined) {
        setUser((prev) => ({
          ...prev,
          interviewCoin: response.interviewCoin,
        }));
      }

      // Download PDF
      handlePrint();
    } catch (error) {
      if (error.response?.status === 403) {
        return alert("Not enough Interview Coins. Please recharge to download.");
      }

      alert(error.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <button
      onClick={handleDownload}
      className="inline-flex items-center gap-1.5 sm:gap-2 rounded-xl bg-[#141414] dark:bg-white hover:bg-black dark:hover:bg-slate-200 px-3 sm:px-4 py-2 text-xs font-semibold text-white dark:text-[#141414] shadow-sm transition-all whitespace-nowrap"
    >
      <FiDownload size={14} />
      <span className="hidden sm:inline">Download PDF (10 Coins)</span>
      <span className="sm:hidden">PDF (10 Coins)</span>
    </button>
  );
}
