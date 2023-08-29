import { config } from "dotenv";
config();
export const stripeConfig = require("stripe")(process.env.STRIPE_SECRET_KEY);
