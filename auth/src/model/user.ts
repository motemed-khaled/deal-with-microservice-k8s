import mongoose from "mongoose";
import bcrypt from "bcryptjs";

import { UserDocument } from "../types/user.interface";

const userSchema = new mongoose.Schema<UserDocument>({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true, toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.password;
            delete ret.__v;
        }
    }
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    try {
        this.password = await bcrypt.hash(this.password, 12);
        return next();
    } catch (error) {
        return next(error as Error);
    }
});

userSchema.methods.validatePassword = async function (password: string) {
    return await bcrypt.compare(password, this.password);
}

export const userModel = mongoose.model<UserDocument>("user", userSchema);