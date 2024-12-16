const request = require("supertest");
const app = require("./app");

let items = require("./fakeDB");

beforeEach(() => {
  items.length = 0;
  items.push({ name: "socks", price: 15 });
});

afterEach(() => {
  items.length = 0;
});

describe("GET /items", () => {
  test("should respond with array of items", async () => {
    // supertest directly wraps the express app and starts it own server internally for testing purpose
    const response = await request(app).get("/items");
    expect(response.status).toBe(200);
    //expect(response.body).toEqual([{ name: "popsicle", price: 1.5 }]);
    //expect(items).toHaveLength(2);
  });
});

describe("POST /items", () => {
  test("should accept JSON data and add it to the shopping list", async () => {
    const newItem = { name: "pants", price: 120 };
    const response = await request(app).post("/items").send(newItem);
    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual({ added: newItem });
    expect(items).toContainEqual(newItem);
  });

  test("should return an error for missing fields", async () => {
    const response = await request(app).post("/items").send({ name: "pants" });
    expect(response.statusCode).toBe(400);
    expect(response.body.error.message).toEqual("Name and price are required");
  });
});

describe("GET /items/:name", () => {
  test("should display single item's name and price ", async () => {
    const response = await request(app).get("/items/socks");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ name: "socks", price: 15 });
  });
  test("should return 404 for non-existent item", async () => {
    const response = await request(app).get("/items/plate");
    expect(response.statusCode).toBe(404);
    expect(response.body.error.message).toEqual("Item not found");
  });
});

describe("PATCH /items/:name", () => {
  it("should modify a single item’s name and/or price", async () => {
    const response = await request(app)
      .patch("/items/socks")
      .send({ price: 20 });
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ updated: { name: "socks", price: 20 } });
  });
  test("should return 400 for bad request of an non-existent item", async () => {
    const response = await request(app)
      .patch("/items/lemon")
      .send({ price: 20 });
    expect(response.statusCode).toBe(404);
    expect(response.body.error.message).toEqual("Item not found");
  });
});

describe("DELETE /items/:name", () => {
  test("should delete a specific item from the array", async () => {
    const response = await request(app).delete("/items/socks");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ message: "Deleted" });
    expect(items.length).toBe(0);
  });
  test("should return 404 for non-existent", async () => {
    const response = await request(app).delete("/items/cake");
    expect(response.statusCode).toBe(404);
    expect(response.body.error.message).toEqual("Item not found");
  });
});
