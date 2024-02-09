"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const UserModel_1 = require("../Models/UserModel");
const app_1 = require("../app");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mongoose_1 = __importDefault(require("mongoose"));
const userOneId = new mongoose_1.default.Types.ObjectId();
const userOne = {
    _id: userOneId,
    username: "Mike",
    password: "hello",
    tokens: [
        {
            token: jsonwebtoken_1.default.sign({ _id: userOneId }, process.env.JWT_SECRET),
        },
    ],
};
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield UserModel_1.userModal.deleteMany();
    yield new UserModel_1.userModal(userOne).save();
}));
test("should signup a new user", () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, supertest_1.default)(app_1.app)
        .post("/api/users/signup")
        .send({
        username: "david",
        password: "hello",
    })
        .expect(201);
    //assert that the database was not null
    const user = yield UserModel_1.userModal.findById(response.body.savedUser._id);
    expect(user).not.toBeNull();
    //assert that the user password is not the same thing
    expect(user === null || user === void 0 ? void 0 : user.password).not.toBe("hello");
}));
test("should login existing user", () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, supertest_1.default)(app_1.app)
        .post("/api/users/signin")
        .send({ username: userOne.username, password: userOne.password })
        .expect(200);
    //assert that the user has the same token
    const user = yield UserModel_1.userModal.findById(userOneId);
    expect(response.body.token).toBe(user === null || user === void 0 ? void 0 : user.tokens[0].token);
}));
test("should not loggin a user with invalid credentials", () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, supertest_1.default)(app_1.app)
        .post("/api/users/signin")
        .send({
        username: userOne.username,
        password: "wdjjkjksd",
    })
        .expect(400);
}));
test("should get the profile a a user", () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, supertest_1.default)(app_1.app)
        .get("/api/users/me")
        .set("Authorization", `Bearer${userOne.tokens[0].token}`)
        .send()
        .expect(200);
}));
test("should not get user info if authenticated", () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, supertest_1.default)(app_1.app).get("/api/users/me").send().expect(401);
}));
test("should delete user data", () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, supertest_1.default)(app_1.app)
        .delete("/api/users/me")
        .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200);
}));
test("should not delete a user who is not authorized", () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, supertest_1.default)(app_1.app).delete("/api/users/me").send().expect(401);
}));
test("should delete the account of the user", () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, supertest_1.default)(app_1.app)
        .delete("/api/users/me")
        .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
        .send();
    const user = yield UserModel_1.userModal.findById(userOneId);
    expect(user).toBeNull();
}));
test("should upload image", () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, supertest_1.default)(app_1.app)
            .post("/upload")
            .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
            .attach("upload", "test/fixtures/leo-tech.jpg");
        // Assertions
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("uploaded", true);
    }
    catch (error) {
        // Handle errors
        console.error("Error in test:", error.message);
        if (error.response && error.response.body) {
            console.error("Error details:", error.response.body);
        }
        throw error;
    }
}));
//# sourceMappingURL=user.test.js.map