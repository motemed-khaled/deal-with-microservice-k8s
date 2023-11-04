import { Document } from "mongoose";

export interface User{
    email: string;
    password: string;
}

export interface UserDocument extends Document , User{
    validatePassword(value: string): Promise<boolean>;
}