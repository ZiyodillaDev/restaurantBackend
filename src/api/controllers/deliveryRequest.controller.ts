import { Request, Response } from "express";
import DeliveryRequests from "../../models/DeliveryRequests.js";
import Orders from "../../models/Order.js";

interface AuthRequest extends Request {
    user?: any;
}
class DeliveryRequestController {
    async getAllRequests(req: Request, res: Response): Promise<void> {
        try {
            const orders = await DeliveryRequests.find()
                .populate("deliveryId restaurantId orderId");
            res.status(200).json(orders);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
    async createRequest(req: AuthRequest, res: Response) {
        const deliveryId = req.user?.id
        const { restaurantId, orderId } = req.body;

        try {
            await DeliveryRequests.create({
                restaurantId, orderId, deliveryId
            });
            res.status(201).json({ message: "Successfully created request" });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
    async createResponse(req: AuthRequest, res: Response) {
        const { id } = req.params;
        const restaurantId = req.user?.id


        const { isverified } = req.body;

        try {
            const data = await DeliveryRequests.findById(id)
            const courierId = data?.deliveryId.toString()
            const orderId = data?.orderId.toString()
            const status = "delivery"


            if (isverified == true && restaurantId == data?.restaurantId.toString()) {
                await Orders.findByIdAndUpdate(orderId, { courierId, status });
                const response = await DeliveryRequests.findByIdAndUpdate(id, { isverified });

                if (!response) {
                    res.status(404).json({ error: 'Request not found' });
                }
                else {
                    res.status(201).json({ message: "Successfully created response" });
                }
            } else {
                res.status(404).json({ error: 'You are not restaurant of this delivery' });
            }

        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default new DeliveryRequestController();
