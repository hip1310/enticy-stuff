// Import necessary modules and libraries
import express from 'express';
import { DataSource } from 'typeorm';
import { config } from "dotenv";
import logger from '../middleware/logger';

// Load environment variables from a .env file
config();

// Create an Express application
const app = express();
// Enable JSON parsing for incoming requests
app.use(express.json());

// Create a DataSource (TypeORM) for connecting to the PostgreSQL database
const connectionPool = new DataSource({
  type: "postgres",
  username: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
  // Define entities for TypeORM to use (Entity files for the application)
  entities: ["./src/api/*/*.entity.ts"],
  // Define migration files for TypeORM to use
  migrations: ["./src/database/migrations/*"],
  // Enable SSL for secure connections if the database username is "mentorguser"
  ssl: process.env.DB_USERNAME === "mentorguser" ? true : false,
  // Run migrations automatically during initialization
  migrationsRun: true,
});

// Initialize the connection pool
connectionPool
  .initialize()
  .then(() => {
    // Log a success message if the initialization is successful
    logger.info("Data Source has been initialized!");
  })
  .catch((err) => {
    // Log an error message if there's an issue during initialization
    logger.error("Error during Data Source initialization:", err);
  });

// Export the initialized connection pool for use in other parts of the application
export default connectionPool;

