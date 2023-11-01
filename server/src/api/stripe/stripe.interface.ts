// Define an interface for the expected structure of the Stripe data
export interface StripeInterface {
  amount: string;    // The amount of money in the smallest currency unit (e.g., cents)
  currency: string;  // The three-letter currency code (e.g., "USD" for US dollars)
}
