import { Document } from "mongoose";
export interface IUser extends Document {
	name: string;
	account: string;
	password: string;
	avatar: string;
	role: string;
	type: string;
	_doc: object;
}
