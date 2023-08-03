import mongoose, { Document, Types } from "mongoose";

export interface IDelivery extends Document {
  restaurantId: Types.ObjectId;
  deliveryId: Types.ObjectId;
  orderId: Types.ObjectId;
  isverified: Boolean;
}
