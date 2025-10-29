const request = require("supertest");
const app = require("../src/app");

describe("API CRUD Endpoints", () => {
  it("GET /items should return array", async () => {
    const res = await request(app).get("/items");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("POST /items should create item", async () => {
    const res = await request(app).post("/items").send({ name: "Test" });
    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe("Test");
  });

  it("PUT /items/:id should update item", async () => {
    await request(app).post("/items").send({ name: "Old" });
    const res = await request(app).put("/items/0").send({ name: "New" });
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("New");
  });

  it("DELETE /items/:id should delete item", async () => {
    await request(app).post("/items").send({ name: "ToDelete" });
    const res = await request(app).delete("/items/0");
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Item deleted");
  });
});
