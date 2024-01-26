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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const UserModel_1 = require("../../Models/UserModel");
const UserRouter = express_1.default.Router();
UserRouter.use(express_1.default.json());
UserRouter.use((0, cors_1.default)());
UserRouter.post("/users/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = new UserModel_1.userModal(req.body);
        const savedUser = yield newUser.save();
        yield newUser.generateToken();
        res.status(201).send(savedUser);
    }
    catch (error) {
        res.status(500).send({ Error: error.message });
    }
}));
UserRouter.post("/users/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getUser = yield UserModel_1.userModal.getUsercredentials(req.body.username, req.body.password);
        if (!getUser)
            return res.status(404).send({ Error: "error fetching user" });
        yield getUser.generateToken();
        res.status(200).send({ getUser });
    }
    catch (error) {
        res.status(500).send({ Error: error.message });
    }
}));
exports.default = UserRouter;
//# sourceMappingURL=UserRouter.js.map