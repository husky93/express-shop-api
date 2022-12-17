import { Router } from 'express';
import passport from 'passport';
import categoriesController from '../controllers/categoriesController';
import { checkIfAdmin } from '../passport';

const router = Router();

router.get('/', categoriesController.getCategories);

router.post('/', [
  passport.authenticate('jwt', { session: false }),
  checkIfAdmin,
  categoriesController.postCategory,
]);

router.get('/:categoryId', categoriesController.getCategory);

router.put('/:categoryId', [
  passport.authenticate('jwt', { session: false }),
  checkIfAdmin,
  categoriesController.updateCategory,
]);

router.delete('/:categoryId', [
  passport.authenticate('jwt', { session: false }),
  checkIfAdmin,
  categoriesController.deleteCategory,
]);

export default router;
