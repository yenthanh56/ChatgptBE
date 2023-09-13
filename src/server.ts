import express, { Express, Response, Request, NextFunction } from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./router/index";

dotenv.config();
const app: Express = express();
const PORT = 3000;

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
