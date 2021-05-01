import express from 'express';

import { getKids,createKid,updateKid,deleteKid } from '../controllers/kid.js';
import auth from '../middleware/auth.js'

const router = express.Router();

router.get('/', getKids);
router.post('/', createKid);
router.patch('/:id', auth, updateKid);
router.delete('/:id', auth, deleteKid);

export default router;