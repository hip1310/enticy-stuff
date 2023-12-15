// Import the database connection pool, User entity, and User interface
import connectionPool from "../../config/database";
import { User } from "./user.entity";
import { UserInterface } from "./user.interface";

// Function to create a user in the database
export const createUser = async (body: UserInterface) => {
  // Extract relevant fields from the request body
  const { email, email_verified, name, nickname, picture, sub, updated_at } = body;

  // Get the repository for the User entity from the connection pool
  const userRepository = connectionPool.getRepository(User);

  // Declare a variable to store user data
  let userData;

  // Check if a user with the given email already exists in the database
  await userRepository
    .find({
      where: { email: email },
    })
    .then(async (response) => {
      // Retrieve the existing user, if any
      const existingUser: UserInterface = response?.[0];

      // If the user exists, update the user's information
      if (existingUser) {
        const updatedUser = {
          email: existingUser.email,
          email_verified: email_verified,
          name: name,
          nickname: nickname,
          picture: picture,
          sub: sub,
          updated_at: updated_at,
        };

        // Update the user in the database
        userRepository.update({ id: existingUser.id }, updatedUser);

        // Set the user data with the updated information
        userData = { ...updatedUser, id: existingUser.id };
      } else {
        // If the user does not exist, create a new user
        const user = userRepository.create({
          email: email,
          email_verified: email_verified,
          name: name,
          nickname: nickname,
          picture: picture,
          sub: sub,
          updated_at: updated_at,
        });

        // Save the new user to the database
        userData = await userRepository.save(user);
      }
    });

  // Return the user data (either updated or newly created)
  return userData;
};
