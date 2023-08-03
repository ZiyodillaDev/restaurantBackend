import { Request, Response } from "express";
import Menus from "../../models/Menu.js";

interface AuthRequest extends Request {
    user?: any;
}

class MenuController {

    async getAllMenus(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const menus = await Menus.find({ restaurantId: id })
                .populate("restaurantId categoryId")

            res.status(200).json(menus);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
    async createMenu(req: AuthRequest, res: Response,) {
        const restaurantId = req.user?.id
        const { mealname, price, categoryId } = req.body;
        const { imageName: image } = req as any;

        try {
            await Menus.create({
                restaurantId,
                mealname,
                price,
                categoryId,
                image,
            });
            res.status(201).json({ message: "Successfully created menu" });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
    async getOneMenu(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            const restaurant = await Menus.findById(id)
                .populate("restaurantId categoryId")
            if (!restaurant) {
                res.status(400).json({ error: "There is no menu with this id" });
            }

            else {
                res.status(200).json(restaurant);
            }

        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateMenu(req: AuthRequest, res: Response): Promise<void> {
        const { id } = req.params;
        const { mealname, price } = req.body;
        const { imageName: image } = req as any;

        try {
            const menu = await Menus.findByIdAndUpdate(id, { mealname, price, image });

            if (!menu) {
                res.status(404).json({ error: 'Menu not found' });
            }
            res.status(200).json({ message: "Menu succesfully edited" });

        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async deleteMenu(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        try {
            const menu = await Menus.findByIdAndDelete(id);

            if (!menu) {
                res.status(404).json({ error: 'Menu not found' });
            }

            res.status(200).json({ message: "Menu succesfully deleted" });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }


    async searchMenu(req: Request, res: Response): Promise<void> {
        const search = req.params["search"].toLowerCase();;
        try {
            const menus = await Menus.find({});
            const searchedMenu = menus.filter((menu) => menu.mealname.toLowerCase().includes(search));
            res.status(200).json(searchedMenu);

        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

}

export default new MenuController();