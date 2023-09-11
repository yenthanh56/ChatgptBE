import mongoose from "mongoose";
import { IUser } from "../types/user.type";

const UserSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "Please add your name"],
			trim: true,
			maxLength: [20, "Your name is up to 20 chars long"],
			unique: true,
		},
		account: {
			type: String,
			required: [true, "please add your email"],
			trim: true,
			unique: true,
		},
		password: {
			type: String,
			required: [true, "please add your password"],
		},
		avatar: {
			type: String,
			default:
				"https://res.cloudinary.com/dsfoqe4fq/image/upload/v1681359754/avata/avatar_dtdr9z.jpg",
		},
		role: {
			type: String,
			default: "user",
		},
		type: {
			type: String,
			default: "register",
		},
	},
	{
		timestamps: true,
	}
);

export default mongoose.model<IUser>("Users", UserSchema);
