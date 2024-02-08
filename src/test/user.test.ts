import request from "supertest";
import { userModal } from "../Models/UserModel";
import { app } from "../app";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

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
  await request(app)
    .post("/api/users/signup")
    .send({
      username: "david",
      password: "hello",
    })
    .expect(201);
});

test("should login existing user", async () => {
  await request(app)
    .post("/api/users/signin")
    .send({ username: userOne.username, password: userOne.password })
    .expect(200);
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
console.log(userOne);
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
