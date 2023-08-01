import { NextFunction, Request, RequestHandler, Response } from "express";
import bcrypt from "bcrypt";

import Users from "../models/Users.js";
import { CustomError } from "../utils/custom-error.js";

export const registerController: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { username, password } = req.body;
    const findUser = await Users.findOne({ username });

    if (findUser) throw new CustomError("Username already exists", 403);

    const hashedPass: string = await bcrypt.hash(password, 7);

    await Users.create({ username, password: hashedPass });
    res.status(201).json({ message: "Successfully register" });
  } catch (error) {
    next(error);
  }
};