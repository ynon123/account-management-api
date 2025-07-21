import mongoose, { Schema } from 'mongoose';

const accountSchema = new mongoose.Schema(
    {
        accountId: {type: Number, required: true, unique: true},
        personId: {type: Number, required: true},
        balance: {type: mongoose.Schema.Types.Decimal128, required: true, default: 0},
        dailyWithdrawalLimit: {type: mongoose.Schema.Types.Decimal128, required: true, default: 1000},
        activeFlag: {type: Boolean, default: true},
        accountType: {type: Number, required: true},
    },
    {timestamps: true}
);

export const AccountModel = mongoose.model('Account', accountSchema);

