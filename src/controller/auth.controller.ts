import { Request, Response } from "express";
import Users from "../models/usser.model";
import bcrypt from "bcryptjs";
import { generateAccessToken } from "../config/generateToken";

import { IUser } from "../types/user.type";

export const register = async (req: Request, res: Response) => {
	try {
		const { name, account, password, cf_password } = req.body;
		const salt = await bcrypt.genSaltSync(10);
		const hasPassword = await bcrypt.hashSync(password, salt);
		const cfPassword = await bcrypt.hashSync(cf_password, salt);

		// get user includes (name , account)

		const user = await Users.findOne({ name, account });

		// get user includes (name)

		const username = await Users.findOne({ name });

		// get account include (email | phone )

		const userAccount = await Users.findOne({ account });

		// check pass

		if (user) {
			return res.status(400).json({
				msg: "Tên hoặc gmail đã tồn tại!",
			});
		}
		if (username) {
			return res.status(400).json({
				msg: "Tên đăng nhập đã tồn tại!",
			});
		}

		if (userAccount) {
			return res.status(400).json({
				msg: "Địa chỉ gmail đã tồn tại!",
			});
		}

		const newUser = {
			name,
			account,
			password: hasPassword,
			cf_password: cfPassword,
		};
		const createUser = new Users(newUser);
		await createUser.save();

		return res.status(200).json({
			status: "OK",
			msg: "Đăng ký thành công",
			data: createUser,
		});
	} catch (error) {
		return res.status(500).json(error);
	}
};

export const login = async (req: Request, res: Response) => {
	const { name, password } = req.body;
	if (name.length === 0) {
		return res.status(400).json({ msg: "Hãy nhập tên đăng nhập!" });
	}
	const user = await Users.findOne({ name });
	if (!user)
		return res.status(401).json({ msg: "Tên đăng nhập không hợp lệ!" });

	loginUser(user, password, res);
};

export const logout = async (req: Request, res: Response) => {
	try {
		return res.status(200).json({ msg: "Đăng xuất thành công!" });
	} catch (error) {
		return res.status(500).json(error);
	}
};

const loginUser = async (user: IUser, password: string, res: Response) => {
	const isMathPass = await bcrypt.compare(password, user.password);
	if (password.length === 0) {
		return res.status(400).json({
			msg: "Vui lòng nhập mật khẩu!",
		});
	}
	if (!isMathPass)
		return res.status(400).json({
			msg: "Mật khẩu không hợp lệ!",
		});

	const accessToken = generateAccessToken({ id: user._id });

	return res.status(200).json({
		msg: "Đăng nhập thành công!",
		accessToken,
		user: { ...user._doc, password: "" },
	});
};
