import express from "express";
import Ordonnance from "../models/ordonnance.js";
import Kid from "../models/kid.js";
import Traitement from "../models/traitement.js";
import mongoose from "mongoose";

const router = express.Router();
export const getOrd = async (req, res) => {
    try {
        const ords = Ordonnance.find().populate('ordonnance')
        res.status(200).json(ords);

    } catch (e) {
        res.status(404).json({message: e.message});
        console.log('fetching ordonnance failed')
    }
}

export const createOrdonnance = async (req, res) => {
    console.log(req.body)
    const kid = await Kid.findById(req.body.kid._id)
    try {
        if (kid) {
            const createdTraitements = []
            for (let e = 0; e<req.body.traitements.length;e++) {
                const newTreat = {
                    med:req.body.traitements[e].med,
                    dosage:req.body.traitements[e].dosage,
                }
                const traitement = await Traitement.create(newTreat)
                createdTraitements.push(traitement)
            }
            console.log(createdTraitements)
           const newOrd =  await Ordonnance.create({
                kid:kid._id,
                traitements:createdTraitements.map(t=>t._id)
            })
            kid.ordonnances.push(newOrd)
            await kid.save()
            res.status(201).json(newOrd)
        } else console.log("kid dont exist")
    } catch (e) {
        console.log(e.message)
        console.log("creating ordonnance failed")
    }
}

export const deleteOrd= async (req,res)=>{
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No kid with id: ${id}`);
    try{
        await Ordonnance.findByIdAndRemove(id)
        res.json({ message: "Ordonnance deleted successfully." });
    }catch (e){
        console.log(e.message)
        console.log('deleting ordonnance failed')
    }
}

export default router