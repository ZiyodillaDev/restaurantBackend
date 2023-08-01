import { NextFunction, Request, RequestHandler, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Users from "../models/Users.js";
import { CustomError } from "../utils/custom-error.js";
import config from "../../config/config.js";

export const loginController: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { username, password } = req.body;

    const user = await Users.findOne({ username });
    if (!user) throw new CustomError("Invalid username or password", 403);

    const compare = await bcrypt.compare(password, user.password);
    if (!compare) throw new CustomError("Invalid username or password", 403);

    const token = jwt.sign({ id: user.id }, config.SECRET_KEY); 
    res.status(200).json({ token: token });
  } catch (error) {
    next(error);
  }
};
