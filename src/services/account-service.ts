import { AccountModel } from '../models/account-model';
import { PersonModel } from '../models/person-model';
import mongoose from 'mongoose';

interface AccountInput {
    accountId: number;
    personId: number;
    balance?: number;
    dailyWithdrawalLimit?: number;
    accountType: number;
}

export const createNewAccount = async (data: AccountInput) => {
    const personExists = await doesPersonExist(data.personId);
    if (!personExists) {
        throw new Error(`Person with ID ${data.personId} does not exist`);
    }
    const account = new AccountModel({
        accountId: await generateUniqueAccountId(),
        personId: data.personId,
        balance: mongoose.Types.Decimal128.fromString(String(data.balance ?? 0)),
        dailyWithdrawalLimit: mongoose.Types.Decimal128.fromString(String(data.dailyWithdrawalLimit ?? 1000)),
        activeFlag: true,
        accountType: data.accountType,
    });
    return await account.save();
};

export const deleteAccountById = async (accountId: number) => {
    return AccountModel.deleteOne({accountId: accountId}).then((result) => {
        if (result.deletedCount === 0) {
            throw new Error(`Account with ID ${accountId} does not exist`);
        }
        return {message: `Account with ID ${accountId} deleted successfully`};
    });
};

export const getAccountBalance = async (accountId: number) => {
    const account = await AccountModel.findOne({ accountId });
    if (!account) {
        throw new Error(`Account with ID ${accountId} does not exist`);
    }
    return { balance: account.balance };
};

export const blockAccountById = async (accountId: number) => {
    const account = await AccountModel.findOne({ accountId });
    if (!account) {
        throw new Error(`Account with ID ${accountId} does not exist`);
    }

    account.activeFlag = false;
    await account.save();
    return { message: `Account with ID ${accountId} has been blocked` };
};

async function doesPersonExist(personId: number): Promise<boolean> {
    const person = await PersonModel.findOne({ personId });
    return !!person;
}

async function generateUniqueAccountId(): Promise<number> {
    let unique = false;
    let accountId: number;

    while (!unique) {
        accountId = Math.floor(100000 + Math.random() * 900000);
        const exists = await AccountModel.findOne({ accountId });
        if (!exists) {
            unique = true;
        }
    }

    return accountId!;
}
