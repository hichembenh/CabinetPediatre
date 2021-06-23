import express from 'express';
import mongoose from 'mongoose';

import Kid from '../models/kid.js';
import User from '../models/user.js'
import Rdv from "../models/rdv.js";
import kidVaccin from "../models/kidVaccin.js";
import Vaccin from "../models/vaccin.js";
import moment from "moment";
import NodeMailer from 'nodemailer'

const router = express.Router();
//const nodeMailer = require('nodemailer')

let transporter = NodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL// true for 465, false for other ports
    auth: {
        user: '########' , // generated ethereal user
        pass: '########', // generated ethereal password
    },
});

export const getKids = async (req, res) => {
    try {
        const kid = await Kid.find().populate('rdvs').populate({
            path:"vaccins",
            populate:{
                path:"vaccin"
            }
        }).populate({
            path:"ordonnances",
            populate:{
                path:"traitements"
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
            {vaccin:allVaccin[8],kids:newKid},
            {vaccin:allVaccin[2],kids:newKid},
            {vaccin:allVaccin[3],kids:newKid},
            {vaccin:allVaccin[4],kids:newKid},
            {vaccin:allVaccin[5],kids:newKid},
            {vaccin:allVaccin[6],kids:newKid},
            {vaccin:allVaccin[7],kids:newKid},
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

        let mailOptions = {
            from: '########',
            to: user.email,
            subject: 'Les vaccins de votre nouveau enfant',
            html:`
                    <p>Vous venez d'enregistrer votre enfant dans notre platform </p>
                    <h3>Les details de l'enfant:</h3>
                    <ul>
                        <li>Prenom ${newKid.name}</li>
                        <li>Nom ${newKid.lastName}</li>
                        <li>Age ${new Date(newKid.age).toLocaleString()}</li>
                    </ul>
                    <h3>Les vaccins de votre enfant:</h3> ${newKid.vaccins.map(vaccin => {
                return `<ul> <li>${vaccin.vaccin.title}</li> <li>Date limite: ${moment(newKid.age).add(vaccin.vaccin.ageDedie, 'M').format("Do MMM YYYY")}</li> </ul>`
            })}`
        }

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error + '  mail fail')
            }
            else {
                console.log('mail sent')
                alert("mail sent")
            }        })
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

    try{
        const kid = Kid.findById(id)
        const user = User.findById(kid.parent)
        console.log(kid)
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No kid with id: ${id}`);
        await Rdv.deleteMany({kid:id})
        await User.findOneAndUpdate(
            {'id':kid.parent},
            {'$pull':{'kids': {'ObjectId':id}}}
        )
        await Kid.findByIdAndRemove(id);

        res.json({ message: "Kid deleted successfully." });
    }catch (e){
        console.log(e.message)}

}


export default router;


