import dotenv from "dotenv"
dotenv.config();
import mongoose from "mongoose";
const database = process.env.DATABASE_URL;

mongoose.connect(database)
  .then((result) => {
    console.log("database connected....");
  })
  .catch((err) => {
    console.log(err);
  });

export default mongoose.connection;  