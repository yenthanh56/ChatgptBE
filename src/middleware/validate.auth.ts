import express, { Request, Response, NextFunction } from "express";

export const validateRegister = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const errors: string[] = [];
	const { name, account, password, cf_password } = req.body;
	// check name
	if (!name) {
		errors.push("Vui lòng nhập tên đăng nhập!");
	}
	if (!validateName(name)) {
		errors.push(
			"Tên đăng nhập phải ít nhất 6 ký tự và không sử dụng khoảng trắng!"
		);
	} else if (name.length > 20) {
		errors.push("Tên của bạn dài tối đa 20 ký tự!");
	}
	// check account include email | phone
	if (!account) {
		errors.push("Vui lòng thêm email của bạn!");
	} else if (!validateEmail(account)) {
		errors.push("Định dạng email không chính xác!");
	}
	// check password
	if (password.length <= 8) {
		errors.push("Mật khẩu phải có ít nhất 8 ký tự!");
	} else if (password.length === 0) {
		errors.push("Vui lòng nhập mật khẩu!");
	} else if (!validataPassword(password)) {
		errors.push(
			"Mật khẩu phải có ít nhất 8 ký tự đến 20 ký tự, ít nhất 1 chữ cái, 1 số, 1 ký tự đặc biệt!"
		);
	}
	if (password !== cf_password) {
		errors.push("Xác nhận mật khẩu không chính xác!");
	}
	// check error array
	if (errors.length > 0) return res.status(400).json({ msg: errors });
	next();
};

export const validateName = (name: string) => {
	const re = /^[a-zA-Z0-9]*$/g;
	if (name.length < 6) {
		return;
	}
	return re.test(name);
};

export const validateEmail = (email: string) => {
	return String(email)
		.toLowerCase()
		.match(
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		);
};

// export const validatePhone = (phone: string) => {
// 	const re = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
// 	return re.test(phone);
// };

export const validataPassword = (password: string) => {
	const re =
		/^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/g;
	return re.test(password);
};
