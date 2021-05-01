import mongoose from 'mongoose';

const {Schema}=mongoose;
const rdvSchema=new Schema({
    parent:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    kid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Kid'
    },
    createdAt:{
        type:Date,
        default:new Date()
    }
})

const Rdv = mongoose.model('rdv',rdvSchema);

export default  Rdv;
