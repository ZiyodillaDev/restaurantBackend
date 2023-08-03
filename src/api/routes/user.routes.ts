import { Router } from 'express';
import userController from '../controllers/user.controller.js';
import { isAuth } from '../middlewares/isAuth.middleware.js';
import { isAdmin } from '../middlewares/isAdmin.middleware.js';
import fileUpload from '../middlewares/fileUpload.js';
import { isUser } from '../middlewares/isUser.middleware.js';

export const router = Router();
router.get('/users/:skip/:limit', isAuth, isAdmin, userController.getAllUser.bind(userController));
router.get('/users/:id', isAuth, isAdmin, userController.getOneUser.bind(userController));
router.delete('/users/:id', isAuth, isAdmin, userController.deleteUser.bind(userController));
router.put('/userSelf', fileUpload, isAuth, isUser, userController.updateSelf.bind(userController));
router.get('/deliverySearch/:search', isAuth, isAdmin, userController.searchUser.bind(userController));
router.post('/balance', isAuth, isUser, userController.updateBalance.bind(userController));