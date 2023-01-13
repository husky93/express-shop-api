import express from 'express';
import fileController from '../controllers/fileController';

const router = express.Router();

router.get('/:name', fileController.download);

export default router;
