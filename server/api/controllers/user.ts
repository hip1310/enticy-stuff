import { User } from "../entity/User";
import connectionPool from "../data-source";

//Create a user
export const createUser = async (req: any, res: any, next: any) => {
  try {
    const { email, email_verified, name, nickname, picture, sub, updated_at } =
      req.body;

    // Create a new user document and save it to the database
    const userRepository = connectionPool.getRepository(User);

    userRepository
      .find({
        where: { email: email },
      })
      .then(async (response) => {
        const existingUser: any = response?.[0];
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
          userRepository.update({ id: existingUser.id }, updatedUser);
          res.status(200).send({ ...updatedUser, id: existingUser.id });
        } else {
          const user = userRepository.create({
            email: email,
            email_verified: email_verified,
            name: name,
            nickname: nickname,
            picture: picture,
            sub: sub,
            updated_at: updated_at,
          });
          const savedData = await userRepository.save(user);
          res.status(200).send(savedData);
        }
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error saving user data" });
  }
};
