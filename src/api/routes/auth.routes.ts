import { Router } from 'express';
import authController from '../controllers/auth.controller.js';

export const router = Router();
router.post('/admin/login', authController.loginAdmin.bind(authController));
router.post('/restaurant/register', authController.registerRestaurant.bind(authController));
router.post('/restaurant/login', authController.loginRestaurant.bind(authController));
router.post('/delivery/register', authController.registerDelivery.bind(authController));
router.post('/delivery/login', authController.loginDelivery.bind(authController));
router.post('/user/register', authController.registerUser.bind(authController));
router.post('/user/login', authController.loginUser.bind(authController)); 
