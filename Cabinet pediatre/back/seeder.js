import dotenv from 'dotenv'
import connectDB from "./connectDB.js";

import users from './data/users.js'
import kids from './data/kids.js'
import rdvs from './data/rdv.js'
import Kid from "./models/kid.js";
import User from "./models/user.js";
import Rdv from "./models/rdv.js";

dotenv.config()
connectDB()

const importData= async ()=>{
    try {
        await User.deleteMany()
        await Kid.deleteMany()
        await Rdv.deleteMany()

        const allUsers = await User.insertMany(users)
        const adminUser = allUsers[0]._id
        const visitorUser = allUsers[1]._id
        const secUser = allUsers[2]._id

        const allKids = kids.map(kid=>{
            return {...kid, parent: visitorUser}
        })
        const firstKid = allKids[0]._id


        await Kid.insertMany(allKids)
        const RDV = rdvs.map(rdv=>{
            const rdvparent = {...rdv, parent:visitorUser}
            return {...rdvparent, kid:firstKid}
        })
        await Rdv.insertMany(RDV)

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