const mongoose = require("mongoose");

const carsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    manufacturer: {
        type: String,
        required: true
    }
});

const Cars = mongoose.model("Cars", carsSchema);

module.exports = Cars;