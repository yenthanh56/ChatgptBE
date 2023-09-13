import express, { Express, Response, Request } from "express";
import * as dotenv from "dotenv";
import cors from "cors";

import router from "./router/index";

dotenv.config();
const app: Express = express();
const PORT = 3000;

app.use(function (req, res, next) {
	// Website you wish to allow to connect
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Credentials", "true");
	res.setHeader("Access-Control-Max-Age", "1800");
	res.setHeader("Access-Control-Allow-Headers", "content-type");
	res.setHeader(
		"Access-Control-Allow-Methods",
		"PUT, POST, GET, DELETE, PATCH, OPTIONS"
	);

	// Pass to next layer of middleware
	next();
});
// middle
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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
