
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import postRoutes from './routes/posts.js';
import userRoutes from './routes/user.js';
import kidRoutes from './routes/kid.js';

import KidModel from './models/kid.js'
const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

app.use('/posts', postRoutes);
app.use('/user', userRoutes);
app.use('/kids', kidRoutes);

/*app.get('/', async (req,res) => {
    const kid = new KidModel({name:'mayara', firstName: 'youssef'})

    try{
        await kid.save();
    }catch (e){
        console.log(e.message)
    }
})*/
const CONNECTION_URL = 'mongodb+srv://root:hey@cluster0.xvced.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const PORT = process.env.PORT|| 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false);