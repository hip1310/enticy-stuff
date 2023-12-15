// Importing necessary modules and services
import { Request, Response } from "express";
import * as addressService from "./address.service";
import CustomError from "../../exception/custom-error";

// Controller function for adding or updating an address
export const addOrUpdate = async (req: Request, res: Response) => {
  try {
    // Sending a 200 status response with the result of the addOrUpdate operation
    res.status(200).send(await addressService.addOrUpdate(req.body));
  } catch (error) {
    // Handling errors by throwing a custom error with a descriptive message
    throw new CustomError(error, "Error saving address data");
  }
};

// Controller function for finding all items in the address
export const findAll = async (req: Request, res: Response) => {
  try {
    // Sending a 200 status response with the result of the findAll operation
    res.status(200).send(await addressService.findAll(req.query));
  } catch (error) {
    // Handling errors by throwing a custom error with a descriptive message
    throw new CustomError(error, "Error findAll address data");
  }
};

export const deleteAddress = async (req: Request, res: Response) => {
  try {
    // Sending a 200 status response with the result of the deleteAddress operation
    res.status(200).send(await addressService.deleteAddress(req.query));
  } catch (error) {
    // Handling errors by throwing a custom error with a descriptive message
    throw new CustomError(error, "Error deleting address data");
  }
};