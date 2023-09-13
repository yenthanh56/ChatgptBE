import express, { Express, Response, Request, NextFunction } from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./router/index";

dotenv.config();
const app: Express = express();
const PORT = 3000;

app.use(function (req: Request, res: Response, next: NextFunction) {
	// Website you wish to allow to connect
	// Website you wish to allow to connect
	res.setHeader("Access-Control-Allow-Origin", "*");

	// Request methods you wish to allow
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, OPTIONS, PUT, PATCH, DELETE"
	);

	// Request headers you wish to allow
	res.setHeader(
		"Access-Control-Allow-Headers",
		"X-Requested-With,content-type"
	);

	// Set to true if you need the website to include cookies in the requests sent
	// to the API (e.g. in case you use sessions)
	// res.setHeader("Access-Control-Allow-Credentials", true);

	// Pass to next layer of middleware
	next();
});
// middle
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// router
app.use("/v1/hello", (req, res) => {
	return res.status(200).json({
		msg: "halo",
	});
});
router(app);

// database
import "./config/Database";

// port
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

export default app;
