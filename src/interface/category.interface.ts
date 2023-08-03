import mongoose, { Document, Types } from "mongoose";

export interface ICategory extends Document {
  mealCategory: string;
}
