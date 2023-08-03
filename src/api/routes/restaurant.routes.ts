import { Router } from 'express';
import restaurantController from '../controllers/restaurant.controller.js';
import { isAuth } from '../middlewares/isAuth.middleware.js';
import { isAdmin } from '../middlewares/isAdmin.middleware.js';
import { isRestaurant } from '../middlewares/isRestaurant.middleware.js';
import fileUpload from '../middlewares/fileUpload.js';

export const router = Router();
router.get('/restaurant/:skip/:limit', restaurantController.getAllRestaurants.bind(restaurantController));
router.get('/restaurant/:id', restaurantController.getOneRestaurant.bind(restaurantController));
router.put('/restaurant/:id', isAuth, isAdmin, restaurantController.updateRestaurants.bind(restaurantController));
router.delete('/restaurant/:id', isAuth, isAdmin, restaurantController.deleteRestaurant.bind(restaurantController));
router.get('/restaurant/:lat/:long/:amount', restaurantController.getNearestRestaurants.bind(restaurantController));
router.put('/restaurantSelf', fileUpload, isAuth, isRestaurant, restaurantController.updateSelf.bind(restaurantController));
router.get('/restaurantSearch/:search', restaurantController.searchRestaurant.bind(restaurantController));