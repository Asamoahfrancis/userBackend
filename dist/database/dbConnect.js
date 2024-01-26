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
exports.closeDatabaseConnection = exports.dbConnection = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const zod_1 = require("zod");
require("dotenv").config();
const envVariables = zod_1.z.object({
    MONGODB_URI: zod_1.z.string(),
});
envVariables.parse(process.env);
const dbConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        mongoose_1.default.connection.on("connected", () => console.log("connected"));
        mongoose_1.default.connection.on("open", () => console.log("open"));
        mongoose_1.default.connect(process.env.MONGODB_URI);
    }
    catch (error) {
        console.error(error.message);
    }
});
exports.dbConnection = dbConnection;
const closeDatabaseConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connection.close();
    console.log("MongoDB connection closed");
});
exports.closeDatabaseConnection = closeDatabaseConnection;
// mongoose.connection.on("disconnected", () => console.log("disconnected"));
// mongoose.connection.on("reconnected", () => console.log("reconnected"));
// mongoose.connection.on("disconnecting", () => console.log("disconnecting"));
// mongoose.connection.on("close", () => console.log("close"));
// await mongoose.connect("mongodb://127.0.0.1:27017/UserPost");
// await mongoose.connect(
//   "mongodb+srv://francis:MLotjg2aacfctXNU@cluster0.zwetr17.mongodb.net/usersTable?retryWrites=true&w=majority"
// );
//# sourceMappingURL=dbConnect.js.map