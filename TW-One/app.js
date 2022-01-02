const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
const axios = require("axios");

dotenv.config();

const app = express();

app.use(express.json());
app.use(morgan("dev"));

// user routes
const userRoute = require("./route/user.route");

const { PORT, MONGO_URI } = process.env;

// mongoose.connect(MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})

app.get("/", (req, res) => {
  res.send("The main entry application");
});

app.use("/api/v1", userRoute);

app.listen(PORT, async (req, res) => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database is connected");
  } catch (error) {
    console.log(`Database Not Connected`);
  }
  console.log(`The app is running on PORT ${PORT}`);
});

module.exports = app;
