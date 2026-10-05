import React, { useEffect, useRef } from "react";
import { useUser, useAuth } from "@clerk/clerk-react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../utils/axios";

export function ClerkSyncBridge({ user, setUser }) {
  const { user: clerkUser, isLoaded, isSignedIn } = useUser();
  const { getToken } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const syncedUserIdRef = useRef(null);

  // Guarantee: whenever signed in, landing on "/" redirects immediately to "/dashboard"
  useEffect(() => {
    if (isLoaded && isSignedIn && (location.pathname === "/" || location.pathname === "")) {
      navigate("/dashboard", { replace: true });
    }
  }, [isLoaded, isSignedIn, location.pathname, navigate]);

  useEffect(() => {
    if (!isLoaded) return;

    if (!isSignedIn) {
      syncedUserIdRef.current = null;
      return;
    }

    if (isSignedIn && clerkUser && syncedUserIdRef.current !== clerkUser.id) {
      syncedUserIdRef.current = clerkUser.id;

      const syncSession = async () => {
        try {
          let token = null;
          try {
            token = await getToken();
          } catch (e) {
            // ignore
          }

          const email = clerkUser.primaryEmailAddress?.emailAddress || "";
          const name = clerkUser.fullName || clerkUser.firstName || "SkillForge User";
          const image = clerkUser.imageUrl || "";

          const res = await api.post("/api/auth/login", {
            token,
            clerkId: clerkUser.id,
            email,
            name,
            image,
          });

          if (res.data?.user) {
            setUser(res.data.user);
            if (location.pathname === "/" || location.pathname === "") {
              navigate("/dashboard", { replace: true });
            }
          }
        } catch (err) {
          console.error("Clerk session sync error:", err);
          // If error, reset after 5 seconds to avoid request flood
          setTimeout(() => {
            syncedUserIdRef.current = null;
          }, 5000);
        }
      };

      syncSession();
    }
  }, [isLoaded, isSignedIn, clerkUser, navigate, location.pathname, setUser, getToken]);

  return null;
}

export default ClerkSyncBridge;
