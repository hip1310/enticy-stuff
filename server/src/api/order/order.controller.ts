import { Request, Response } from "express";
import * as orderService from "./order.service";
import CustomError from "../../exception/custom-error";

// Controller function to find all orders
export const findAll = async (req: Request, res: Response) => {
  try {
    // Call the orderService to find all orders with the provided query parameters
    return res.status(200).send(await orderService.findAll(req.query));
  } catch (error) {
    // If an error occurs, throw a custom error with a meaningful message
    throw new CustomError(error, "Error findAll order data");
  }
};

// Controller function to find one order by userId and name
export const findOneByUserIdAndName = async (req: Request, res: Response) => {
  try {
    // Call the orderService to find one order by userId and name with the provided query parameters
    return res.status(200).send(await orderService.findOneByUserIdAndName(req.query));
  } catch (error) {
    // If an error occurs, throw a custom error with a meaningful message
    throw new CustomError(error, "Error findOneByUserIdAndName order data");
  }
};

// Controller function to change order status
export const changeOrderStatus = async (req: Request, res: Response) => {
  try {
    // Call the orderService to change the order status with the provided request body
    return res.status(200).send(await orderService.changeOrderStatus(req.body));
  } catch (error) {
    // If an error occurs, throw a custom error with a meaningful message
    throw new CustomError(error, "Error changeOrderStatus order data");
  }
};
