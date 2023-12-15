// Importing necessary modules and services
import { Request, Response } from "express";
import * as cartService from "./cart.service";
import CustomError from "../../exception/custom-error";

// Controller function for adding or updating an item in the cart
export const addOrUpdate = async (req: Request, res: Response) => {
  try {
    // Sending a 200 status response with the result of the addOrUpdate operation
    res.status(200).send(await cartService.addOrUpdate(req.body));
  } catch (error) {
    // Handling errors by throwing a custom error with a descriptive message
    throw new CustomError(error, "Error saving cart data");
  }
};

// Controller function for finding all items in the cart
export const findAll = async (req: Request, res: Response) => {
  try {
    // Sending a 200 status response with the result of the findAll operation
    res.status(200).send(await cartService.findAll(req.query));
  } catch (error) {
    // Handling errors by throwing a custom error with a descriptive message
    throw new CustomError(error, "Error findAll cart data");
  }
};

// Controller function for finding a cart item by userId and name
export const findOneByUserIdAndName = async (req: Request, res: Response) => {
  try {
    // Sending a 200 status response with the result of the findOneByUserIdAndName operation
    res.status(200).send(await cartService.findOneByUserIdAndName(req.query));
  } catch (error) {
    // Handling errors by throwing a custom error with a descriptive message
    throw new CustomError(error, "Error findOneByUserIdAndName cart data");
  }
};

// Controller function for moving a cart item
export const moveCartItem = async (req: Request, res: Response) => {
  try {
    // Sending a 200 status response with the result of the moveCartItem operation
    res.status(200).send(await cartService.moveCartItem(req.query));
  } catch (error) {
    // Handling errors by throwing a custom error with a descriptive message
    throw new CustomError(error, "Error moveCartItem cart data");
  }
};
