import { Request, Response } from 'express';
import {createNewAccount, deleteAccountById, getAccountBalance, blockAccountById} from '../services/account-service';

export const createAccount = async (req: Request, res: Response) => {
    try {
        const accountData = req.body;
        console.log(req.body)

        const newAccount = await createNewAccount(accountData);

        res.status(201).json(newAccount);
    } catch (error: any) {
        if (error.message?.includes('does not exist')) {
            res.status(400).json({ error: error.message }); // (Bad Request)
        } else {
            console.error('Error creating account:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
};

export const deleteAccount = async (req: Request, res: Response) => {
    try {
        const accountId = parseInt(req.params.accountId);
        if (isNaN(accountId)) {
            return res.status(400).json({ error: 'Invalid accountId parameter' });
        }

        const result = await deleteAccountById(accountId);

        res.status(200).json(result);
    } catch (error: any) {
        if (error.message?.includes('does not exist')) {
            res.status(404).json({ error: error.message });
        } else {
            console.error('Error deleting  account:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
};

export const getBalance = async (req: Request, res: Response) => {
    try {
        const accountId = parseInt(req.params.accountId);
        if (isNaN(accountId)) {
            return res.status(400).json({ error: 'Invalid accountId parameter' });
        }

        const result = await getAccountBalance(accountId);
        res.status(200).json(result);
    } catch (error: any) {
        if (error.message?.includes('does not exist')) {
            res.status(404).json({ error: error.message });
        } else {
            console.error('Error retrieving balance:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
};

export const blockAccount = async (req: Request, res: Response) => {
    try {
        const accountId = parseInt(req.params.accountId);
        if (isNaN(accountId)) {
            return res.status(400).json({ error: 'Invalid accountId parameter' });
        }

        const result = await blockAccountById(accountId);
        res.status(200).json(result);
    } catch (error: any) {
        if (error.message?.includes('does not exist')) {
            res.status(404).json({ error: error.message });
        } else {
            console.error('Error blocking account:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
};
