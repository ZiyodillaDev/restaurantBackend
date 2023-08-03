import express from "express";
import { router as authRouter } from "./auth.routes.js";
import { router as restaurantRouter } from "./restaurant.routes.js";
import { router as menuRouter } from "./menu.routes.js";
import { router as categoryRouter } from "./category.routes.js";
import { router as deliveryRouter } from "./deleivery.routes.js";
import { router as orderRouter } from "./order.routes.js";
import { router as deliveryRequestsRouter } from "./deliveryRequest.routes.js";
import { router as usersRouter } from "./user.routes.js";
import { router as ratingRouter } from "./rating.routes.js";
import { router as statsRouter } from "./statistics.routes.js";

const router = express.Router();
router.use('/auth', authRouter);
router.use('/', restaurantRouter);
router.use('/', menuRouter);
router.use('/', categoryRouter);
router.use('/', deliveryRouter);
router.use('/', orderRouter);
router.use('/', deliveryRequestsRouter);
router.use('/', usersRouter);
router.use('/', ratingRouter);
router.use('/', statsRouter);


export default router;
