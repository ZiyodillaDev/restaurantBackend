import { Request, Response } from "express";
import Categories from "../../models/Category.js";

class CategoryController {
    async getAllCategories(req: Request, res: Response): Promise<void> {
        try {
            const categories = await Categories.find();

            res.status(200).json(categories);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
    async createCategory(req: Request, res: Response) {
        const { mealCategory } = req.body;

        try {
            await Categories.create({
                mealCategory,
            });
            res.status(201).json({ message: "Successfully created category" });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async getOneCategory(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            const category = await Categories.findById(id);
            if (!category) {
                res.status(400).json({ error: "There is no menu with this id" });
            } else {
                res.status(200).json(category);
            }
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateCategory(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const { mealCategory } = req.body;

        try {
            const category = await Categories.findByIdAndUpdate(id, { mealCategory });

            if (!category) {
                res.status(404).json({ error: 'Category not found' });
            }
            res.status(200).json({ message: "Category succesfully edited" });

        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async deleteCategory(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        try {
            const category = await Categories.findByIdAndDelete(id);

            if (!category) {
                res.status(404).json({ error: 'Category not found' });
            }

            res.status(200).json({ message: "Category succesfully deleted" });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async searchCategory(req: Request, res: Response): Promise<void> {
        const search = req.params["search"].toLowerCase();;
        try {
            const categories = await Categories.find({});
            const searchedCategory = categories.filter((menu) => menu.mealCategory.toLowerCase().includes(search));
            res.status(200).json(searchedCategory);

        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default new CategoryController();
