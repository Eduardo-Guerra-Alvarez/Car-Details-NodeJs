const express = require("express");
const carsRouter = require("./routers/cars");
require("./mongoose/db/mongoose");

//setting up the server
const app = express();

//setting up the app middlewares
app.use(express.json());
app.use(carsRouter);

module.exports = app;