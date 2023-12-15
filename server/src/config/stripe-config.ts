// Import the 'config' module from the 'dotenv' package
import { config } from "dotenv";

// Load environment variables from the '.env' file into process.env
config();

// Import the 'stripe' package and configure it with the Stripe secret key from the environment variables
export const stripeConfig = require("stripe")(process.env.STRIPE_SECRET_KEY);

