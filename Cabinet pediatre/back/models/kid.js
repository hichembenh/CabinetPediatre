import mongoose from 'mongoose';
import user from "./user.js";

const kidSchema=new mongoose.Schema({
    name:String,
    lastName: String,
    age: Date,
    photo: String,
    gender:String,
    parent:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }
})

const Kid = mongoose.model('kids', kidSchema);

export default  Kid;

