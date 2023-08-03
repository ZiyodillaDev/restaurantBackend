import mongoose, { Document, Types } from "mongoose";

export interface IMenu extends Document {
  mealname: string;
  price: number;
  image: string;
  restaurantId: Types.ObjectId;
  categoryId: Types.ObjectId;
  rating: number;
}
