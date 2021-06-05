import mongoose from 'mongoose';
import AllVaccin from "./vaccin.js";

mongoose.set('useCreateIndex', true);
const {Schema}=mongoose;
const kidVaccinSchema = new Schema({
    vaccin:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'allVaccin'
    },
    kid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'kids'
    },
    affected:{
        type:Boolean,
        default:false
    }
})

const KidVaccin = mongoose.model('kidVaccin', kidVaccinSchema)
export default KidVaccin