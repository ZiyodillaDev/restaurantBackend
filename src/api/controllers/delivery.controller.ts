import { Request, Response } from "express";
import Deliveries from "../../models/Delivery.js";
import bcrypt from "bcrypt";
interface AuthRequest extends Request {
    user?: any;
}

class DeliveryController {

    async getAllDelivery(req: Request, res: Response): Promise<void> {
        const skip: string = req.params["skip"]
        const limit: string = req.params["limit"];
        const s = (+skip - 1) * +limit

        try {
            const deliveries = await Deliveries.find()
                .skip(s)
                .limit(+limit)

            res.status(200).json(deliveries);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async getOneDelivery(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            const delivery = await Deliveries.findById(id)
            if (!delivery) {
                res.status(400).json({ error: "There is no delivery with this id" });
            }

            else {
                res.status(200).json(delivery);
            }

        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateDelivery(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const { isverified } = req.body;

        try {
            if (isverified == "cancelled") {
                res.status(200).json({ message: "Unfortunately cancelled" });

                const delivery = await Deliveries.findByIdAndUpdate(id, { isverified });

                if (!delivery) {
                    res.status(404).json({ error: 'Delivery not found' });
                }
            }
            if (isverified == "accepted") {
                res.status(200).json({ message: "Delivery succesfully verified" });

                const delivery = await Deliveries.findByIdAndUpdate(id, { isverified });

                if (!delivery) {
                    res.status(404).json({ error: 'Delivery not found' });
                }
            }
            else {
                res.status(400).json({ error: 'You can not set this status' });
            }

        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async deleteDelivery(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        try {
            const delivery = await Deliveries.findByIdAndDelete(id);

            if (!delivery) {
                res.status(404).json({ error: 'Delivery not found' });
            }

            res.status(200).json({ message: "Delivery succesfully deleted" });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateSelf(req: AuthRequest, res: Response): Promise<void> {
        const id = req.user?.id
        const { fullname, password, phone, username } = req.body;
        const { imageName: image } = req as any;

        try {
            const hashedPass: string = await bcrypt.hash(password, 10);

            await Deliveries.findByIdAndUpdate(id, {
                fullname,
                password: hashedPass,
                phone,
                username,
                image,
            });
            res.status(200).json({ message: "Updated information of you" });

        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async searchDelivery(req: Request, res: Response): Promise<void> {
        const search = req.params["search"].toLowerCase();;
        try {
            const deliveries = await Deliveries.find({});
            const searchedDelivey = deliveries.filter((delivery) => delivery.fullname.toLowerCase().includes(search) || delivery.fullname.toLowerCase().includes(search));
            res.status(200).json(searchedDelivey);

        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

}

export default new DeliveryController();