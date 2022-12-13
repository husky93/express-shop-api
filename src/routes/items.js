import { Router } from 'express';
import itemsController from '../controllers/itemsController';

const router = Router();

router.get('/', itemsController.getItems);

router.post('/', itemsController.postItem);

router.get('/:itemId', itemsController.getItem);

router.put('/:itemId', itemsController.updateItem);

router.delete('/:itemId', itemsController.deleteItem);

router.get('/:itemId/reviews', itemsController.getReviews);

router.post('/:itemId/reviews', itemsController.postReview);

router.put('/:itemId/reviews/:reviewId', itemsController.updateReview);

router.delete('/:itemId/reviews/:reviewId', itemsController.deleteReview);

export default router;
