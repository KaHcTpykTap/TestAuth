require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const router = require("./router/index");
const errorMiddleware = require("./middlewares/error-middleware");

const PORT = process.env.PORT || 5000; //
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);
app.use("/api", router);
app.use(errorMiddleware);

const start = async () => {
  try {
    await mongoose.connect(process.env.REACT_APP_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    /*     const { MongoClient } = require("mongodb");
    const client = new MongoClient(process.env.REACT_APP_DB_URL);

    async function run() {
      try {
        await client.connect();
        const database = client.db("studentdb");
        const ratings = database.collection("users");
        const cursor = ratings.find();
        await cursor.forEach((doc) =>
          doc._id === "admin" ? console.log(doc) : console.log("not value")
        );
      } finally {
        await client.close();
      }
    }
    run().catch(console.dir); */

    app.listen(PORT, () => console.log(`Server started on PORT = ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
