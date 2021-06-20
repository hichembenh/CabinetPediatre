import mongoose from "mongoose";

const {Schema} = mongoose
const OrdonnanceSchema = new Schema({
    id:{
        type:String
    },
    kid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'kids'
    },
    traitements:[{
        type:Schema.Types.ObjectId,
        ref:'traitement'
    }]
},{
    timestamps:true
})

const Ordonnance = mongoose.model('ordonnance',OrdonnanceSchema)
export default Ordonnance