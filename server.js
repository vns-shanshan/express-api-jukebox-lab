const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const methodOverride = require("method-override");

const tracksCtrl = require("./controllers/tracks");

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(express.json());
app.use(cors());
app.use(methodOverride("_method"));

app.use("/tracks", tracksCtrl);

app.listen(3000, () => {
    console.log("The express app is ready!");
});