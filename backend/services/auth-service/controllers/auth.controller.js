import crypto from "crypto";
import { clerkClient, verifyToken } from "../configs/clerk.js";
import User from "../model/user.model.js";
import redis from "../../../shared/redis/redis.js";

export const login = async (req, res) => {
  try {
    const { token, clerkId, email, name, image } = req.body;

    let verifiedClerkId = clerkId;
    let verifiedEmail = email;
    let verifiedName = name;
    let verifiedImage = image;

    // Verify token if provided and real secret key is configured
    if (token && process.env.CLERK_SECRET_KEY && !process.env.CLERK_SECRET_KEY.includes("xxxxxxxx")) {
      try {
        const verified = await verifyToken(token, {
          secretKey: process.env.CLERK_SECRET_KEY,
        });
        if (verified?.sub) {
          verifiedClerkId = verified.sub;
        }
      } catch (verifyErr) {
        console.warn("Clerk token verification:", verifyErr.message);
      }
    }

    if (!verifiedClerkId && !verifiedEmail) {
      return res.status(400).json({
        success: false,
        message: "Missing Clerk authentication credentials",
      });
    }

    let user = await User.findOne({
      $or: [
        ...(verifiedClerkId ? [{ clerkId: verifiedClerkId }] : []),
        ...(verifiedEmail ? [{ email: verifiedEmail }] : []),
      ],
    });

    if (!user) {
      user = await User.create({
        clerkId: verifiedClerkId,
        firebaseUid: "clerk_" + (verifiedClerkId || Math.random().toString(36).slice(2)),
        email: verifiedEmail || `${verifiedClerkId}@clerk.user`,
        name: verifiedName || "SkillForge User",
        image: verifiedImage || "",
        interviewCoin: 150,
      });
    } else {
      let updated = false;
      if (verifiedClerkId && !user.clerkId) {
        user.clerkId = verifiedClerkId;
        updated = true;
      }
      if (verifiedImage && user.image !== verifiedImage) {
        user.image = verifiedImage;
        updated = true;
      }
      if (verifiedName && user.name !== verifiedName) {
        user.name = verifiedName;
        updated = true;
      }
      if (updated) {
        await user.save();
      }
    }

    const sessionId = crypto.randomUUID();

    await redis.set(
      `session:${sessionId}`,
      JSON.stringify({
        userId: user._id,
        name: user.name,
        email: user.email,
        image: user.image,
        interviewCoin: user.interviewCoin,
      }),
      "EX",
      60 * 60 * 24 * 7
    );

    const isHttps =
      process.env.NODE_ENV === "production" ||
      req.secure ||
      req.headers["x-forwarded-proto"] === "https" ||
      req.headers.origin?.includes("vercel.app") ||
      req.headers.origin?.includes("onrender.com");

    res.cookie("session", sessionId, {
      httpOnly: true,
      secure: isHttps,
      sameSite: isHttps ? "none" : "lax",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    return res.json({ success: true, user });
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};

export const logout = async (req, res) => {
  try {

    const sessionId = req.cookies?.session;

    if (sessionId) {
      await redis.del(`session:${sessionId}`);
    }

    const isHttps =
      process.env.NODE_ENV === "production" ||
      req.secure ||
      req.headers["x-forwarded-proto"] === "https" ||
      req.headers.origin?.includes("vercel.app") ||
      req.headers.origin?.includes("onrender.com");

    res.clearCookie("session", {
      httpOnly: true,
      secure: isHttps,
      sameSite: isHttps ? "none" : "lax",
    });

    return res.json({
      success: true,
      message: "Logged out successfully",
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
export const useInterviewCoins = async (req, res) => {
  try {
const sessionId = req.cookies?.session;

  const session = await redis.get(`session:${sessionId}`)

  const sessionData = JSON.parse(session);

    const { coins, action } = req.body;

    if (!coins) {
      return res.status(400).json({ 
        success: false,
        message: "Coins are required",
      });
    }

    const user = await User.findById(sessionData.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Not enough coins
    if (user.interviewCoin < coins) {
      return res.status(403).json({
        success: false,
        message: "Not enough interview coins",
        interviewCoin: user.interviewCoin,
      });
    }

    // Deduct coins
    user.interviewCoin -= coins;

    await user.save();
    await redis.set(`session:${sessionId}`, JSON.stringify({
        userId:
        user._id,

        name:
        user.name,

        email:
        user.email,

        interviewCoin:
        user.interviewCoin

      }),"EX", 60 * 60 * 24 * 7);


    return res.status(200).json({
      success: true,
      message: "Interview coins updated successfully",
      action,
      interviewCoin: user.interviewCoin,
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};




export const addCoins = async (req, res) => {
  try {
    const sessionId = req.cookies?.session;

    const session = await redis.get(`session:${sessionId}`);

    if (!session) {
      return res.status(401).json({
        success: false,
        message: "Session expired",
      });
    }

    const sessionData = JSON.parse(session);

    const { coins } = req.body;

    if (!coins || coins <= 0) {
      return res.status(400).json({
        success: false,
        message: "Valid coins are required",
      });
    }

    const user = await User.findById(sessionData.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.interviewCoin += Number(coins);

    await user.save();

    // Update Redis Session
    await redis.set(
      `session:${sessionId}`,
      JSON.stringify({
        userId: user._id,
        name: user.name,
        email: user.email,
        interviewCoin: user.interviewCoin,
      }),
      "EX",
      60 * 60 * 24 * 7
    );

    return res.status(200).json({
      success: true,
      message: "Coins added successfully",
      interviewCoin: user.interviewCoin,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};