import express from 'express';
import mongoose from 'mongoose';

import Rdv from '../models/rdv.js';

const router = express.Router();

export const getRdvs = async (req, res) => {
    try {
        const rdv = await Rdv.find();
        res.status(200).json(rdv);
    } catch (error) {
        res.status(404).json({ message: error.message });
        console.log('fetching error')
    }
}

export const getRdv = async (req, res) => {
    const { id } = req.params;

    try {
        const rdv = await Rdv.findById(id);

        res.status(200).json(rdv);
    } catch (error) {
        res.status(404).json({ message: error.message });

    }
}

export const createRdv = async (req, res) => {
    const newRdv = new Rdv(req.body)

    try {
        console.log(req.body)
        await newRdv.save();
        console.log('creacted')
        console.log(newRdv)
        res.status(201).json(newRdv);
    } catch (error) {
        res.status(409).json({ message: error.message });
        console.log('creating error')
    }
}

export const updateRdv = async (req, res) => {
    const { id } = req.params;
    const { startDate,endDate } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No rdv with id: ${id}`);

    const updatedRdv = {startDate,endDate, _id: id };

    try {
        await Rdv.findByIdAndUpdate(id, updatedRdv, { new: true });

        res.json(updatedRdv);
    }catch (e){
        console.log(e.message)
        console.log('error')
    }
}

export const deleteRdv = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No rdv with id: ${id}`);

    await Rdv.findByIdAndRemove(id);

    res.json({ message: "Rdv deleted successfully." });
}


export default router;