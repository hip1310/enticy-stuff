// Define an interface named UserInterface to represent the structure of a user object.
export interface UserInterface {
  // Numeric identifier for the user.
  id: number;
  
  // Email address associated with the user.
  email: string;
  
  // Indicates whether the user's email has been verified.
  email_verified: boolean;
  
  // The name of the user.
  name: string;
  
  // A nickname or username associated with the user.
  nickname: string;
  
  // URL to the user's profile picture.
  picture: string;
  
  // A unique identifier for the user, often used as a subject claim in tokens.
  sub: string;
  
  // Date and time when the user's information was last updated.
  updated_at: Date;
}
