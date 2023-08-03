import { Router } from 'express';
import deliveryRequestsController from '../controllers/deliveryRequest.controller.js';
import { isAdmin } from '../middlewares/isAdmin.middleware.js';
import { isAuth } from '../middlewares/isAuth.middleware.js';
import { isDelivery } from '../middlewares/isDelivery.middleware.js';
import { isRestaurant } from '../middlewares/isRestaurant.middleware.js';

export const router = Router();
router.get('/deliveryRequests', isAuth, isAdmin, deliveryRequestsController.getAllRequests.bind(deliveryRequestsController));
router.post('/deliveryRequests', isAuth, isDelivery, deliveryRequestsController.createRequest.bind(deliveryRequestsController));
router.put('/deliveryRequests/:id', isAuth, isRestaurant, deliveryRequestsController.createResponse.bind(deliveryRequestsController));

