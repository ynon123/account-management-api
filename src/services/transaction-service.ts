import { TransactionModel } from '../models/transaction-model';
import { AccountModel } from '../models/account-model';
import mongoose from 'mongoose';

export const deposit = async (accountId: number, amount: number) => {
    if (amount <= 0) throw new Error('Deposit amount must be positive');

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const account = await AccountModel.findOne({ accountId }).session(session);
        if (!account) throw new Error('Account not found');

        const currentBalance = parseFloat(account.balance.toString());
        const updatedBalance = currentBalance + amount;
        account.balance = mongoose.Types.Decimal128.fromString(updatedBalance.toString());

        await account.save({ session });

        const transaction = new TransactionModel({
            transactionId: await generateUniqueTransactionId(),
            accountId,
            value: amount,
            transactionDate: new Date(),
        });
        await transaction.save({ session });

        await session.commitTransaction();
        session.endSession();
        return transaction;
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
};

export const withdraw = async (accountId: number, amount: number) => {
    if (amount <= 0) throw new Error('Withdraw amount must be positive');

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const account = await AccountModel.findOne({ accountId }).session(session);
        if (!account) throw new Error('Account not found');

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);

        const todayWithdrawals = await TransactionModel.aggregate([
            {
                $match: {
                    accountId,
                    transactionDate: { $gte: today, $lt: tomorrow },
                    value: { $lt: 0 },
                },
            },
            {
                $group: {
                    _id: null,
                    totalWithdrawn: { $sum: '$value' },
                },
            },
        ]);

        const totalWithdrawnToday: number = Math.abs(todayWithdrawals[0]?.totalWithdrawn || 0);
        const limit = parseFloat(account.dailyWithdrawalLimit.toString());

        if (totalWithdrawnToday + amount > limit) {
            throw new Error('Daily withdrawal limit exceeded');
        }

        const currentBalance = parseFloat(account.balance.toString());
        if (currentBalance < amount) throw new Error('Insufficient funds');

        const updatedBalance = currentBalance - amount;
        account.balance = mongoose.Types.Decimal128.fromString(updatedBalance.toString());

        await account.save({ session });

        const transaction = new TransactionModel({
            transactionId: await generateUniqueTransactionId(),
            accountId,
            value: -amount,
            transactionDate: new Date(),
        });
        await transaction.save({ session });

        await session.commitTransaction();
        session.endSession();
        return transaction;
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
};

export const getAccountTransactions = async (accountId: number) => {
    return TransactionModel.find({ accountId }).sort({ transactionDate: -1 });
};

export const getTransactionsByPeriod = async (
    accountId: number,
    startDate: Date,
    endDate: Date
) => {
    if (startDate > endDate) {
        throw new Error('Start date must be before end date');
    }

    return TransactionModel.find({
        accountId,
        transactionDate: {
            $gte: startDate,
            $lte: endDate
        }
    }).sort({ transactionDate: -1 });
};

async function generateUniqueTransactionId(): Promise<number> {
    let unique = false;
    let transactionId: number;

    while (!unique) {
        transactionId = Math.floor(100000 + Math.random() * 900000);
        const exists = await AccountModel.findOne({ transactionId });
        if (!exists) {
            unique = true;
        }
    }

    return transactionId!;
}