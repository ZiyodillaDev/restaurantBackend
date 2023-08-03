import { Router } from 'express';
import deliveryController from '../controllers/delivery.controller.js';
import { isAuth } from '../middlewares/isAuth.middleware.js';
import { isAdmin } from '../middlewares/isAdmin.middleware.js';
import fileUpload from '../middlewares/fileUpload.js';
import { isDelivery } from '../middlewares/isDelivery.middleware.js';

export const router = Router();
router.get('/delivery/:skip/:limit', isAuth, isAdmin, deliveryController.getAllDelivery.bind(deliveryController));
router.get('/delivery/:id', isAuth, isAdmin, deliveryController.getOneDelivery.bind(deliveryController));
router.put('/delivery/:id', isAuth, isAdmin, deliveryController.updateDelivery.bind(deliveryController));
router.delete('/delivery/:id', isAuth, isAdmin, deliveryController.deleteDelivery.bind(deliveryController));
router.put('/deliverySelf', fileUpload, isAuth, isDelivery, deliveryController.updateSelf.bind(deliveryController));
router.get('/deliverySearch/:search', isAuth, isAdmin, deliveryController.searchDelivery.bind(deliveryController));