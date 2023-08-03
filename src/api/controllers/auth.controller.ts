import Admins from "../../models/Admin.js";
import Users from "../../models/Users.js";
import Restaurants from "../../models/Restaurant.js";
import Delevieries from "../../models/Delivery.js";
import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import {
  IAuth,
  IAuthDelivery,
  IAuthRestaurant,
  IAuthUser,
} from "../../interface/auth.interface.js";
import { JWT } from "../../utils/jwt.js";

class AuthController {
  async loginAdmin(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { username, password }: IAuth = req.body;
    try {
      const admin = await Admins.findOne({ username });
      if (!admin) {
        res.status(403).json({ message: "Invalid username or password" });
      }

      const compare = await bcrypt.compare(password, admin!.password);
      if (!compare) {
        res.status(403).json({ message: "Invalid username or password" });
      } else {
        const token = JWT.SIGN({ id: admin?.id, role: "admin" });
        res.status(200).json({ token: token, role: "admin" });
      }
    } catch (error: any) {
      next(error);
      res.status(500).json({ error: error.message });
    }
  }
  async registerRestaurant(req: Request, res: Response, next: NextFunction) {
    const { name, email, password, location }: IAuthRestaurant = req.body;
    try {
      const hashedPass: string = await bcrypt.hash(password, 10);

      const findRestaurant = await Restaurants.findOne({ email });
      const findUser = await Users.findOne({ email });
      const findDelivery = await Delevieries.findOne({ email });

      if (findRestaurant || findUser || findDelivery) {
        return res.status(403).json({ message: "Email already exists" });
      } else {
        await Restaurants.create({
          name,
          email,
          password: hashedPass,
          location,
        });
        res.status(201).json({ message: "Successfully register" });
      }
    } catch (error: any) {
      next(error);
      res.status(500).json({ error: error.message });
    }
  }
  async loginRestaurant(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { email, password }: IAuthRestaurant = req.body;
    try {
      const restaurant = await Restaurants.findOne({ email });

      if (!restaurant) {
        res.status(403).json({ message: "Invalid username or password" });
      }

      const compare = await bcrypt.compare(password, restaurant!.password);
      if (!compare) {
        res.status(403).json({ message: "Invalid username or password" });
      }
      const verified = restaurant?.isverified;
      if (verified == "pending") {
        res
          .status(400)
          .json({
            message: "You are not allowed to enter by Admin yet",
            verified: verified,
          });
      }
      if (verified == "cancelled") {
        res
          .status(400)
          .json({
            message: "You have been cancelled by Admin",
            verified: verified,
          });
      } else {
        const token = JWT.SIGN({ id: restaurant?.id, role: "restaurant" });
        res.status(200).json({ token: token, role: "restaurant" });
      }
    } catch (error: any) {
      next(error);
      res.status(500).json({ error: error.message });
    }
  }
  async registerDelivery(req: Request, res: Response, next: NextFunction) {
    const { username, email, password, fullname, phone }: IAuthDelivery =
      req.body;
    try {
      const hashedPass: string = await bcrypt.hash(password, 10);

      const findRestaurant = await Restaurants.findOne({ email });
      const findUser = await Users.findOne({ email });
      const findDelivery = await Delevieries.findOne({ email });

      if (findDelivery || findUser || findRestaurant) {
        return res.status(403).json({ message: "Email already exists" });
      } else {
        await Delevieries.create({
          username,
          email,
          password: hashedPass,
          fullname,
          phone,
        });
        res.status(201).json({ message: "Successfully register" });
      }
    } catch (error: any) {
      next(error);
      res.status(500).json({ error: error.message });
    }
  }
  async loginDelivery(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { email, password }: IAuthDelivery = req.body;
    try {
      const delivery = await Delevieries.findOne({ email });

      if (!delivery) {
        res.status(403).json({ message: "Invalid username or password" });
      }

      const compare = await bcrypt.compare(password, delivery!.password);
      if (!compare) {
        res.status(403).json({ message: "Invalid username or password" });
      }
      const verified = delivery?.isverified;
      if (verified == "pending") {
        res
          .status(400)
          .json({
            message: "You are not allowed to enter by Admin yet",
            verified: verified,
          });
      }
      if (verified == "cancelled") {
        res
          .status(400)
          .json({
            message: "You have been cancelled by Admin",
            verified: verified,
          });
      }

      else {
        const token = JWT.SIGN({ id: delivery?.id, role: "delivery" });
        res.status(200).json({ token: token, role: "delivery" });
      }
    } catch (error: any) {
      next(error);
      res.status(500).json({ error: error.message });
    }
  }
  async registerUser(req: Request, res: Response, next: NextFunction) {
    const { username, email, password, fullname, phone }: IAuthUser = req.body;
    try {
      const hashedPass: string = await bcrypt.hash(password, 10);

      const findRestaurant = await Restaurants.findOne({ email });
      const findUser = await Users.findOne({ email });
      const findDelivery = await Delevieries.findOne({ email });

      if (findUser || findDelivery || findRestaurant) {
        return res.status(403).json({ message: "Email already exists" });
      } else {
        await Users.create({
          username,
          email,
          password: hashedPass,
          fullname,
          phone,
        });
        res.status(201).json({ message: "Successfully register" });
      }
    } catch (error: any) {
      next(error);
      res.status(500).json({ error: error.message });
    }
  }
  async loginUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { email, password }: IAuthUser = req.body;
    try {
      const user = await Users.findOne({ email });

      if (!user) {
        res.status(403).json({ message: "Invalid username or password" });
      }

      const compare = await bcrypt.compare(password, user!.password);
      if (!compare) {
        res.status(403).json({ message: "Invalid username or password" });
      } else {
        const token = JWT.SIGN({ id: user?.id, role: "user" });
        res.status(200).json({ token: token, role: "user" });
      }
    } catch (error: any) {
      next(error);
      res.status(500).json({ error: error.message });
    }
  }
}

export default new AuthController();
