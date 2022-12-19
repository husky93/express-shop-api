import express from 'express';
import authController from '../controllers/authController';

const router = express.Router();

router.post('/login', authController.postUserLogin);

router.get('/refresh', authController.getUserRefresh);

router.get('/logout', authController.getUserLogout);

export default router;
