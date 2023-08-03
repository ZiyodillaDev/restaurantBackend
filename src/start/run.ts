import { connect } from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import config from "../../config/config.js";
import Admins from "../models/Admin.js";
import { Application } from "express";

const run = async (app: Application) => {
  if (config.ConnectionString) {
    await connect(config.ConnectionString);
    const admin = await Admins.findOne();
    if (!admin)
      Admins.create({
        username: "admin",
        password: "$2a$10$4GFd8yGZjTjwiazICt3Us.UyvZwKEn9cyoN63ZJSkShYMMzGjxhr6",
      });
  } else {
    console.error("ConnectionString is required");
  }
  const PORT: number = config.PORT;  
  
  app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
  });
};
export default run;
