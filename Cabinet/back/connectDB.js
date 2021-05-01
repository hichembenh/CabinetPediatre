import mongoose from "mongoose";

const connectDB = async ()=>{
    try {
        const conn = await mongoose.connect('mongodb+srv://root:hey@cluster0.xvced.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
    ,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex:true
        })
        console.log(`Mongo connected: ${conn.connection.host}`)
    }catch (e){
        console.error(`Error ${e.message}`)
    }
}

export default connectDB