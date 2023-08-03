import { Schema, model } from "mongoose";
import { ICategory } from "../interface/category.interface.js";

const CategorySchema = new Schema<ICategory>({
    mealCategory: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const Category = model<ICategory>("Category", CategorySchema);

export default Category;
