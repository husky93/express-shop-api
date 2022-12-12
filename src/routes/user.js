import { Router } from 'express';
import usersController from '../controllers/usersController';

const router = Router();

router.post('/', usersController.postUser);

router.get('/:userId', usersController.getUser);

router.put('/:userId', usersController.updateUser);

router.delete('/:userId', usersController.deleteUser);

export default router;
