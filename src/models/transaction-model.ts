import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema({
    transactionId: { type: Number, required: true, unique: true },
    accountId: { type: Number, required: true },
    value: { type: Number, required: true },
    transactionDate: { type: Date, default: Date.now },
});

export const TransactionModel = mongoose.model('Transaction', TransactionSchema);
