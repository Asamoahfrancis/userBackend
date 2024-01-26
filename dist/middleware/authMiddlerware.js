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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserModel_1 = require("../Models/UserModel");
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.header("Authorization").replace("Bearer", " ");
        const decoded = jsonwebtoken_1.default.verify(token, "thisismySecrete");
        const getUser = UserModel_1.userModal.findOne({ _id: decoded._id, token });
        if (!getUser)
            return new Error("could not find any user");
        req.getUser = getUser;
        next();
    }
    catch (error) {
        res.status(401).send({ Error: error.message });
    }
});
exports.default = authMiddleware;
//# sourceMappingURL=authMiddlerware.js.map