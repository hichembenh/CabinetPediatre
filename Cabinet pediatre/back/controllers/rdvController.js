import express from 'express';
import mongoose from 'mongoose';
import moment from "moment";
import Nexmo from 'nexmo'


import Rdv from '../models/rdv.js';
import User from "../models/user.js";
import Kid from "../models/kid.js";

const router = express.Router();
const vonage = new Nexmo({
    apiKey: "0e351a3a",
    apiSecret: "mOk6Jy2twIl3MWoj"
})
export const getRdvs = async (req, res) => {
    try {
        const rdv = await Rdv.find().populate({
            path:'kid',
            populate: {
                path:'parent'
            }
        });
        res.status(200).json(rdv);
    } catch (error) {
        res.status(404).json({ message: error.message });
        console.log('fetching rdv error')
    }
}

export const getMyRdv = async (req,res) =>{
    const userId = req.params.id
    try {
        const user = User.findById(userId)
        console.log(user)
    }catch (error){
        console.log(error.message)
        console.log('fetching my rdv fail')
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
        const user = await User.findById(req.body.userId)
        newRdv.parent = user
        const kid = await Kid.findById(req.body.kidId)
        newRdv.kid = kid
        newRdv.dateDebut.setSeconds(0)
        newRdv.dateFin  = moment(newRdv.dateDebut).add(30, 'm').toDate();
        await newRdv.save();
        user.rdvs.push(newRdv)
        await user.save()
        kid.rdvs.push(newRdv)
        await kid.save()
        res.status(201).json(newRdv);
        console.log('rdv creacted')
        console.log(newRdv.parent.numTel)
        vonage.message.sendSms(
            "21655864652",
            `216${newRdv.parent.numTel}`,
            `Votre rendez-vous avec Dr X le ${newRdv.dateDebut.toDateString()} a ${newRdv.dateDebut.getHours()} est bien enregistrer` ,
            (err, responseData) => {
            if (err) {
                console.log(err);
            } else {
                if(responseData.messages[0]['status'] === "0") {
                    console.log("Message sent successfully.");
                } else {
                    console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
                    console.log("sending message error")
                }
            }
        })

    } catch (error) {
        res.status(409).json({ message: error.message });
        console.log(error.message)
        console.log('creating rdv error')
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
        console.log('error rdv update')
    }
}

export const deleteRdv = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No rdv with id: ${id}`);

    await Rdv.findByIdAndRemove(id);

    res.json({ message: "Rdv deleted successfully." });
}


export default router;