import { Schema, model } from "mongoose";
import { IAuthUser } from "../interface/auth.interface.js";

const UserSchema = new Schema<IAuthUser>({
  username: {
    type: String,
    required: true,
  },
  fullname: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    default: 0
  },
  image: {
    type: String,
  }
}, { timestamps: true });

const Users = model<IAuthUser>("User", UserSchema);

export default Users;
