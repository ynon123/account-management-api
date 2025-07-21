import { Request, Response } from 'express';
import { deposit, withdraw, getAccountTransactions, getTransactionsByPeriod} from '../services/transaction-service';

export const handleDeposit = async (req: Request, res: Response) => {
    try {
        const accountId = parseInt(req.params.accountId);
        const value = req.body.value;

        const tx = await deposit(accountId, value);
        res.status(200).json(tx);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

export const handleWithdraw = async (req: Request, res: Response) => {
    try {
        const accountId = parseInt(req.params.accountId);
        const value = req.body.value;

        const tx = await withdraw(accountId, value);
        res.status(200).json(tx);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

export const getTransactions = async (req: Request, res: Response) => {
    try {
        const accountId = parseInt(req.params.accountId);
        const txs = await getAccountTransactions(accountId);
        res.status(200).json(txs);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

export const getAccountStatementByPeriod = async (req: Request, res: Response) => {
    try {
        const accountId = parseInt(req.params.accountId);
        const { from, to } = req.query;

        if (isNaN(accountId)) {
            return res.status(400).json({ error: 'Invalid accountId' });
        }

        if (!from || !to) {
            return res.status(400).json({ error: 'startDate and endDate are required' });
        }

        const start = new Date(from as string);
        const end = new Date(to as string);

        const transactions = await getTransactionsByPeriod(accountId, start, end);

        res.status(200).json(transactions);
    } catch (error: any) {
        console.error('Error fetching statement:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
