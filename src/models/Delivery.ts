import { Schema, model } from "mongoose";
import { IAuthDelivery } from "../interface/auth.interface.js";

const DeliverySchema = new Schema<IAuthDelivery>({
    username: {
        type: String,
        required: true,
    },
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    phone: {
        type: String,
        required: true,
    },
    isverified: {
        type: String,
        default: "pending",
    }
}, { timestamps: true });

const Deliveries = model<IAuthDelivery>("Delivery", DeliverySchema);

export default Deliveries;
