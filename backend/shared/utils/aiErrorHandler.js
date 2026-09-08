/**
 * Shared AI Error Handler for SkillForge Microservices
 * Analyzes errors originating from AI/LLM providers (Groq, Google Gemini, LangChain, LangGraph)
 * and formats a clean, user-friendly response with correct HTTP status codes.
 */

export const handleAiError = (error, res, fallbackMessage = "AI service error") => {
  console.error("[AI Error]:", error);

  const errorMsg = (error?.message || "").toLowerCase();
  const errorString = String(error || "").toLowerCase();
  const status = error?.status || error?.statusCode || error?.response?.status;
  const code = error?.code || error?.error?.code;

  // 1. Check for Rate Limit / Quota Exhaustion (HTTP 429)
  const isRateLimit =
    status === 429 ||
    code === "rate_limit_exceeded" ||
    code === "insufficient_quota" ||
    errorMsg.includes("rate limit") ||
    errorMsg.includes("rate_limit") ||
    errorMsg.includes("429") ||
    errorMsg.includes("quota") ||
    errorMsg.includes("tokens per minute") ||
    errorMsg.includes("tpm") ||
    errorMsg.includes("requests per minute") ||
    errorMsg.includes("rpm") ||
    errorMsg.includes("resource has been exhausted") ||
    errorMsg.includes("resource_exhausted") ||
    errorMsg.includes("too many requests") ||
    errorMsg.includes("model is overloaded");

  if (isRateLimit) {
    return res.status(429).json({
      success: false,
      isRateLimit: true,
      errorType: "RATE_LIMIT_EXCEEDED",
      message:
        "AI service quota or rate limit reached. The system is temporarily busy — please wait a moment and try again.",
    });
  }

  // 2. Check for Authentication / API Key issues
  const isAuthError =
    status === 401 ||
    status === 403 ||
    code === "invalid_api_key" ||
    errorMsg.includes("api key") ||
    errorMsg.includes("unauthorized") ||
    errorMsg.includes("authentication");

  if (isAuthError) {
    return res.status(503).json({
      success: false,
      isRateLimit: false,
      errorType: "AI_CONFIG_ERROR",
      message:
        "AI service configuration error. Please verify the AI API key and credentials.",
    });
  }

  // 3. Check for Timeout / Network Unreachability
  const isTimeout =
    code === "ETIMEDOUT" ||
    code === "ECONNABORTED" ||
    code === "ECONNREFUSED" ||
    errorMsg.includes("timeout") ||
    errorMsg.includes("network error");

  if (isTimeout) {
    return res.status(504).json({
      success: false,
      isRateLimit: false,
      errorType: "AI_TIMEOUT",
      message:
        "AI service request timed out. Please check your internet connection and try again.",
    });
  }

  // 4. Default Server / Processing Error
  return res.status(500).json({
    success: false,
    isRateLimit: false,
    errorType: "AI_PROCESSING_ERROR",
    message: error?.message || fallbackMessage,
  });
};

export default handleAiError;
