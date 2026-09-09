import proxy from "express-http-proxy";

export const proxyWithUser = (serviceUrl, serviceName = "Microservice") => {
  return proxy(serviceUrl, {
    proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
      if (srcReq.user) {
        proxyReqOpts.headers["x-user-id"] = srcReq.user.userId;
      }
      return proxyReqOpts;
    },
    proxyErrorHandler: (err, res, next) => {
      console.error(`[Gateway Proxy Error] Failed to reach ${serviceName}:`, err.message);
      return res.status(503).json({
        success: false,
        message: `${serviceName} is currently unavailable or starting up. Please try again in a few seconds.`,
        error: err.code || err.message,
      });
    },
  });
};