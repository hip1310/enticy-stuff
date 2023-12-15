// Import the Winston logging library
import winston from 'winston';

// Create a logger instance with the specified configuration
const logger = winston.createLogger({
  // Set the logging level to 'info'
  level: 'info',
  // Use the JSON format for log entries
  format: winston.format.json(),
  // Define transports (output destinations) for the logs
  transports: [
    // Log to the console
    new winston.transports.Console(),
    // Log to a file with the specified filename ('combined.log')
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

// Export the logger instance for use in other modules
export default logger;
