import mongoose from 'mongoose';
import user from "./user.js";

const kidSchema=new mongoose.Schema({
    name:String,
    lastName: String,
    age: Date,
    photo: String,
    gender:String,
    poid:{
        type:"Number",
        required:false,
        default:0
    },
    taille:{
        type:"Number",
        required:false,
        default:0
    },
    parent:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    rdvs:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'rdv',
        required:false
    }],
    vaccins:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'kidVaccin',
        required:false
    }]
},{
    timestamps:true
})

const Kid = mongoose.model('kids', kidSchema);

export default  Kid;

