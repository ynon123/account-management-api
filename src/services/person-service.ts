import { PersonModel } from '../models/person-model';
import mongoose from 'mongoose';
import {exists} from "node:fs";
import { AccountModel } from '../models/account-model';

interface PersonInput {
    personId: number;
    name: string;
    document: string;
    birthDate: Date;
}

export const createNewPerson = async (data: PersonInput) => {
    const documentExists = await doesDocumentExist(data.document);
    if (documentExists) {
        throw new Error(`Person with document ${data.document} is already registered`);
    }
    const person  = new PersonModel({
        personId: await generateUniquePersonId(),
        name: data.name,
        document: data.document,
        birthDate: data.birthDate,
    });
    return await person.save();
};

export const deletePersonById = async (personId: number) => {
    const exists = await AccountModel.findOne({ personId: personId });
    if (exists) {
        throw new Error(`Cannot delete person with ID ${personId} because they have associated accounts`);
    }
    return PersonModel.deleteOne({personId: personId}).then((result) => {
        if (result.deletedCount === 0) {
            throw new Error(`Person with ID ${personId} does not exist`);
        }
        return {message: `Person with ID ${personId} deleted successfully`};
    });
};

async function doesDocumentExist(document: string): Promise<boolean> {
    const doc = await PersonModel.findOne({ document: document });
    return !!doc;
}

async function generateUniquePersonId(): Promise<number> {
    let unique = false;
    let personId: number;

    while (!unique) {
        personId = Math.floor(100000 + Math.random() * 900000);
        const exists = await PersonModel.findOne({ personId });
        if (!exists) {
            unique = true;
        }
    }

    return personId!;
}