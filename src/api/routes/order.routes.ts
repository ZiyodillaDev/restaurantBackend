import { Router } from 'express';
import orderController from '../controllers/order.controller.js';
import { isAdmin } from '../middlewares/isAdmin.middleware.js';
import { isAuth } from '../middlewares/isAuth.middleware.js';
import { isDelivery } from '../middlewares/isDelivery.middleware.js';
import { isRestaurant } from '../middlewares/isRestaurant.middleware.js';
import { isUser } from '../middlewares/isUser.middleware.js';

export const router = Router();
router.get('/orders', isAuth, isAdmin, orderController.getAllOrders.bind(orderController));
router.post('/orders', isAuth, isUser, orderController.createOrder.bind(orderController));
router.put('/orders/:id', isAuth, isDelivery, orderController.updateOrder.bind(orderController)); 
router.get('/restaurantOrder', isAuth, isRestaurant, orderController.getRestaurantOrders.bind(orderController));
router.get('/deliveryOrder', isAuth, isDelivery, orderController.getDeliveryOrders.bind(orderController));
router.get('/userOrder', isAuth, isUser, orderController.getUserOrders.bind(orderController));

