import { NextFunction, Request, Response } from "express";
interface AuthRequest extends Request {
    user?: any;
}
export const isDelivery = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const data = req.user;
    if (data.role != "delivery") {
        return res.status(400).json({ message: "You are not delivery" });
    }
    next();
};
