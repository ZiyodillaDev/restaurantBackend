import { Router } from 'express';
import cactegoryController from '../controllers/category.controller.js';
import { isAuth } from '../middlewares/isAuth.middleware.js';
import { isRestaurant } from '../middlewares/isRestaurant.middleware.js';

export const router = Router();
router.get('/category', cactegoryController.getAllCategories.bind(cactegoryController));
router.post('/category', isAuth, isRestaurant, cactegoryController.createCategory.bind(cactegoryController));
router.get('/category/:id', cactegoryController.getOneCategory.bind(cactegoryController));
router.put('/category/:id', isAuth, isRestaurant, cactegoryController.updateCategory.bind(cactegoryController));
router.delete('/category/:id', isAuth, isRestaurant, cactegoryController.deleteCategory.bind(cactegoryController));
router.get('/categorySearch/:search', cactegoryController.searchCategory.bind(cactegoryController));