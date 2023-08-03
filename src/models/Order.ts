import { Schema, model } from "mongoose";
import { IOrder } from "../interface/order.interface.js";

const OrderSchema = new Schema<IOrder>({
    userId: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }],
    restaurantId: [{
        type: Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: true,
    }],
    courierId: [{
        type: Schema.Types.ObjectId,
        ref: 'Delivery',
    }],
    status: {
        type: String,
        default: "restaurant",
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    mealId: [{
        type: Schema.Types.ObjectId,
        ref: 'Menu',
        required: true,
    }],

}, { timestamps: true });

const Orders = model<IOrder>("Order", OrderSchema);

export default Orders;
