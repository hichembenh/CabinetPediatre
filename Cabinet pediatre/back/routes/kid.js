import express from 'express';

import { getKids,createKid,updateKid,deleteKid } from '../controllers/kid.js';
import {updateVaccin} from "../controllers/vaccinController.js";

const router = express.Router();

router.get('/', getKids);
router.post('/', createKid);
router.patch('/:id', updateKid);
router.delete('/:id', deleteKid);
router.patch('/vacc/:id',updateVaccin)

export default router;

