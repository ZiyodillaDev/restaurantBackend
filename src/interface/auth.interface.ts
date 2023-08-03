import mongoose, { Document, Types } from "mongoose";

export interface IAuth extends Document {
    username: string;
    password: string;
}

export interface IAuthUser extends Document {
    username: string;
    fullname: string;
    email: string;
    password: string;
    phone: string;
    balance: number;
    image: string;
}

export interface IAuthRestaurant extends Document {
    name: string;
    email: string;
    password: string;
    isverified: string;
    image: string;
    location: string;
    balance: number;
}

export interface IAuthDelivery extends Document {
    username: string;
    fullname: string;
    email: string;
    password: string;
    isverified: string;
    image: string;
    phone: string;
}

