import React from "react";
import { SignIn } from "@clerk/clerk-react";
import { FiX, FiKey, FiExternalLink, FiCheckCircle } from "react-icons/fi";
import { motion, AnimatePresence } from "motion/react";

export function LoginModal({ onClose, setUser }) {
  const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
  const isConfigured = Boolean(
    publishableKey &&
    publishableKey.startsWith("pk_") &&
    !publishableKey.includes("xxxxxxxx")
  );

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-xl px-4 p-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="relative w-full max-w-md my-auto"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute -top-3 -right-3 z-50 p-2 rounded-full bg-[#181B26] border border-white/15 text-white/60 hover:text-white hover:border-white/30 transition-all shadow-xl"
            title="Close"
          >
            <FiX size={16} />
          </button>

          {isConfigured ? (
            /* Clerk Sign-in Component with SkillForge Custom Styling */
            <div className="flex justify-center items-center w-full">
              <SignIn
                routing="hash"
                forceRedirectUrl="/dashboard"
                fallbackRedirectUrl="/dashboard"
                appearance={{
                  layout: {
                    socialButtonsPlacement: "top",
                    logoPlacement: "none",
                  },
                  variables: {
                    colorPrimary: "#6366f1",
                    colorBackground: "#0E1017",
                    colorText: "#FFFFFF",
                    colorTextSecondary: "#94A3B8",
                    colorInputBackground: "#161924",
                    colorInputText: "#FFFFFF",
                    borderRadius: "0.85rem",
                  },
                  elements: {
                    card: "bg-[#0E1017]/95 backdrop-blur-2xl border border-white/10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] rounded-3xl p-6 sm:p-8",
                    headerTitle: "text-white font-bold text-xl tracking-tight text-center",
                    headerSubtitle: "text-white/50 text-xs text-center",
                    socialButtonsBlockButton: "border border-white/10 bg-white/5 hover:bg-white/10 text-white font-medium transition-all py-2.5 rounded-xl",
                    socialButtonsBlockButtonText: "text-white text-sm font-medium",
                    dividerLine: "bg-white/10",
                    dividerText: "text-white/40 text-xs uppercase tracking-wider",
                    formButtonPrimary: "bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 hover:opacity-95 text-white font-semibold py-2.5 rounded-xl shadow-lg shadow-indigo-500/25 transition-all text-sm",
                    formFieldLabel: "text-white/70 text-xs font-medium",
                    formFieldInput: "bg-[#161924] border border-white/10 text-white rounded-xl text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all",
                    footerActionLink: "text-indigo-400 hover:text-indigo-300 font-medium text-xs",
                    footer: "border-t border-white/10 pt-4 text-white/40 text-xs",
                  },
                }}
              />
            </div>
          ) : (
            /* Instructions Card if Key is not set yet */
            <div className="bg-[#0E1017]/95 backdrop-blur-2xl border border-white/10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] rounded-3xl p-7 text-white text-left">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                  <FiKey size={20} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Clerk Authentication Setup</h3>
                  <p className="text-xs text-white/50">Add your publishable key to activate authentication</p>
                </div>
              </div>

              <div className="space-y-3.5 my-5 text-xs text-white/80 leading-relaxed">
                <div className="flex items-start gap-2.5 bg-white/5 p-3 rounded-xl border border-white/5">
                  <FiCheckCircle className="text-emerald-400 shrink-0 mt-0.5" size={15} />
                  <span>
                    1. Go to <a href="https://clerk.com" target="_blank" rel="noreferrer" className="text-indigo-400 underline font-medium hover:text-indigo-300 inline-flex items-center gap-1">clerk.com <FiExternalLink size={11} /></a> and create or select your project.
                  </span>
                </div>

                <div className="flex items-start gap-2.5 bg-white/5 p-3 rounded-xl border border-white/5">
                  <FiCheckCircle className="text-emerald-400 shrink-0 mt-0.5" size={15} />
                  <span>
                    2. In the Clerk Dashboard under <strong>API Keys</strong>, copy your <strong>Publishable Key</strong> (<code className="text-amber-300 bg-black/40 px-1 py-0.5 rounded">pk_test_...</code>).
                  </span>
                </div>

                <div className="flex items-start gap-2.5 bg-white/5 p-3 rounded-xl border border-white/5">
                  <FiCheckCircle className="text-emerald-400 shrink-0 mt-0.5" size={15} />
                  <span>
                    3. Paste it into <code className="text-indigo-300 bg-black/40 px-1 py-0.5 rounded">frontend/.env</code>:
                    <pre className="mt-2 p-2 rounded-lg bg-black/60 border border-white/10 text-emerald-400 font-mono text-[11px] select-all overflow-x-auto">
                      VITE_CLERK_PUBLISHABLE_KEY="pk_test_your_key_here"
                    </pre>
                  </span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold border border-white/15 transition-all text-center"
              >
                Close Setup Guide
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export default LoginModal;
