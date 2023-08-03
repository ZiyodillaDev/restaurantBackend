import express, { Express } from "express";
import { errorHandler } from "../api/middlewares/error-handler.js";
import cors from "cors"
import indexRouter from "../api/routes/index.js";
import fileUpload from "express-fileupload"
const modules = (app: Express) => {
  app.use(cors({ origin: "*" }));
  app.use(express.json());
  app.use(fileUpload());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(`${process.cwd()}/uploads`));
  app.use("/api",indexRouter);
  app.use(errorHandler);
};

export default modules;
