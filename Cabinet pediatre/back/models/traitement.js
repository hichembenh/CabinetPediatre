import mongoose from "mongoose";

const {Schema} = mongoose
const TraitementSchema = new Schema({
    id:{
        type:String
    },
    med:{
        type:String
    },
    dosage:{
        type:String
    }

},{
    timestamps:true
})

const Traitement = mongoose.model('traitement',TraitementSchema)
export default Traitement