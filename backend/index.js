require('dotenv').config()
//it should be on top of the file and remember to run npm i dotenv
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const { userRouter } = require("./routes/user");
app.use("/api/v1", mainRouter);

app.use(express.json()); //we added this line to parse the request body as json

async function main() {
  await mongoose.connect(process.env.MONGO_DB_URL);
  app.listen(process.env.PORT, () => {
    console.log("app is running");
  }); 
}

main();