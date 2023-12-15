import { Request, Response } from "express";
import * as userService from "./user.service";
import CustomError from "../../exception/custom-error";

// Controller function for creating a user
export const createUser = async (req: Request, res: Response) => {
  try {
    // Send a 200 OK response with the result of creating a user
    res.status(200).send(await userService.createUser(req.body));
  } catch (error) {
    // If an error occurs during user creation, throw a custom error
    throw new CustomError(error, "Error saving user data");
  }
};
