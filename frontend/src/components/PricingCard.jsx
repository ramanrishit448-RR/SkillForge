import { BsStars } from "react-icons/bs";
import { FiCheck, FiArrowRight } from "react-icons/fi";

export default function PricingCard({
  title,
  price,
  coins,
  button,
  features,
  popular,
  disabled,
  onBuy,
  loading,
}) {
  return (
    <div
      className={`w-full max-w-sm rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 relative ${
        popular
          ? "bg-[#141414] dark:bg-[#1A1D28] text-white border border-[#141414] dark:border-white/20 shadow-[0_16px_40px_rgba(0,0,0,0.12)] md:scale-[1.02]"
          : "bg-white dark:bg-[#12141C] text-[#141414] dark:text-white border border-[#E6E2D8] dark:border-[#222634] shadow-sm hover:border-[#141414]/30 dark:hover:border-white/20"
      }`}
    >
      {/* Top Header & Tag */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-4">
          <span
            className={`text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${
              popular
                ? "bg-amber-400/20 text-amber-300 border-amber-400/30"
                : "bg-[#FAF9F5] dark:bg-[#1A1E2B] text-[#141414]/60 dark:text-white/60 border-[#E6E2D8] dark:border-[#222634]"
            }`}
          >
            {popular ? "Most Popular · Best Value" : "Default Starter Allocation"}
          </span>

          {popular && (
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          )}
        </div>

        <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
          {title} Pack
        </h2>

        {/* Price display */}
        <div className="mt-4 flex items-baseline gap-1.5 pb-4 border-b border-current/10">
          <span className="text-4xl font-extrabold tracking-tight">
            {price === "Free" ? "₹0" : `₹${price}`}
          </span>
          <span className={`text-xs ${popular ? "text-white/50" : "text-[#141414]/45 dark:text-white/45"}`}>
            {price === "Free" ? "forever on registration" : "one-time · no recurring charges"}
          </span>
        </div>

        {/* Coins Pill */}
        <div
          className={`mt-5 flex items-center justify-between p-3 rounded-2xl border ${
            popular
              ? "bg-white/10 border-white/15 text-white"
              : "bg-[#FAF9F5] dark:bg-[#1A1E2B] border-[#E6E2D8] dark:border-[#222634] text-[#141414] dark:text-white"
          }`}
        >
          <div className="flex items-center gap-2">
            <BsStars className={popular ? "text-amber-300" : "text-amber-500"} size={16} />
            <span className="text-sm font-bold tracking-tight">
              {coins} Interview Coins
            </span>
          </div>
          <span className={`text-[10px] font-semibold uppercase tracking-wider ${popular ? "text-white/60" : "text-[#141414]/50 dark:text-white/50"}`}>
            {price === "Free" ? "Included" : "Instant Credit"}
          </span>
        </div>

        {/* Feature List */}
        <div className="mt-6 space-y-2.5">
          <p className={`text-[10px] font-bold uppercase tracking-wider ${popular ? "text-white/40" : "text-[#141414]/40 dark:text-white/40"}`}>
            What you can do with this:
          </p>
          {features.map((item, idx) => (
            <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm">
              <div
                className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                  popular
                    ? "bg-white/15 text-white"
                    : "bg-[#141414] dark:bg-white text-white dark:text-[#090A0F]"
                }`}
              >
                <FiCheck size={10} />
              </div>
              <span className={popular ? "text-white/85" : "text-[#141414]/80 dark:text-white/80"}>
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Button */}
      <div className="mt-8 pt-4 border-t border-current/10">
        <button
          disabled={disabled || loading}
          onClick={onBuy}
          className={`w-full h-12 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
            disabled
              ? "bg-[#FAF9F5] dark:bg-[#1E2230] text-[#141414]/40 dark:text-white/40 border border-[#E6E2D8] dark:border-[#222634] cursor-default"
              : popular
              ? "bg-white text-[#141414] hover:bg-neutral-100 shadow-md active:scale-[0.99]"
              : "bg-[#141414] dark:bg-white text-white dark:text-[#090A0F] hover:bg-black dark:hover:bg-neutral-200 shadow-sm"
          }`}
        >
          {loading ? (
            <>
              <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
              <span>Opening Checkout…</span>
            </>
          ) : (
            <>
              <span>{button}</span>
              {!disabled && <FiArrowRight size={14} />}
            </>
          )}
        </button>

        <p className={`text-[10px] text-center mt-2.5 ${popular ? "text-white/40" : "text-[#141414]/40 dark:text-white/40"}`}>
          {price === "Free"
            ? "Already claimed automatically when your account was created."
            : "Secured by Razorpay · Auto-refund protection on AI failure."}
        </p>
      </div>
    </div>
  );
}

