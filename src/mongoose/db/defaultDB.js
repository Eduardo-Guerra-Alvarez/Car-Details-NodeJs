const mongoose = require("mongoose");
const Cars = require("../models/cars");
require("./mongoose");

const cars = [
    {
        _id: new mongoose.Types.ObjectId(),
        name: "car 1",
        price: 1240000,
        capacity: 5,
        type: "Sedan",
        manufacturer: "Suzuki"
    },
    {
        _id: new mongoose.Types.ObjectId(),
        name: "car 2",
        price: 900000,
        capacity: 5,
        type: "Sedan",
        manufacturer: "Hundai"
    },
    {
        _id: new mongoose.Types.ObjectId(),
        name: "car 3",
        price: 2700000,
        capacity: 7,
        type: "XUV",
        manufacturer: "Mahindra"
    },
    {
        _id: new mongoose.Types.ObjectId(),
        name: "car 4",
        price: 8300000,
        capacity: 2,
        type: "Coupe",
        manufacturer: "Jaguar"
    },
    {
        _id: new mongoose.Types.ObjectId(),
        name: "car 5",
        price: 600000,
        capacity: 5,
        type: "Sedan",
        manufacturer: "Suzuki"
    },
    {
        _id: new mongoose.Types.ObjectId(),
        name: "car 6",
        price: 10200000,
        capacity: 7,
        type: "XUV",
        manufacturer: "Audi"
    }
]

const setUpDatabase = async () => {
    await Cars.deleteMany();
    for (let i = 0; i < cars.length; i++)
        await new Cars(cars[i]).save();
}

setUpDatabase();