import mongoose from "mongoose";

const vaccinSchema = new mongoose.Schema({
    ref:{
        type:String,
    },
    title:{
        type:String,
    },
    ageDedie:{
        type:Number,
    },
    duree:{
        type:Number,
        required:false
    },
    dosage:{
        type:String,
    },
    description:{
        type:String,
    }
})

const AllVaccin = mongoose.model('allVaccin', vaccinSchema)

export default AllVaccin;