import { NextFunction, Request, Response } from "express";
interface AuthRequest extends Request {
    user?: any;
}
export const isAdmin = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const data = req.user;
    if (data.role != "admin") {
        return res.status(400).json({ message: "You are not admin" });
    }
    next();
};
