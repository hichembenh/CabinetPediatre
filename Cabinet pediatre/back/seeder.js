import dotenv from 'dotenv'
import connectDB from "./connectDB.js";

import users from './data/users.js'
import kids from './data/kids.js'
import vaccin from "./data/vaccin.js";
import Kid from "./models/kid.js";
import User from "./models/user.js";
import Rdv from "./models/rdv.js";
import Vaccin from "./models/vaccin.js";
import kidVaccin from "./models/kidVaccin.js";

dotenv.config()
connectDB()

const importData= async ()=>{
    try {
        await User.deleteMany()
        await Kid.deleteMany()
        await Rdv.deleteMany()
        await Vaccin.deleteMany()
        await kidVaccin.deleteMany()

        const allUsers = await User.insertMany(users)
        const adminUser = allUsers[0]._id
        const visitorUser = allUsers[1]._id
        const secUser = allUsers[2]._id

        const allVaccin = await Vaccin.insertMany(vaccin)
        const kidsVacc = await kidVaccin.insertMany([
            {vaccin:allVaccin[0]},
            {vaccin:allVaccin[1]},
            {vaccin:allVaccin[2]},
            {vaccin:allVaccin[3]},
            {vaccin:allVaccin[4]},
            {vaccin:allVaccin[5]},
            {vaccin:allVaccin[6]},
            {vaccin:allVaccin[7]},
            {vaccin:allVaccin[8]},
            {vaccin:allVaccin[9]},
            {vaccin:allVaccin[10]},
            {vaccin:allVaccin[11]},
            {vaccin:allVaccin[12]},
            {vaccin:allVaccin[13]},
            {vaccin:allVaccin[14]},
            {vaccin:allVaccin[15]},
            {vaccin:allVaccin[16]},
            {vaccin:allVaccin[17]},
            {vaccin:allVaccin[18]}
        ])

        const allKids = kids.map(kid=>{
            return {...kid, vaccins: kidsVacc}
        })

        const firstKid = allKids[0]._id

        await Kid.insertMany(allKids)
        /*const RDV = rdvs.map(rdv=>{
            const rdvparent = {...rdv, parent:visitorUser}
            return {...rdvparent, kid:firstKid}
        })
        await Rdv.insertMany(RDV)*/


        console.log('Data imported!')
        process.exit()
    }catch (e){
        console.error(`${e.message}`)
    }
}

const destroyData= async ()=>{
    try {
        await Kid.deleteMany()
        await User.deleteMany()
        await Rdv.deleteMany()

        console.log('Data deleted!')
        process.exit()
    }catch (e){
        console.error(`${e.message}`)
    }
}

if(process.argv[2] === '-d'){
    destroyData()
}else {
    importData()
}