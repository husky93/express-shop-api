import { Router } from 'express';
import passport from 'passport';
import itemsController from '../controllers/itemsController';
import { checkIfAdmin } from '../passport';

const router = Router();

router.get('/', itemsController.getItems);

router.post('/', [
  passport.authenticate('jwt', { session: false }),
  checkIfAdmin,
  itemsController.postItem,
]);

router.get('/:itemId', itemsController.getItem);

router.put('/:itemId', [
  passport.authenticate('jwt', { session: false }),
  checkIfAdmin,
  itemsController.updateItem,
]);

router.delete('/:itemId', [
  passport.authenticate('jwt', { session: false }),
  checkIfAdmin,
  itemsController.deleteItem,
]);

router.get('/:itemId/reviews', itemsController.getReviews);

router.post('/:itemId/reviews', [
  passport.authenticate('jwt', { session: false }),
  itemsController.postReview,
]);

router.put('/:itemId/reviews/:reviewId', [
  passport.authenticate('jwt', { session: false }),
  itemsController.updateReview,
]);

router.delete('/:itemId/reviews/:reviewId', [
  passport.authenticate('jwt', { session: false }),
  itemsController.deleteReview,
]);

export default router;
