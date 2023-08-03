import mongoose, { Document, Types } from "mongoose";

export interface IRating extends Document {
  userId: Types.ObjectId;
  rate: number;
  comment: string;
  mealId: Types.ObjectId;
}
