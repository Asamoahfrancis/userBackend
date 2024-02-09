"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const UserRouter_1 = __importDefault(require("./Router/UserRouter"));
const CommentsRouter_1 = __importDefault(require("./Router/CommentsRouter"));
const dbConnect_1 = require("./database/dbConnect");
(0, dbConnect_1.dbConnection)();
exports.app = (0, express_1.default)();
exports.app.use(UserRouter_1.default);
exports.app.use(CommentsRouter_1.default);
//# sourceMappingURL=app.js.map