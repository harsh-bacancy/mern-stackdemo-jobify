import { readFile } from "fs/promises";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import Job from "./models/jobModels.js";
import User from "./models/UserModel.js";

try {
  await mongoose.connect(process.env.CONNECTION_URL);
  const user = await User.findOne({ email: "admin@gmail.com" });

  const jsonJob = await JSON.parse(
    await readFile(new URL("./utils/mockJobData.json", import.meta.url))
  );
  const jobs = jsonJob.map((job) => {
    return { ...job, createdBy: user._id };
  });

  await Job.deleteMany({ createdBy: user._id });
  await Job.create(jobs);
  console.log("Jobs Created");
} catch (error) {
  console.log("🚀 ~ file: populate.js:13 ~ error:", error);
} finally {
  process.exit(0);
}
