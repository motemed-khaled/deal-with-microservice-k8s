import { Request, Response, NextFunction } from "express";
import "express-async-errors";

export const getOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(200).json({id:req.params.id});
};
