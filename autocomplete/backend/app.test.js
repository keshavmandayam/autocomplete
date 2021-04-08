const request = require("supertest");
const app = require("./app");
const { populateTrie } = require('../backend/db/db');

describe("Test the root path", () => {
  test("It should respond to the POST method", async () => {
    populateTrie()
    const response = await request(app).post("/movies").send({text: "the"});
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([
        { title: 'The Shawshank Redemption' },
        { title: 'The Shining' },
        { title: 'The Silence of the Lambs' },
        { title: 'The Sting' },
        { title: 'The Godfather' }
      ]);
  });
});