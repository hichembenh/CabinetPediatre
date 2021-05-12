import express from 'express';

import {
    getRdvs,
    createRdv,
    updateRdv,
    deleteRdv,
    getMyRdv
} from '../controllers/rdvController.js';

const router = express.Router();

router.get('/', getRdvs);
router.get('/:id',getMyRdv);
router.post('/', createRdv);
router.patch('/:id', updateRdv);
router.delete('/:id', deleteRdv);

export default router;