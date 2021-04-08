const request = require("supertest");
const app = require("./app");
const { populateTrie } = require('../backend/db/db');

describe("Test the root path", () => {
  test("It should respond to the POST method", async () => {
    const response = await request(app).post("/movies").send({text: "the"});
    expect(response.statusCode).toBe(200);
  });
  test("It's response should start with the prefix'", async () => {
    populateTrie()
    const response = await request(app).post("/movies").send({text: "the"});
    expect(response.length > 0 ? response.body[0].title.startsWith("the"): true).toBeTruthy()
  });
});