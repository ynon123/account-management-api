import { Request, Response } from 'express';
import {createNewPerson, deletePersonById} from '../services/person-service';

export const createPerson = async (req: Request, res: Response) => {
    try {
        const personData = req.body;

        const newPerson = await createNewPerson(personData);

        res.status(201).json(newPerson);
    } catch (error: any) {
        if (error.message?.includes('already registered')) {
            res.status(400).json({ error: error.message }); // (Bad Request)
        } else {
            console.error('Error creating person:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
};

export const deletePerson = async (req: Request, res: Response) => {
    try {
        const personId = parseInt(req.params.personId);
        if (isNaN(personId)) {
            return res.status(400).json({ error: 'Invalid personId parameter' });
        }

        const result = await deletePersonById(personId);

        res.status(200).json(result);
    } catch (error: any) {
        if (error.message?.includes('does not exist')) {
            res.status(404).json({ error: error.message });
        } else if (error.message?.includes('associated accounts')) {
            res.status(409).json({ error: error.message }); // (Conflict)
        }else {
            console.error('Error deleting  person:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
};
