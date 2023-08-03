import { Schema, model } from "mongoose";
import { IAuth } from "../interface/auth.interface.js";

const AdminSchema = new Schema<IAuth>({
    username: {
        type: String,
        required: true,
    },
    password: { 
        type: String,
        required: true,
    }
}, { timestamps: true });

const Admins = model<IAuth>("Admin", AdminSchema);

export default Admins;
