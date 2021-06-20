import express from "express";
import {createOrdonnance, deleteOrd, getOrd} from "../controllers/ordonnanceController.js";

const router = express.Router()

router.get('/',getOrd)
router.post('/',createOrdonnance)
router.delete('/:id',deleteOrd)

export default router
