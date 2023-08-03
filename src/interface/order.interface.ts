import mongoose, { Document, Types } from "mongoose";

export interface IOrder extends Document {
  userId: Types.ObjectId;
  restaurantId: Types.ObjectId;
  courierId: Types.ObjectId;
  status: string;
  totalPrice: number;
  mealId: Types.ObjectId[]
}
