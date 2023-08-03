import { Request, Response } from "express";
import Ratings from "../../models/Rating.js";
import Menus from "../../models/Menu.js";

interface AuthRequest extends Request {
    user?: any;
}

class RatingController {
    async getAllRatings(req: Request, res: Response): Promise<void> {
        try {
            const ratings = await Ratings.find()
                .populate("userId mealId")

            res.status(200).json(ratings);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async createRating(req: AuthRequest, res: Response) {
        const userId = req.user?.id

        const { comment, rate, mealId } = req.body;


        try {
            await Ratings.create({
                userId, comment, rate, mealId
            });

            let rating = 0
            const ratings = await Ratings.find({ mealId })
            ratings.forEach((r) => {
                rating = (r.rate + rating)

            })
            rating = rating / ratings.length

            await Menus.findByIdAndUpdate(mealId, { rating })


            res.status(201).json({ message: "Successfully created rating" });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default new RatingController();
