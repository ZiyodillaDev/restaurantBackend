import { Request, Response } from "express";
import Restaurants from "../../models/Restaurant.js";
import bcrypt from "bcrypt";

interface AuthRequest extends Request {
    user?: any;
}


class RestaurantController {

    async getAllRestaurants(req: Request, res: Response): Promise<void> {
        const skip: string = req.params["skip"]
        const limit: string = req.params["limit"];
        const s = (+skip - 1) * +limit

        try {
            const restaurants = await Restaurants.find()
                .skip(s)
                .limit(+limit)

            res.status(200).json(restaurants);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
    async getOneRestaurant(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            const restaurant = await Restaurants.findById(id)
            if (!restaurant) {
                res.status(400).json({ error: "There is no restauramt with this id" });
            }

            else {
                res.status(200).json(restaurant);
            }

        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async getNearestRestaurants(req: Request, res: Response): Promise<void> {
        const myLatitude: string = req.params["lat"]
        const myLongitude: string = req.params["long"];
        const amountResturant: string = req.params["amount"];

        try {

            function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
                const R = 6371;
                const dLat = (lat2 - lat1) * (Math.PI / 180);
                const dLon = (lon2 - lon1) * (Math.PI / 180);
                const a =
                    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                    Math.cos(lat1 * (Math.PI / 180)) *
                    Math.cos(lat2 * (Math.PI / 180)) *
                    Math.sin(dLon / 2) *
                    Math.sin(dLon / 2);
                const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                const distance = R * c;
                return distance;
            }
            const restorans = await Restaurants.find()

            const SortedtRestoran = restorans.map((restoran: any) => {
                const distance = calculateDistance(
                    +myLatitude,
                    +myLongitude,
                    +restoran.location.split(" ")[0],
                    +restoran.location.split(" ")[1]
                );
                return { ...restoran, distance };
            })
                .sort((a: any, b: any) => a.distance - b.distance);

            const closestRestoran = SortedtRestoran.slice(0, +amountResturant)[0]._doc;
            res.status(200).json(closestRestoran);


        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateRestaurants(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const { isverified } = req.body;

        try {
            if (isverified == "cancelled") {
                res.status(200).json({ message: "Unfortunately cancelled" });

                const restaurant = await Restaurants.findByIdAndUpdate(id, { isverified });

                if (!restaurant) {
                    res.status(404).json({ error: 'Restaurant not found' });
                }
            }
            if (isverified == "accepted") {
                res.status(200).json({ message: "Restaurant succesfully verified" });

                const restaurant = await Restaurants.findByIdAndUpdate(id, { isverified });

                if (!restaurant) {
                    res.status(404).json({ error: 'Restaurant not found' });
                }
            }
            else {
                res.status(400).json({ error: 'You can not set this status' });
            }

        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async deleteRestaurant(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        try {
            const restaurant = await Restaurants.findByIdAndDelete(id);

            if (!restaurant) {
                res.status(404).json({ error: 'Restaurant not found' });
            }

            res.status(200).json({ message: "Restaurant succesfully deleted" });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateSelf(req: AuthRequest, res: Response): Promise<void> {
        const id = req.user?.id
        const { name, password, location } = req.body;
        const { imageName: image } = req as any;

        try {
            const hashedPass: string = await bcrypt.hash(password, 10);

            await Restaurants.findByIdAndUpdate(id, {
                name,
                password: hashedPass,
                location,
                image,
            });
            res.status(200).json({ message: "Updated information of your restaurant" });

        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async searchRestaurant(req: Request, res: Response): Promise<void> {
        const search = req.params["search"].toLowerCase();;
        try {
            const restaurants = await Restaurants.find({});
            const searchedRestaurants = restaurants.filter((restaurant) => restaurant.name.toLowerCase().includes(search));
            res.status(200).json(searchedRestaurants);

        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

}

export default new RestaurantController();