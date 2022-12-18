import express from 'express';
import authController from '../controllers/authController';

const router = express.Router();

router.post('/login', authController.postUserLogin);

export default router;
