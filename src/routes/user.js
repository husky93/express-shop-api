import { Router } from 'express';
import passport from 'passport';
import usersController from '../controllers/usersController';

const router = Router();

router.post('/', usersController.postUser);

router.get(
  '/:userId',
  passport.authenticate('jwt', { session: false }),
  usersController.getUser
);

router.put(
  '/:userId',
  passport.authenticate('jwt', { session: false }),
  usersController.updateUser
);

router.delete(
  '/:userId',
  passport.authenticate('jwt', { session: false }),
  usersController.deleteUser
);

export default router;
