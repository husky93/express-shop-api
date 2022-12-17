import { Router } from 'express';
import passport from 'passport';
import transactionsController from '../controllers/transactionsController';
import { checkIfAdmin } from '../passport';

const router = Router();

router.get('/', [
  passport.authenticate('jwt', { session: false }),
  transactionsController.getTransactions,
]);

router.post('/', [
  passport.authenticate('jwt', { session: false }),
  transactionsController.postTransaction,
]);

router.get('/:transactionId', [
  passport.authenticate('jwt', { session: false }),
  transactionsController.getTransaction,
]);

router.put('/:transactionId', [
  passport.authenticate('jwt', { session: false }),
  checkIfAdmin,
  transactionsController.updateTransaction,
]);

router.delete('/:transactionId', [
  passport.authenticate('jwt', { session: false }),
  checkIfAdmin,
  transactionsController.deleteTransaction,
]);

export default router;
