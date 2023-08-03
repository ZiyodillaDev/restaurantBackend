import { Schema, model } from "mongoose";
import { IAuthRestaurant } from "../interface/auth.interface.js";

const RestaurantSchema = new Schema<IAuthRestaurant>({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    balance: {
        type: Number,
        default: 0
      },
    password: {
        type: String,
        required: true,
    },
    isverified: {
        type: String,
        default: "pending",
    },
    image: {
        type: String,
        default: null
    },
    location: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const Restaurants = model<IAuthRestaurant>("Restaurant", RestaurantSchema);

export default Restaurants;
