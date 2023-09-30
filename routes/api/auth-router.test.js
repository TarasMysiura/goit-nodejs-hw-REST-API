import mongoose from "mongoose";
import request from "supertest";

import app from "../../app.js";
import User from "../../models/Users.js";
const { DB_HOST_TEST, PORT } = process.env;

describe("Testing user login", () => {
  let server = null;
  beforeAll(async () => {
    await mongoose.connect(DB_HOST_TEST);
    server = app.listen(PORT);
  });

  afterAll(async () => {
    await mongoose.connection.close();
    server.close();
  });

//   afterEach(async () => {
//     await User.deleteMany({});
//   });

  test("test signup with correct data", async () => {
    const registerData = {
      username: "Taras",
      email: "Taras_as1@ukr.net",
      password: "123456",
    };
    const { status, body } = await request(app)
      .post("/register")
      .send(registerData);
    expect(status).toBe(201);
    expect(body.username).toBe(signupData.username);
    expect(body.email).toBe(signupData.email);

    const user = await User.findOne({ email: signupData.email });
    expect(user.username).toBe(signupData.username);
  });

//   test("Login success should return 200 status", async () => {
//     const newUser = { email: "Taras_as1@ukr.net", password: "123456" };
//     const res = await request(app).post("/api/users/login").send(newUser);
//     //   .set("Accept", "application/json");
//     // console.log('res: ', res);
//     expect(res.status).toBe(200);
//     // expect(res.body).toBeDefined();
//     // const { statusCode, body } = await request(app)
//     //   .post("/login")
//     //   .send(loginData)
//     //   .set("Accept", "application/json");
//     // expect(statusCode).toEqual(200);
//     // expect(token).toBeDefined();
//     // expect(email).toBe(loginData.email);
//     // expect(subscription).toBeDefined();

//     // user: { email, subscription: user.subscription },
//   });
});
