import { Schema, model } from "mongoose";
import { IMenu } from "../interface/menu.interface.js";

const MenuSchema = new Schema<IMenu>({
    mealname: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },

    rating: {
        type: Number,
        default: 0,
    },

    restaurantId: [{
        type: Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: true,
    }],
    categoryId: [{
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    }],

}, { timestamps: true });

const Menu = model<IMenu>("Menu", MenuSchema);

export default Menu;
