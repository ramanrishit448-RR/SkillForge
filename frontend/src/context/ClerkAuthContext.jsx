import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useUser, useAuth, useClerk } from "@clerk/clerk-react";
import api from "../utils/axios";

const ClerkAuthContext = createContext(null);

export function ClerkAuthSyncProvider({ children, onUserChange }) {
  const { user: clerkUser, isLoaded: isClerkLoaded, isSignedIn } = useUser();
  const { getToken } = useAuth();
  const { signOut } = useClerk();

  const [dbUser, setDbUser] = useState(null);
  const [syncing, setSyncing] = useState(false);

  // Sync Clerk session with SkillForge backend (MongoDB + Redis session)
  const syncWithBackend = useCallback(async () => {
    if (!isSignedIn || !clerkUser) {
      setDbUser(null);
      if (onUserChange) onUserChange(null);
      return;
    }

    try {
      setSyncing(true);
      let token = null;
      try {
        token = await getToken();
      } catch (tErr) {
        console.warn("Could not retrieve Clerk JWT token:", tErr);
      }

      const email = clerkUser.primaryEmailAddress?.emailAddress || "";
      const name = clerkUser.fullName || clerkUser.firstName || email.split("@")[0] || "User";
      const image = clerkUser.imageUrl || "";

      const res = await api.post("/api/auth/login", {
        token,
        clerkId: clerkUser.id,
        email,
        name,
        image,
      });

      if (res.data?.user) {
        setDbUser(res.data.user);
        if (onUserChange) onUserChange(res.data.user);
      }
    } catch (err) {
      console.error("Failed to synchronize Clerk session with backend:", err);
    } finally {
      setSyncing(false);
    }
  }, [isSignedIn, clerkUser, getToken, onUserChange]);

  useEffect(() => {
    if (isClerkLoaded) {
      if (isSignedIn && clerkUser) {
        syncWithBackend();
      } else {
        setDbUser(null);
        if (onUserChange) onUserChange(null);
      }
    }
  }, [isClerkLoaded, isSignedIn, clerkUser, syncWithBackend, onUserChange]);

  const logout = async () => {
    try {
      await api.get("/api/auth/logout").catch(() => {});
      await signOut();
      setDbUser(null);
      if (onUserChange) onUserChange(null);
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <ClerkAuthContext.Provider
      value={{
        clerkUser,
        dbUser,
        setDbUser,
        isClerkLoaded,
        isSignedIn,
        syncing,
        syncWithBackend,
        logout,
      }}
    >
      {children}
    </ClerkAuthContext.Provider>
  );
}

export function useClerkAuth() {
  const context = useContext(ClerkAuthContext);
  return context;
}
