import { createClerkClient, verifyToken } from "@clerk/backend";

const clerkSecretKey = process.env.CLERK_SECRET_KEY || "";
const clerkPublishableKey = process.env.CLERK_PUBLISHABLE_KEY || "";

export const clerkClient = clerkSecretKey
  ? createClerkClient({ secretKey: clerkSecretKey, publishableKey: clerkPublishableKey })
  : null;

export { verifyToken };
