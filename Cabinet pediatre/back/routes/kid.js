import express from 'express';

import { getKids,createKid,updateKid,deleteKid } from '../controllers/kid.js';

const router = express.Router();

router.get('/', getKids);
router.post('/:id', createKid);
router.patch('/:id', updateKid);
router.delete('/:id', deleteKid);

export default router;

