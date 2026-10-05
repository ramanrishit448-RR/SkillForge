import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import Home from "./pages/Home";
import Dashbord from "./pages/Dashbord";
import Roadmap from "./pages/Roadmap";
import Scorer from "./pages/Scorer";
import ResumeBuilder from "./pages/ResumeBuilder";
import Pricing from "./pages/Pricing";
import InterviewStart from "./pages/InterviewStart";
import InterviewPage from "./pages/InterviewPage";
import InterviewReport from "./pages/InterviewReport";

import { getCurrentUser } from "./api/user.api";
import { setResume } from "./redux/resumeSlice";
import { getResume } from "./api/resume.api";
import ClerkSyncBridge from "./components/ClerkSyncBridge";

function App({ isClerkConfigured = false }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const getUser = async () => {
      try {
        const data = await getCurrentUser();
        if (data?.user) {
          setUser(data.user);
        }
      } catch (err) {
        console.warn("Session check:", err.message);
      } finally {
        setLoading(false);
      }
    };
    getUser();
  }, []);

  useEffect(() => {
    if (!user) return;
    const fetchResume = async () => {
      try {
        const response = await getResume();
        if (response?.data) {
          dispatch(setResume(response.data));
        }
      } catch (err) {
        console.warn("Resume fetch:", err.message);
      }
    };
    fetchResume();
  }, [user, dispatch]);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-[#090A0F] flex items-center justify-center z-[9999]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
          <span className="text-white/40 text-xs tracking-wider font-mono">SkillForge loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      {isClerkConfigured && (
        <ClerkSyncBridge user={user} setUser={setUser} />
      )}

      <Routes>
        <Route
          path="/"
          element={
            user
              ? <Navigate to="/dashboard" replace />
              : <Home user={user} setUser={setUser} />
          }
        />

        <Route
          path="/dashboard"
          element={
            user
              ? <Dashbord user={user} setUser={setUser} />
              : <Navigate to="/" replace />
          }
        />

        <Route
          path="/interview"
          element={
            user
              ? <InterviewStart user={user} setUser={setUser} />
              : <Navigate to="/" replace />
          }
        />

        <Route
          path="/interview/:id"
          element={
            user
              ? <InterviewPage user={user} setUser={setUser} />
              : <Navigate to="/" replace />
          }
        />

        <Route
          path="/interview/:id/report"
          element={
            user
              ? <InterviewReport user={user} setUser={setUser} />
              : <Navigate to="/" replace />
          }
        />

        <Route
          path="/resume"
          element={
            user
              ? <ResumeBuilder user={user} setUser={setUser} />
              : <Navigate to="/" replace />
          }
        />

        <Route
          path="/roadmap"
          element={
            user
              ? <Roadmap user={user} setUser={setUser} />
              : <Navigate to="/" replace />
          }
        />

        <Route
          path="/scorer"
          element={
            user
              ? <Scorer user={user} setUser={setUser} />
              : <Navigate to="/" replace />
          }
        />

        <Route
          path="/pricing"
          element={
            user
              ? <Pricing user={user} setUser={setUser} />
              : <Navigate to="/" replace />
          }
        />

        {/* Catch-all redirect */}
        <Route
          path="*"
          element={<Navigate to={user ? "/dashboard" : "/"} replace />}
        />
      </Routes>
    </>
  );
}

export default App;
