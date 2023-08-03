import { Schema, model } from "mongoose";
import { IRating } from "../interface/rating.interface.js";

const RatingSchema = new Schema<IRating>({
    userId: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }],
    comment: {
        type: String,
    },
    rate: {
        type: Number,
        required: true,
    },
    mealId: [{
        type: Schema.Types.ObjectId,
        ref: 'Menu',
        required: true,
    }],
}, { timestamps: true });

const Ratings = model<IRating>("Rating", RatingSchema);

export default Ratings;
