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
const UserRouter_1 = __importDefault(require("./Router/UserRouter/UserRouter"));
const CommentsRouter_1 = __importDefault(require("./Router/CommentsRouter/CommentsRouter"));
const dbConnect_1 = require("./database/dbConnect");
const dbConnect_2 = require("./database/dbConnect");
(0, dbConnect_1.dbConnection)();
const port = process.env.PORT || 5000;
const app = (0, express_1.default)();
app.use(UserRouter_1.default);
app.use(CommentsRouter_1.default);
app.listen(port, () => {
    console.log("listening on port ", port);
});
process.on("SIGINT", () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, dbConnect_2.closeDatabaseConnection)();
    process.exit(0);
}));
//# sourceMappingURL=index.js.map