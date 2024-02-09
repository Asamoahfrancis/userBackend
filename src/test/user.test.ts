import request from "supertest";
import { userModal } from "../Models/UserModel";
import { app } from "../app";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import path from "path";
const userOneId = new mongoose.Types.ObjectId();
const userOne = {
  _id: userOneId,
  username: "Mike",
  password: "hello",
  tokens: [
    {
      token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET as string),
    },
  ],
};

beforeAll(async () => {
  await userModal.deleteMany();
  await new userModal(userOne).save();
});
test("should signup a new user", async () => {
  const response = await request(app)
    .post("/api/users/signup")
    .send({
      username: "david",
      password: "hello",
    })
    .expect(201);

  //assert that the database was not null
  const user = await userModal.findById(response.body.savedUser._id);
  expect(user).not.toBeNull();

  //assert that the user password is not the same thing
  expect(user?.password).not.toBe("hello");
});

test("should login existing user", async () => {
  const response = await request(app)
    .post("/api/users/signin")
    .send({ username: userOne.username, password: userOne.password })
    .expect(200);

  //assert that the user has the same token
  const user = await userModal.findById(userOneId);
  expect(response.body.token).toBe(user?.tokens[0].token);
});

test("should not loggin a user with invalid credentials", async () => {
  await request(app)
    .post("/api/users/signin")
    .send({
      username: userOne.username,
      password: "wdjjkjksd",
    })
    .expect(400);
});
test("should get the profile a a user", async () => {
  await request(app)
    .get("/api/users/me")
    .set("Authorization", `Bearer${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test("should not get user info if authenticated", async () => {
  await request(app).get("/api/users/me").send().expect(401);
});

test("should delete user data", async () => {
  await request(app)
    .delete("/api/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test("should not delete a user who is not authorized", async () => {
  await request(app).delete("/api/users/me").send().expect(401);
});

test("should delete the account of the user", async () => {
  await request(app)
    .delete("/api/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send();

  const user = await userModal.findById(userOneId);
  expect(user).toBeNull();
});

test("should upload image", async () => {
  try {
    const response = await request(app)
      .post("/upload")
      .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
      .attach("upload", "test/fixtures/leo-tech.jpg");

    // Assertions
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("uploaded", true);
  } catch (error: any) {
    // Handle errors
    console.error("Error in test:", error.message);

    if (error.response && error.response.body) {
      console.error("Error details:", error.response.body);
    }

    throw error;
  }
});
