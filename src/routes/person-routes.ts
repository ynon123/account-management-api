import { Router } from 'express';
import {createPerson, deletePerson} from '../controllers/person-controller';

const router = Router();

router.post('/', createPerson);
router.delete('/:personId', deletePerson);

export default router;
