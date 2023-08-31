import dotenv from "dotenv"
dotenv.config();
import bodyParser from 'body-parser';
import express from 'express';
import cors from "cors";
import dbConfig from './db/dbConfig.js';
import UserRoute from './routes/user.route.js'

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const port = process.env.PORT

app.use('/',UserRoute);

app.listen(port,()=>{
    console.log(`SERVER START PORT NO. ${port}`);
})
