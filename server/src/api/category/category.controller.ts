import { Request, Response } from "express";
import * as categoryService from "./category.service";
import CustomError from "../../exception/custom-error";

//category sync
export const categorySync = async (req: Request, res: Response) => {
  try {
    res.status(200).send(await categoryService.categorySync(req.body));
  } catch (error) {
    throw new CustomError(error, "Error category Sync data");
  }
};
