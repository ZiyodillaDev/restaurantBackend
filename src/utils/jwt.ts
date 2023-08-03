import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const secretKey = process.env.SECRET_KEY as string;

export const JWT = {
    SIGN: (payload: any): string => {
        return jwt.sign(payload, secretKey, { expiresIn: "24h" });
    },
    VERIFY: (token: string): any => {
        return jwt.verify(token, secretKey);
    }
};
