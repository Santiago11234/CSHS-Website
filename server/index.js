import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import userRouter from './routes/auth.js';
import tutorialRoute from './routes/tutorialRoute.js';
// import fetch from 'node-fetch';
// import cheerio from 'cheerio';

// const sheetId = "14JrjV7iRYoiyXalYuQfkNcwGpIO5VsNBgU7AxU9o6gk"
// const base = `https://docs.google.com/spreadsheets/d/14JrjV7iRYoiyXalYuQfkNcwGpIO5VsNBgU7AxU9o6gk/gviz/tq?`
// let qu = 'SELECT *'
// const query = encodeURIComponent(qu)
// const url = `${base}&sheet=Form%20Responses%201&tq=${query}`
// fetch(url).then(res => res.text())
//     .then(rep => {
//         const jsData = JSON.parse(rep.substring(47).slice(0, -2))
//         console.log(jsData)
//     })
    

// App config
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
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



app.get('/', (req, res) => res.status(200).send('listening on localhost: '));

app.listen(port, () => console.log(`listening on localhost: ${port}`));
