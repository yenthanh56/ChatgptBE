import express, { Express, Response, Request } from "express";
import * as dotenv from "dotenv";
import cors from "cors";

import router from "./router/index";

dotenv.config();
const app: Express = express();
const PORT = 3000;

// middle
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// router
router(app);

// database
import "./config/Database";

// port
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
