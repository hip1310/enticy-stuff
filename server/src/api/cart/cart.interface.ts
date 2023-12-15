import { UserInterface } from "../user/user.interface";

// Define the structure of a cart item
export interface CartInterface {
  id: number;           // Unique identifier for the cart item
  name: string;         // Name of the item
  image: string;        // URL or path to the item's image
  qty: number;          // Quantity of the item
  price: string;        // Price of the item as a string
  userId?: number; // Optional user ID if the cart item is associated with a user
  user?: UserInterface; // Optional user ID if the cart item is associated with a user
  category: string;     // Category of the item
  updated_at?: Date;    // Optional timestamp indicating when the item was last updated
}

// Define a common interface for finding multiple cart items
export interface FindAllInterface {
  userId?: number;      // Optional user ID to filter cart items by user
}

// Define a common interface for finding a cart item by user ID and name
export interface FindOneByUserIdAndNameInterface {
  userId?: number;      // Optional user ID to uniquely identify a user
  name?: string;        // Optional name to uniquely identify a cart item by name
}

// Define an interface for moving a cart item, indicating the target user
export interface MoveCartItemInterface {
  userId?: number;      // User ID indicating the target user to move the cart item to
  addressId?: number
}

