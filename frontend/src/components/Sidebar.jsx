import { motion, AnimatePresence } from "motion/react";
import { GiArtificialHive } from "react-icons/gi";
import {
  FiFileText, FiMap, FiStar,
  FiLogOut, FiPlus, FiSidebar,
} from "react-icons/fi";
import { BsStars, BsPlusCircleFill } from "react-icons/bs";
import { useNavigate, useLocation } from "react-router-dom";
const NAV_ITEMS = [
  {
    icon: <FiFileText size={15} />,
    label: "Resume Builder",
    path: "/resume",
  },
  {
    icon: <FiMap size={15} />,
    label: "Roadmap Builder",
    path: "/roadmap",
  },
  {
    icon: <FiStar size={15} />,
    label: "Resume Scorer",
    path: "/scorer",
  },
 
];

export default function Sidebar({
  user,
  onNewInterview,
  onLogout,
  collapsed,
  setCollapsed,
  mobileOpen,
  setMobileOpen,
}) {

  const navigate = useNavigate();
  const location = useLocation();
  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "U";

  const inner = (
    <div className="flex flex-col h-full">

      {/* Logo + Toggle */}
      <div
        className={`px-3 h-[52px] border-b border-[#E6E2D8] shrink-0 flex items-center ${collapsed ? "justify-center" : "justify-between"
          }`}
      >
        <div className="flex items-center gap-2.5">
          {!collapsed && (
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/dashboard")}>
              <div className="flex items-center -space-x-1 shrink-0">
                <span className="w-3 h-3 rounded-full bg-[#141414]" />
                <span className="w-3 h-3 rounded-full bg-[#141414]/70" />
              </div>
              <span className="font-extrabold text-sm tracking-tight text-[#141414] whitespace-nowrap">
                SkillForge
              </span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-1.5">
          {/* Desktop */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCollapsed(!collapsed)}
            className="hidden md:flex text-black/30 hover:text-[#0A0A0A] transition-colors shrink-0"
          >
            <FiSidebar size={15} />
          </motion.button>

          {/* Mobile */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setMobileOpen(false)}
            className="md:hidden text-black/30 hover:text-[#0A0A0A] transition-colors shrink-0"
          >
            <FiSidebar size={15} />
          </motion.button>
        </div>
      </div>

      {/* New Interview */}
      <div className="px-2.5 pt-3 pb-1.5 shrink-0">
        <motion.button
          onClick={onNewInterview}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className={`w-full flex items-center gap-2 bg-[#000000] text-white font-semibold rounded-lg py-2 transition-all shadow-[0_4px_14px_rgba(0,0,0,0.25)] hover:bg-[#1a1a1a] ${collapsed ? "justify-center px-0" : "px-2.5"
            }`}
        >
          <FiPlus size={14} className="shrink-0" />
          <AnimatePresence>
            {!collapsed && (
              <motion.span
            
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.13 }}
                className="text-xs whitespace-nowrap"
              >
                Create Interview
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Nav Label */}
      <AnimatePresence>
        {!collapsed && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="px-3 pt-2.5 pb-1 text-[10px] font-semibold uppercase tracking-widest text-black/30"
          >
            Agents
          </motion.p>
        )}
      </AnimatePresence>

      {/* Nav Items */}
      <nav className="flex flex-col gap-0.5 px-2.5 flex-1">
       {NAV_ITEMS.map((item) => {
  const isActive = location.pathname === item.path;

  return (
    <motion.button
      key={item.path}
      onClick={() => {
        navigate(item.path);
        setMobileOpen(false);
      }}
      whileHover={{ x: collapsed ? 0 : 3 }}
      transition={{ duration: 0.13 }}
      className={`flex items-center gap-2.5 rounded-lg py-2 transition-all text-xs font-medium ${
        collapsed ? "justify-center px-0" : "px-2.5"
      } ${
        isActive
          ? "bg-black/8 text-[#0A0A0A]"
          : "text-black/45 hover:text-[#0A0A0A] hover:bg-black/5"
      }`}
    >
      <span className="shrink-0">{item.icon}</span>

      {!collapsed && (
        <span className="whitespace-nowrap">
          {item.label}
        </span>
      )}
    </motion.button>
  );
})}
      </nav>

      {/* User Footer */}
      <div className="border-t border-[#E6E2D8] p-2.5 shrink-0">
        {/* Coins */}
        {collapsed ? (
          <div
            onClick={() => navigate("/pricing")}
            title={`${user?.interviewCoin ?? 0} Coins · Top up`}
            className="flex items-center justify-center w-9 h-9 mx-auto mb-2.5 rounded-xl bg-white border border-[#E6E2D8] text-amber-500 hover:text-amber-600 hover:border-[#141414]/30 cursor-pointer transition-all shadow-sm"
          >
            <BsStars size={15} />
          </div>
        ) : (
          <div
            onClick={() => navigate("/pricing")}
            className="group flex cursor-pointer items-center justify-between gap-2 rounded-xl border border-[#E6E2D8] bg-white px-3 py-2 mb-2.5 transition-all hover:border-[#141414]/40 shadow-sm"
          >
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-[#FAF9F5] border border-[#E6E2D8] flex items-center justify-center text-amber-500">
                <BsStars size={12} />
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] uppercase tracking-wider text-[#141414]/45 font-bold">
                  Coins
                </span>
                <span className="text-xs font-extrabold text-[#141414] leading-tight">
                  {user?.interviewCoin ?? 0}
                </span>
              </div>
            </div>

            <span className="text-[10px] font-semibold bg-[#FAF9F5] text-[#141414]/75 px-2 py-0.5 rounded-md border border-[#E6E2D8] group-hover:bg-[#141414] group-hover:text-white transition-all">
              + Top up
            </span>
          </div>
        )}

        {/* Avatar row */}
        <div className={`flex items-center gap-2 ${collapsed ? "justify-center" : ""}`}>
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="w-7 h-7 rounded-full object-cover shrink-0 border border-black/10"
            />
          ) : (
            <div className="w-7 h-7 rounded-full bg-[#000000] flex items-center justify-center shrink-0">
              <span className="text-white font-bold text-[10px]">{initials}</span>
            </div>
          )}

          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 min-w-0"
              >
                <p className="text-[#0A0A0A] text-[11px] font-semibold truncate">
                  {user?.name ?? "User"}
                </p>
                <p className="text-black/35 text-[9px] truncate">
                  {user?.email ?? "user@email.com"}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {!collapsed && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                whileHover={{ scale: 1.15 }}
                onClick={onLogout}
                className="text-black/30 hover:text-[#0A0A0A] transition-colors ml-auto"
                title="Logout"
              >
                <FiLogOut size={12} />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* ── DESKTOP sidebar ── */}
      <motion.aside
        animate={{ width: collapsed ? 72 : 260 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className="hidden md:flex fixed top-0 left-0 h-screen bg-[#FDFBF7] border-r border-[#E6E2D8] flex-col z-40 overflow-hidden font-['Plus_Jakarta_Sans',sans-serif]"
      >
        {inner}
      </motion.aside>

      {/* ── MOBILE backdrop ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 bg-black/30 z-40 md:hidden backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* ── MOBILE drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="fixed top-0 left-0 h-screen w-[280px] max-w-[85vw] bg-[#FDFBF7] border-r border-[#E6E2D8] flex-col z-50 md:hidden overflow-hidden font-['Plus_Jakarta_Sans',sans-serif]"
          >
            {inner}
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
