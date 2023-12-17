import { UserInterface } from "../user/user.interface";

// Define an interface representing the structure of an order
export interface OrderInterface {
  id: number;             // Unique identifier for the order
  name: string;           // Name of the order
  image: string;          // URL of the image associated with the order
  qty: number;            // Quantity of the order
  price: string;          // Price of the order as a string (consider using a more appropriate type)
  userId?: number;        // Optional user ID associated with the order
  user?: UserInterface; // Optional user ID if the cart item is associated with a user
  category: string;       // Category of the order
  status?: string;        // Optional status of the order
  warehouseId?: number;   // Optional warehouse ID associated with the order
  addressId?: number;   // Optional Address ID associated with the order
  address?: string;   // Optional Address associated with the order
  created_at?: Date;    // Optional timestamp indicating when the item was created
  updated_at?: Date;      // Optional updated_at with order
}

// Define an interface representing criteria for finding multiple orders
export interface FindAllInterface {
  userId?: number;        // Optional user ID for filtering orders
}

// Define an interface representing criteria for finding a single order by user ID and name
export interface FindOneByUserIdAndNameInterface {
  userId?: number;        // Optional user ID for filtering orders
  name?: string;          // Optional name for filtering orders
}

// Define an interface representing criteria for changing the status of an order
export interface ChangeOrderStatusInterface {
  userId?: number;        // Optional user ID associated with the order
  name?: string;          // Optional name of the order
  status: string;         // New status for the order
  warehouseCode: string;  // Warehouse code for the order
}
