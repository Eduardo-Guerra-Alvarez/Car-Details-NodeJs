const request = require("supertest");
const app = require("../src/app");
const Cars = require("../src/mongoose/models/cars");
const { cars, setUpDatabase } = require("./utils/testDB");

beforeEach(setUpDatabase);

//adding a new car
test("Adding a new car", async () => {
    const response = await request(app).post("/cars").send({
        name: "car 7",
        price: 10200000,
        capacity: 7,
        type: "XUV",
        manufacturer: "Audi"
    }).expect(201);
    expect(await Cars.find().count()).toBe(7);
    expect(response.body.message).toBe("Added a new car successfully");
});

//viewing all the cars form the database
test("Viewing cars form database", async () => {
    const response = await request(app).get("/cars").expect(200);
    expect(response.body.length).toBe(6);
    for (let i = 0; i < response.body.length; i++)
        expect(response.body[i]).toMatchObject(cars[i]);
});

//viewing cars with serach value
test("Viewing cars with a particular search value in name or manufacturer", async () => {
    const response = await request(app).get("/cars?search=N").expect(200);
    expect(response.body.length).toBe(2);
    expect(response.body[0]).toMatchObject(cars[1]);
    expect(response.body[1]).toMatchObject(cars[2]);
});

//viewing cars with search value
test("Viewing cars with a particular search value in name or manufacturer", async () => {
    const response = await request(app).get("/cars?search=dI").expect(200);
    expect(response.body.length).toBe(2);
    expect(response.body[0]).toMatchObject(cars[0]);
    expect(response.body[1]).toMatchObject(cars[5]);
});

//viewing cars based on the capacity of it
test("Viewing cars based on its capacity", async () => {
    const response = await request(app).get("/cars?capacity=5").expect(200);
    expect(response.body.length).toBe(3);
    expect(response.body[0]).toMatchObject(cars[0]);
    expect(response.body[1]).toMatchObject(cars[1]);
    expect(response.body[2]).toMatchObject(cars[4]);
});

//viewing cars in ascending order of the price
test("Viewing cars in the ascending order of its price", async () => {
    const response = await request(app).get("/cars?price=asc").expect(200);
    expect(response.body.length).toBe(6);
    expect(response.body[0]).toMatchObject(cars[4]);
    expect(response.body[1]).toMatchObject(cars[1]);
    expect(response.body[2]).toMatchObject(cars[0]);
    expect(response.body[3]).toMatchObject(cars[2]);
    expect(response.body[4]).toMatchObject(cars[3]);
    expect(response.body[5]).toMatchObject(cars[5]);
});

//viewing cars in descending order of the price
test("Viewing cars in the descending order of its price", async () => {
    const response = await request(app).get("/cars?price=desc").expect(200);
    expect(response.body.length).toBe(6);
    expect(response.body[5]).toMatchObject(cars[4]);
    expect(response.body[4]).toMatchObject(cars[1]);
    expect(response.body[3]).toMatchObject(cars[0]);
    expect(response.body[2]).toMatchObject(cars[2]);
    expect(response.body[1]).toMatchObject(cars[3]);
    expect(response.body[0]).toMatchObject(cars[5]);
});

//filtering based on its manufacturer
test("Viewing cars based on its manufacturers", async () => {
    const response = await request(app).get("/cars?manufacturer=Suzuki").expect(200);
    expect(response.body.length).toBe(2);
    expect(response.body[0]).toMatchObject(cars[0]);
    expect(response.body[1]).toMatchObject(cars[4]);
});

//filtering cars based on search value and ordering in descending based on its price
test("Viewing cars based on the search value and descending order of its price", async () => {
    const response = await request(app).get("/cars?search=Di&price=desc");
    expect(response.body.length).toBe(2);
    expect(response.body[0]).toMatchObject(cars[5]);
    expect(response.body[1]).toMatchObject(cars[0]);
});

//filtering cars based on capacity and ordering in descending based on its price
test("Viewing cars based on the capacity and descending order of its price", async () => {
    const response = await request(app).get("/cars?capacity=7&price=desc");
    expect(response.body.length).toBe(2);
    expect(response.body[0]).toMatchObject(cars[5]);
    expect(response.body[1]).toMatchObject(cars[2]);
});

//filteirng cars based on search value and its manufacturer
test("Viewing cars based on its manufacturer and search value", async () => {
    const response = await request(app).get("/cars?manufacturer=Audi&search=DI").expect(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0]).toMatchObject(cars[5]);
});

//filtering cars based on capacity, search value and, ordering in ascending based on its price
test("Viewing cars based on the capacity, search value and ascending order of its price", async () => {
    const response = await request(app).get("/cars?capacity=5&price=asc&search=U");
    expect(response.body.length).toBe(3);
    expect(response.body[0]).toMatchObject(cars[4]);
    expect(response.body[1]).toMatchObject(cars[1]);
    expect(response.body[2]).toMatchObject(cars[0]);
});

//updating a car details
test("Updating a car detail", async () => {
    const response = await request(app).patch(`/cars/${cars[3]._id}`).send({
        price: 8000000,
        capacity: 4
    });
    const updated_car = await Cars.findById(cars[3]._id);
    expect(updated_car.price).toBe(8000000);
    expect(updated_car.capacity).toBe(4);
    expect(response.body.message).toBe("Updated successfully");
});

//updating a car details
test("Updating a car detail", async () => {
    const response = await request(app).patch(`/cars/${cars[1]._id}`).send({
        name: "New car",
        price: 9000000,
        capacity: 8,
        type: "MUV",
        manufacturer: "Toyota"
    });
    const updated_car = await Cars.findById(cars[1]._id);
    expect(updated_car.price).toBe(9000000);
    expect(updated_car.capacity).toBe(8);
    expect(updated_car.name).toBe("New car");
    expect(updated_car.type).toBe("MUV");
    expect(updated_car.manufacturer).toBe("Toyota");
    expect(response.body.message).toBe("Updated successfully");
});

//deleting a car from DB
test("Deleting a car from Database", async () => {
    const response = await request(app).delete(`/cars/${cars[0]._id}`).expect(200);
    expect(await Cars.find().count()).toBe(5);
    expect(response.body.message).toBe("Deleted successfully");
});