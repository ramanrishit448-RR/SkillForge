import { initializeApp, cert } from "firebase-admin/app";
import fs from "fs";
import path from "path";

let serviceAccount = null;

if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  try {
    serviceAccount = typeof process.env.FIREBASE_SERVICE_ACCOUNT === "string"
      ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
      : process.env.FIREBASE_SERVICE_ACCOUNT;
  } catch (err) {
    console.error("Failed to parse FIREBASE_SERVICE_ACCOUNT environment variable:", err);
  }
}

if (!serviceAccount) {
  const localKeyPath = path.resolve(import.meta.dirname, "../serviceAccountKey.json");
  if (fs.existsSync(localKeyPath)) {
    try {
      serviceAccount = JSON.parse(fs.readFileSync(localKeyPath, "utf-8"));
    } catch (err) {
      console.error("Failed to read local serviceAccountKey.json:", err);
    }
  }
}

if (!serviceAccount) {
  console.warn(
    "WARNING: No Firebase service account credentials found. " +
    "Please set the FIREBASE_SERVICE_ACCOUNT environment variable on Render."
  );
}

export const app = initializeApp({
  credential: serviceAccount ? cert(serviceAccount) : undefined,
});