import { Request, Response } from "express";
import Users from "../../models/Users.js";
import bcrypt from "bcrypt";
import Stripe from 'stripe';
const stripe = new Stripe("sk_test_51NXawyE6q43ktW46TH9L1wINN3e2YDKxRVrhVZTsL6HtWpD3HnRxFy03LXLlYlUJHYXA0TYNYwRnNjlj2ExXcmjA00BAXy5C8o", {
    apiVersion: '2022-11-15',
});
interface AuthRequest extends Request {
    user?: any;
}

class UserController {

    async getAllUser(req: Request, res: Response): Promise<void> {
        const skip: string = req.params["skip"]
        const limit: string = req.params["limit"];
        const s = (+skip - 1) * +limit

        try {
            const users = await Users.find()
                .skip(s)
                .limit(+limit)

            res.status(200).json(users);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async getOneUser(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            const user = await Users.findById(id)
            if (!user) {
                res.status(400).json({ error: "There is no user with this id" });
            }

            else {
                res.status(200).json(user);
            }

        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async deleteUser(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        try {
            const user = await Users.findByIdAndDelete(id);

            if (!user) {
                res.status(404).json({ error: 'User not found' });
            }

            res.status(200).json({ message: "User succesfully deleted" });
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

            await Users.findByIdAndUpdate(id, {
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

    async searchUser(req: Request, res: Response): Promise<void> {
        const search = req.params["search"].toLowerCase();;
        try {
            const usres = await Users.find({});
            const searchedUser = usres.filter((user) => user.fullname.toLowerCase().includes(search) || user.username.toLowerCase().includes(search));
            res.status(200).json(searchedUser);

        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }


    async updateBalance(req: AuthRequest, res: Response): Promise<void> {
        const userId = req.user?.id
        let { amount, id } = req.body

        try {

            const payment = await stripe.paymentIntents.create({
                amount,
                currency: "USD",
                description: "Payment",
                payment_method: id,
                confirm: true
            })

            const users = await Users.findById(userId)
            if (!users) {
                res.status(404).json({ message: "No user with this id" });
            } else {
                const balance = +amount + users!.balance
                console.log(balance);
                await Users.findByIdAndUpdate(userId, {
                    balance
                });
                res.status(200).json({ message: "Updated your balance",success: true });
            }

        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

}

export default new UserController();