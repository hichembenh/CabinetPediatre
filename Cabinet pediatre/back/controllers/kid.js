import express from 'express';
import mongoose from 'mongoose';

import Kid from '../models/kid.js';
import User from '../models/user.js'

const router = express.Router();

export const getKids = async (req, res) => {
    try {
        const kid = await Kid.find();
        console.log('hey')
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
    const newKid = new Kid(req.body)
    const userId= req.params.id
    console.log(req.params.id)
    try {
        const user = await User.findById('6091f6cd7c84df232c3d42c2')
        newKid.parent = user
        console.log(user)
        await newKid.save();

        user.kids.push(newKid);
        await user.save()
        console.log('creacted')
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

    try {
        await Kid.findByIdAndUpdate(id, updatedKid, { new: true });

        res.json(updatedKid);
    }catch (e){
        console.log(e.message)
        console.log('error')
    }
}


export const deleteKid = async (req, res) => {
    const { id } = req.params;
    console.log(id)

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No kid with id: ${id}`);

    await Kid.findByIdAndRemove(id);

    res.json({ message: "Kid deleted successfully." });
}


export default router;


