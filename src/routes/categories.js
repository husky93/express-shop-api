import { Router } from 'express';
import categoriesController from '../controllers/categoriesController';

const router = Router();

router.get('/', categoriesController.getCategories);

router.post('/', categoriesController.postCategory);

router.get('/:categoryId', categoriesController.getCategory);

router.put('/:categoryId', categoriesController.updateCategory);

router.delete('/:categoryId', categoriesController.deleteCategory);

export default router;
