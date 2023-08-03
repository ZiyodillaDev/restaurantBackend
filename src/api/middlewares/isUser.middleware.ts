import { NextFunction, Request, Response } from "express";
interface AuthRequest extends Request {
    user?: any;
}
export const isUser = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const data = req.user;
    if (data.role != "user") {
        return res.status(400).json({ message: "You are not user" });
    }
    next();
};
