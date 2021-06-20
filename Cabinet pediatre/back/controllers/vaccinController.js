import express from "express";
import mongoose from "mongoose";
import KidVaccin from "../models/kidVaccin.js";

const router = express.Router();

export const updateVaccin = async (req, res) => {
    const {id} = req.params;
    const {vaccin, kid, affected} = req.body
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No kidVaccin with id: ${id}`);
    const updatedVacc = {vaccin, kid, affected, _id: id}

    try {
        await KidVaccin.findOneAndUpdate(id,updatedVacc,{new:true})
        res.json(updatedVacc)
    } catch (e) {
        console.log(e.message)
        console.log('updating vaccin failed')
    }
}