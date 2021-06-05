import express from 'express';
import mongoose from 'mongoose';

import Kid from '../models/kid.js';
import User from '../models/user.js'
import Rdv from "../models/rdv.js";
import kidVaccin from "../models/kidVaccin.js";
import Vaccin from "../models/vaccin.js";

const router = express.Router();

export const getKids = async (req, res) => {
    try {
        const kid = await Kid.find().populate('rdvs').populate({
            path:"vaccins",
            populate:{
                path:"vaccin"
            }
        });
        res.status(200).json(kid);
    } catch (error) {
        res.status(404).json({ message: error.message });
        console.log('fetching kids error')
        console.log(error.message)
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
    const userId= req.body.userId
    console.log(req.body)
    try {
        const user = await User.findById(userId)
        const allVaccin = await Vaccin.find()
        const kidsVacc = await kidVaccin.insertMany([
            {vaccin:allVaccin[0],kids:newKid},
            {vaccin:allVaccin[1],kids:newKid},
            {vaccin:allVaccin[2],kids:newKid},
            {vaccin:allVaccin[3],kids:newKid},
            {vaccin:allVaccin[4],kids:newKid},
            {vaccin:allVaccin[5],kids:newKid},
            {vaccin:allVaccin[6],kids:newKid},
            {vaccin:allVaccin[7],kids:newKid},
            {vaccin:allVaccin[8],kids:newKid},
            {vaccin:allVaccin[9],kids:newKid},
            {vaccin:allVaccin[10],kids:newKid},
            {vaccin:allVaccin[11],kids:newKid},
            {vaccin:allVaccin[12],kids:newKid},
            {vaccin:allVaccin[13],kids:newKid},
            {vaccin:allVaccin[14],kids:newKid},
            {vaccin:allVaccin[15],kids:newKid},
            {vaccin:allVaccin[16],kids:newKid},
            {vaccin:allVaccin[17],kids:newKid},
            {vaccin:allVaccin[18],kids:newKid}
        ])

        console.log(allVaccin)
        newKid.parent = user
        newKid.vaccins = kidsVacc
        await newKid.save();

        user.kids.push(newKid);
        await user.save()

        console.log('creacted')

        res.status(201).json(newKid);
    } catch (error) {
        res.status(409).json({ message: error.message });
        console.log(error.message)
        console.log('creating error')
    }
}

export const updateKid = async (req, res) => {
    const { id } = req.params;
    const { name, lastName, photo, age,poid,taille } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No kid with id: ${id}`);

    const updatedKid = {name, lastName, photo, age, poid, taille, _id: id };

    try {
        await Kid.findByIdAndUpdate(id, updatedKid, { new: true });

        res.json(updatedKid);
    }catch (e){
        console.log(e.message)
        console.log('updating error')
    }
}


export const deleteKid = async (req, res) => {
    const { id } = req.params;
    console.log(id)

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No kid with id: ${id}`);
    await Rdv.deleteMany({kid:id})
    await Kid.findByIdAndRemove(id);

    res.json({ message: "Kid deleted successfully." });
}


export default router;


