import { Request, Response } from "express";
import Orders from "../../models/Order.js";
import Menus from "../../models/Menu.js";
import Users from "../../models/Users.js";
import Restaurants from "../../models/Restaurant.js";

interface AuthRequest extends Request {
    user?: any;
}
class OrderController {
    async getAllOrders(req: Request, res: Response): Promise<void> {
        try {
            const orders = await Orders.find().populate(
                "userId restaurantId courierId mealId"
            ).populate(
                {
                    path: 'mealId',
                    select: 'mealname price image rating'
                }
            )
            res.status(200).json(orders);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async createOrder(req: AuthRequest, res: Response) {
        const userId = req.user?.id;
        const { restaurantId, mealId: _id } = req.body;

        try {
            const users = await Users.findById(userId)

            const menus = await Menus.find({ restaurantId, _id })
            let totalPrice = 0;
            menus.forEach((sum) => {
                totalPrice += sum.price;
            })

            if (!menus.length) {
                res.status(404).json({ message: "There is no such menu in this restaurant" })
            }
            else if (users!.balance >= totalPrice) {
                await Orders.create({
                    restaurantId,
                    totalPrice,
                    mealId: _id,
                    userId,
                });
                const newUserBalance = users!.balance - totalPrice;
                const newRestaurantBalance = totalPrice
                await Users.findByIdAndUpdate(userId, { balance: newUserBalance });
                await Restaurants.findByIdAndUpdate(restaurantId, { balance: newRestaurantBalance });
                res.status(201).json({ message: "Successfully created order" });
            }
            else {
                res.status(400).json({ message: "Please fill your balance" });
            }

        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateOrder(req: AuthRequest, res: Response): Promise<void> {
        const { id } = req.params;
        const courierId = req.user?.id;
        const status = "user";

        try {
            const data = await Orders.findById(id);
            if (data?.courierId == courierId) {
                const orderChange = await Orders.findByIdAndUpdate(id, { status });
                if (orderChange) {
                    res.status(200).json({ message: "Order succesfully edited" });
                } else {
                    res.status(400).json({ message: "Order not found" });
                }
            } else {
                res.status(400).json({ message: "You are not delivery of this order" });
            }
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async getRestaurantOrders(req: AuthRequest, res: Response): Promise<void> {
        const restaurantId = req.user?.id;

        try {
            if (!restaurantId) {
                res.status(400).json({ error: "You are not allowed to do it" });
            }

            const orders = await Orders.find({ restaurantId }).populate(
                "userId restaurantId courierId mealId"
            ).populate(
                {
                    path: 'mealId',
                    select: 'mealname price image rating'
                }
            )

            res.status(200).json(orders);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async getDeliveryOrders(req: AuthRequest, res: Response): Promise<void> {
        const courierId = req.user?.id;

        try {
            if (!courierId) {
                res.status(400).json({ error: "You are not allowed to do it" });
            }

            const orders = await Orders.find({ courierId }).populate(
                "userId restaurantId courierId mealId"
            ).populate(
                {
                    path: 'mealId',
                    select: 'mealname price image rating'
                }
            )

            res.status(200).json(orders);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async getUserOrders(req: AuthRequest, res: Response): Promise<void> {
        const userId = req.user?.id;

        try {
            if (!userId) {
                res.status(400).json({ error: "You are not allowed to do it" });
            }

            const orders = await Orders.find({ userId }).populate(
                "userId restaurantId courierId mealId"
            ).populate(
                {
                    path: 'mealId',
                    select: 'mealname price image rating'
                }
            )

            res.status(200).json(orders);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default new OrderController();
