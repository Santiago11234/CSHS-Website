import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import userRouter from './routes/auth.js';
import tutorialRoute from './routes/tutorialRoute.js';
import articleRoute from './routes/articleRoute.js'
import projectRoute from './routes/projectRoute.js'
    
// App config
dotenv.config();
const app = express();
const port = process.env.PORT || 8080;
const connection_url = process.env.ATLAS_URL;


// Middlewares 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
    origin: ['http://localhost:3001', 'http://localhost:3000', 'name of deployed web'],
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    credentials: true
  }));
  

mongoose.connect(connection_url, {

});


app.use('/user', userRouter);

app.use('/tutorials', tutorialRoute);

app.use('/article', articleRoute);

app.use('/project', projectRoute);


app.get('/', (req, res) => res.status(200).send('listening on localhost: '));

app.listen(port, () => console.log(`listening on localhost: ${port}`));
