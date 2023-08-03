import { Schema, model } from "mongoose";
import { IDelivery } from "../interface/delivery.interface.js";

const DeliveryRequestSchema = new Schema<IDelivery>({
    deliveryId: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }],
    restaurantId: [{
        type: Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: true,
    }],
    orderId: [{
        type: Schema.Types.ObjectId,
        ref: 'Order',
        required: true,
    }],
    isverified: {
        type: Boolean,
        default: false,
    },


}, { timestamps: true });

const DeliveryRequest = model<IDelivery>("DeliveryRequest", DeliveryRequestSchema);

export default DeliveryRequest;
