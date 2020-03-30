const request = require("supertest");
const server = require("../api/server.js");
const db = require("../database/dbConfig.js");
const users = require("../auth/auth-model.js");
const bcrypt = require("bcryptjs");
const generateToken = require("../auth/generateToken.js");

let token;
const seedpass = "abcd1234";
const seed = {
  username: "homersimpson",
  password: bcrypt.hashSync(seedpass, 12)
};

beforeEach(async () => {
  await db("users").truncate();
  await db("users").insert(seed);
  const user = await users.findBy({ username: "homersimpson" });
  token = generateToken(user);
});

describe("jokes router - GET", () => {
  it("should block non authenticated users", async () => {
    const res = await request(server).get("/api/jokes");
    expect(res.status).toBe(400 || 401);
  });

  it("should return 200 OK and a list of jokes for authenticated users", async () => {
    const res = await request(server)
      .get("/api/jokes")
      .set("Authorization", token);

    expect(res.status).toBe(200);
    expect(res.body).toEqual(
      expect.arrayContaining([expect.objectContaining({ id: "0189hNRf2g" })])
    );
  });
});
