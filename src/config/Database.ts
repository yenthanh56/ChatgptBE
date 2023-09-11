// const mongoose = require("mongoose");
import mongoose from "mongoose";

const URI = process.env.MONGOOSEDB;

mongoose
	.connect(`${URI}`, {
		// useCreateIndex: true,
		// useFindAndModify: false,
		// useNewUrlParser: true,
		// useUnifiedTopology: true,
	})
	.then(() => {
		console.log("Database connected");
	})
	.catch((error: string) => {
		console.log("db error", error);
	});
