import { Router } from 'express';
import { handleDeposit, handleWithdraw, getTransactions, getAccountStatementByPeriod } from '../controllers/transaction-controller';

const router = Router();

router.post('/:accountId/deposit', handleDeposit);
router.post('/:accountId/withdraw', handleWithdraw);
router.get('/:accountId/transactions', getTransactions);
router.get('/:accountId/transactions/filter', getAccountStatementByPeriod);

export default router;
