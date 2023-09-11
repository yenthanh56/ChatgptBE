import botRouter from "./bot.router";
import authRouter from "./auth.router";
const router = (app: string | any) => {
	// user
	app.use("/v1/user", authRouter);

	// bot
	app.use("/v1/bot", botRouter);
};

export default router;
