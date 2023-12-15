// Importing necessary modules and services
import { Request, Response } from "express";
import * as cartService from "./scheduler.service";
import CustomError from "../../exception/custom-error";

// Controller function to promote orders
export const promoteOrders = async (req: Request, res: Response) => {
  try {
    // Call the cartService to promoteOrders
    return res.status(200).send(await cartService.promoteOrders());
  } catch (error) {
    // If an error occurs, throw a custom error with a meaningful message
    throw new CustomError(error, "Error findAll promoteOrders");
  }
};