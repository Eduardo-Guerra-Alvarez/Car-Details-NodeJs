const mongoose = require("mongoose");

//connection to database
mongoose.set('strictQuery', false);
mongoose.connect("mongodb://127.0.0.1:27017/cars");