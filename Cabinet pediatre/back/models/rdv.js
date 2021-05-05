import mongoose from 'mongoose';

const {Schema}=mongoose;
const rdvSchema=new Schema({
    parent:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
    },
    kid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'kids'
    },
    createdAt:{
        type:Date,
        default:new Date()
    },
    dateDebut: Date,
    dateFin: Date,

},{
    timestamps:true
})

const Rdv = mongoose.model('rdv',rdvSchema);

export default  Rdv;
