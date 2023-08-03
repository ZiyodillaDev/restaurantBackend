import { Router } from 'express';
import statisticsController from '../controllers/statistics.controller.js';
import { isAdmin } from '../middlewares/isAdmin.middleware.js';
import { isAuth } from '../middlewares/isAuth.middleware.js';

export const router = Router();
router.get('/userStatistics', isAuth, isAdmin, statisticsController.getAllUsers.bind(statisticsController));
router.get('/restaurantStatistics', isAuth, isAdmin, statisticsController.getAllRestaurants.bind(statisticsController));
router.get('/deliveryStatistics', isAuth, isAdmin, statisticsController.getAllDeliveries.bind(statisticsController));
router.get('/orderStatistics', isAuth, isAdmin, statisticsController.getAllOrders.bind(statisticsController));
