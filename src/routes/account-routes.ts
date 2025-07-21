import { Router } from 'express';
import {createAccount, deleteAccount, getBalance, blockAccount} from '../controllers/account-controller';

const router = Router();

router.post('/', createAccount);
router.delete('/:accountId', deleteAccount);
router.get('/:accountId/balance', getBalance);
router.patch('/:accountId/block', blockAccount);

export default router;
