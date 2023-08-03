import { Router } from 'express';
import ratingController from '../controllers/rating.controller.js';
import { isAuth } from '../middlewares/isAuth.middleware.js';
import { isUser } from '../middlewares/isUser.middleware.js';

export const router = Router();
router.get('/ratings', ratingController.getAllRatings.bind(ratingController));
router.post('/ratings', isAuth, isUser, ratingController.createRating.bind(ratingController));
