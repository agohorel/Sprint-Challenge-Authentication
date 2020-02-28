const request = require("supertest");
const server = require("../api/server.js");
const db = require("../database/dbConfig.js");
const bcrypt = require("bcryptjs");

const registerPayload = {
  username: "johndoe",
  password: "1234abcd"
};

const seedpass = "abcd1234";
const seed = {
  username: "janedoe",
  password: bcrypt.hashSync(seedpass, 12)
};

beforeEach(async () => {
  await db("users").truncate();
  await db("users").insert(seed);
});

describe("auth router - POST /register", () => {
  it("should return 201 on /register", async () => {
    const res = await request(server)
      .post("/api/auth/register")
      .send(registerPayload);

    expect(res.status).toBe(201);
  });

  it("should return the newly created user in json format", async () => {
    const res = await request(server)
      .post("/api/auth/register")
      .send(registerPayload);

    expect(res.body).toEqual(
      expect.objectContaining({ username: registerPayload.username })
    );
  });
});

describe("auth router - POST /login", () => {
  it("should return 200 OK on successful login", async () => {
    const res = await request(server)
      .post("/api/auth/login")
      .send({ username: seed.username, password: seedpass });

    expect(res.status).toBe(200);
  });

  it("should return a token", async () => {
    const res = await request(server)
      .post("/api/auth/login")
      .send({ username: seed.username, password: seedpass });

    expect(res.body.token).toBeDefined();
  });
});
