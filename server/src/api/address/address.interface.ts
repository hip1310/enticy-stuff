import { UserInterface } from "../user/user.interface";

// Define the structure of a Address
export interface AddressInterface {
  id: number;           // Unique identifier for the Address
  name: string;         // User name
  mobile: string;        // User mobile number
  address_line1: string;        // User address line 1
  address_line2?: string;          // User address line 2
  landmark: string;        // User landmark
  pincode: string; // User pincode
  default_address?: boolean; // Optional default_address if the address is associated to default address
  userId?: number; // Optional user ID if the address item is associated with a user
  user?: UserInterface; // Optional user ID if the Address item is associated with a user
  updated_at?: Date;    // Optional timestamp indicating when the item was last updated
}

// Define a common interface for finding multiple Address items
export interface FindAllInterface {
  userId?: number;      // Optional user ID to filter Address items by user
}

// Define a common interface for finding Address
export interface FindByIdInterface {
  id?: number;      // Optional user ID to filter Address items by user
}

// Define a common interface for delete multiple Address items
export interface DeleteInterface {
  userId?: number;      // Optional user ID to filter Address items by user
  id?: number;           // Unique identifier for the Address
}