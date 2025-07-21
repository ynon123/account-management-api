import mongoose from 'mongoose';

const personSchema = new mongoose.Schema(
    {
        personId: {type: Number, required: true, unique: true},
        name: {type: String},
        document: {type: String, required: true, unique: true},
        birthDate: {type: Date, required: true}
    },
    {timestamps: true}
);

export const PersonModel = mongoose.model('Person', personSchema);

