import { NextFunction, Request, RequestHandler, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../../../config/config.js";
import { CustomError } from "../../utils/custom-error.js";

interface AuthRequest extends Request {
  user?: any;
}

export const isAuth: RequestHandler = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token =
      req.headers["authorization"] &&
      req.headers["authorization"].split(" ")[1];
    if (!token) throw new CustomError("Token not found", 401);
    const verify = jwt.verify(token, config.SECRET_KEY);
    req.user = verify;

    next();
  } catch (error) {
    next(error);
    console.log(error);
  }
};
