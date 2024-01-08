import "express-async-errors";
import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { StatusCodes } from "http-status-codes";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import cloudinary from "cloudinary";
import helmet from "helmet";
import mongosanitize from "express-mongo-sanitize";

import jobRouter from "./routes/jobRouter.js";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
import { authenticateUser } from "./middleware/authMiddleware.js";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 5100;
const __dirname = dirname(fileURLToPath(import.meta.url));
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

app.use(express.static(path.resolve(__dirname, "./my-vue-app/dist")));
app.use(cookieParser()); // CookieParser middleware
app.use(express.json()); // JSON parser middleware
app.use(helmet());
app.use(mongosanitize());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev")); // Logs in development mode
}

app.use("/api/v1/auth", authRouter); // Auth middleware
app.use("/api/v1/users", authenticateUser, userRouter); // User middleware
app.use("/api/v1/jobs", authenticateUser, jobRouter); // Job middleware
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./my-vue-app/dist", "index.html"));
});
app.use("*", (req, res) => {
  res.status(StatusCodes.NOT_FOUND).json({ message: "Route not found" }); // Not found route error
});

app.use(errorHandlerMiddleware); // error handler middleware
try {
  await mongoose.connect(process.env.CONNECTION_URL);
  app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
  });
} catch (err) {
  console.log("🚀 ~ file: server.js:32 ~ err:", err);
  process.exit(1);
}
