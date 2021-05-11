import mongoose from 'mongoose';

mongoose.set('useCreateIndex', true);
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
    dateDebut: {
        type:Date,
        unique:true,

    },
    dateFin: Date,
    urgent: {
        type: Boolean,
        default:false
    },
    vaccin:{
        type:Boolean,
        default:false
    }

},{
    timestamps:true
})

const Rdv = mongoose.model('rdv',rdvSchema);

export default  Rdv;
