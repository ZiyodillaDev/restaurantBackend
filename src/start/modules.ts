import express, { Express, Request, Response, NextFunction } from "express";
import { errorHandler } from "../middlewares/error-handler.js";
import routes from "../routes/index.js";
const modules = (app: Express) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(routes);
  app.use(errorHandler);
};

export default modules;
