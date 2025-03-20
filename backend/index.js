require('dotenv').config()
//it should be on top of the file and remember to run npm i dotenv
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const { mainRouter } = require("./routes/index");

//middlewares should be above router as order does matter here
app.use(cors());
app.use(express.json()); //we added this line to parse the request body as json

//main router
app.use("/api/v1", mainRouter);


async function main() {
  await mongoose.connect(process.env.MONGO_DB_URL);




  app.listen(process.env.PORT, () => {
    console.log("app is running");
  }); 
}

main();