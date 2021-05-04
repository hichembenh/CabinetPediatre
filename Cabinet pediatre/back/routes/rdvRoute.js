import express from 'express';

import { getRdvs,
    createRdv,
    updateRdv,
    deleteRdv} from '../controllers/rdvController.js';

const router = express.Router();

router.get('/', getRdvs);
router.post('/', createRdv);
router.patch('/:id', updateRdv);
router.delete('/:id', deleteRdv);

export default router;