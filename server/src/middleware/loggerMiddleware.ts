import { Request, Response, NextFunction } from "express";
import logger from "./logger";

/**
 * Middleware for logging incoming requests and outgoing responses.
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next function.
 */
function loggerInterceptor(req: Request, res: Response, next: NextFunction) {
  // Record the start time of the request
  const start = Date.now();

  try {
    // Log the incoming request details
    logger.info({
      method: req.method,
      url: req.originalUrl,
      ip: req.ip,
      headers: req.headers,
    });

    // Override the response 'send' method to capture the response details
    const originalSend = res.send;
    res.send = function (body) {
      // Calculate the response time
      const responseTime = Date.now() - start;

      // Log the outgoing response details
      logger.info({
        method: req.method,
        url: req.originalUrl,
        ip: req.ip,
        statusCode: res.statusCode,
        responseTime: `${responseTime}ms`,
      });

      // Call the original 'send' method to send the response
      return originalSend.call(this, body);
    };

    // Move to the next middleware or route handler
    next();
  } catch (error) {
    // Handle any errors that occur during logging
    logger.error(`Error in loggerInterceptor middleware: ${error}`);
    next(error); // Pass the error to the error handling middleware
  }
}

export default loggerInterceptor;
