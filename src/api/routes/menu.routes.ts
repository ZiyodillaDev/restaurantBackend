import { Router } from 'express';
import menuController from '../controllers/menu.controller.js';
import { isAuth } from '../middlewares/isAuth.middleware.js';
import { isAdmin } from '../middlewares/isAdmin.middleware.js';
import { isRestaurant } from '../middlewares/isRestaurant.middleware.js';
import fileUpload from '../middlewares/fileUpload.js';

export const router = Router();
router.get('/menusOfRestaurant/:id', menuController.getAllMenus.bind(menuController));
router.post('/menus', isAuth, isRestaurant, fileUpload, menuController.createMenu.bind(menuController));
router.get('/menus/:id', menuController.getOneMenu.bind(menuController));
router.put('/menus/:id', isAuth, isRestaurant, fileUpload, menuController.updateMenu.bind(menuController));
router.delete('/menus/:id', isAuth, isRestaurant, menuController.deleteMenu.bind(menuController));
router.get('/menuSearch/:search', menuController.searchMenu.bind(menuController));