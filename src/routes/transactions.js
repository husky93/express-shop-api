import { Router } from 'express';
import transactionsController from '../controllers/transactionsController';

const router = Router();

router.get('/', transactionsController.getTransactions);

router.post('/', transactionsController.postTransaction);

router.get('/:transactionId', transactionsController.getTransaction);

router.put('/:transactionId', transactionsController.updateTransaction);

router.delete('/:transactionId', transactionsController.deleteTransaction);

export default router;
