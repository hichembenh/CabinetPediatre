import mongoose from "mongoose";

const {Schema} = mongoose;
const userSchema = new Schema({
    id: { type: String},
    firstName: {type:String, required:  true},
    lastName: {type:String, required:   true},
    numTel: {type:Number, required: true},
    email: {type:String, required:  true},
    password: {type:String, required:   true},
    createdAt:{
        type:Date,
        default:new Date()
    },
    kids:[{
        type:Schema.Types.ObjectId,
        ref:'kids',
        required:false
    }]
})

export default mongoose.model("user", userSchema);