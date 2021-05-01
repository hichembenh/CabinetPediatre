import express from 'express';
import mongoose from 'mongoose';

import Kid from '../models/kid.js';

const router = express.Router();

export const getKids = async (req, res) => {
    try {
        const kid = await Kid.find();
        res.status(200).json(kid);
    } catch (error) {
        res.status(404).json({ message: error.message });
        console.log('fetching error')
    }
}

export const getKid = async (req, res) => {
    const { id } = req.params;

    try {
        const kid = await Kid.findById(id);

        res.status(200).json(kid);
    } catch (error) {
        res.status(404).json({ message: error.message });

    }
}

export const createKid = async (req, res) => {
    const { name, lastName, photo, age } = req.body;

    const newKid = new Kid({ name, lastName, photo, age })

    try {
        await newKid.save();
        //console.log('creacted')
        res.status(201).json(newKid);
    } catch (error) {
        res.status(409).json({ message: error.message });
        console.log('creating error')
    }
}

export const updateKid = async (req, res) => {
    const { id } = req.params;
    const { name, lastName, photo, age } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No kid with id: ${id}`);

    const updatedKid = {name, lastName, photo, age, _id: id };

    await Kid.findByIdAndUpdate(id, updatedKid, { new: true });

    res.json(updatedKid);
}

export const deleteKid = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No kid with id: ${id}`);

    await Kid.findByIdAndRemove(id);

    res.json({ message: "Kid deleted successfully." });
}


export default router;