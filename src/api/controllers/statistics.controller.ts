import { Request, Response } from "express";
import Users from "../../models/Users.js";
import Restaurnats from "../../models/Restaurant.js";
import Deliveries from "../../models/Delivery.js";
import Orders from "../../models/Order.js";
interface statsRequest extends Request {
    createdAt?: any;
}
class StatisticsController {
    async getAllUsers(req: Request, res: Response): Promise<void> {
        try {
            const allUsers = await Users.find();

            const data = {
                "allUsersLendth": allUsers.length,
                allUsers
            }
            res.status(200).json(data);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async getAllRestaurants(req: Request, res: Response): Promise<void> {
        try {
            const pendingRestaurants = []
            const acceptedRestaurants = []
            const cancelledRestaurants = []
            const allRestaurants = await Restaurnats.find();
            allRestaurants.forEach((restaurant) => {
                if (restaurant.isverified == "pending") {
                    pendingRestaurants.push(restaurant)
                }
                if (restaurant.isverified == "accepted") {
                    acceptedRestaurants.push(restaurant)
                }
                if (restaurant.isverified == "cancelled") {
                    cancelledRestaurants.push(restaurant)
                }

            })
            const data = {
                "allRestaurantsLength": allRestaurants.length,
                "pendingRestaurantsLength": pendingRestaurants.length,
                "acceptedRestaurantsLength": acceptedRestaurants.length,
                "cancelledRestaurantsLength": cancelledRestaurants.length,
            }
            res.status(200).json(data);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async getAllDeliveries(req: Request, res: Response): Promise<void> {
        try {
            const pendingDeliveries = []
            const acceptedDeliveries = []
            const cancelledDeliveries = []
            const allDeiveries = await Deliveries.find();
            allDeiveries.forEach((restaurant) => {
                if (restaurant.isverified == "pending") {
                    pendingDeliveries.push(restaurant)
                }
                if (restaurant.isverified == "accepted") {
                    acceptedDeliveries.push(restaurant)
                }
                if (restaurant.isverified == "cancelled") {
                    cancelledDeliveries.push(restaurant)
                }

            })
            const data = {
                "allDeliveriesLength": allDeiveries.length,
                "pendingDeliveriesLength": pendingDeliveries.length,
                "acceptedDeliveriesLength": acceptedDeliveries.length,
                "cancelledDeliveriesLength": cancelledDeliveries.length,
            }
            res.status(200).json(data);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async getAllOrders(req: Request, res: Response): Promise<void> {
        try {
            const OrdersInRestaurant = []
            const OrdersInDelivery = []
            const OrdersInUser = []
            const allOrders = await Orders.find();
            allOrders.forEach((order) => {
                if (order.status == "restaurant") {
                    OrdersInRestaurant.push(order)
                }
                if (order.status == "delivery") {
                    OrdersInDelivery.push(order)
                }
                if (order.status == "user") {
                    OrdersInUser.push(order)
                }

            })
            const data = {
                "allOrdersLength": allOrders.length,
                "OrdersInRestaurant": OrdersInRestaurant.length,
                "OrdersInDelivery": OrdersInDelivery.length,
                "OrdersInUser": OrdersInUser.length,
            }
            res.status(200).json(data);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

}

export default new StatisticsController();
