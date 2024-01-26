"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const authMiddlerware_1 = __importDefault(require("../../middleware/authMiddlerware"));
const SingleUser = express_1.default.Router();
SingleUser.use(express_1.default.json());
SingleUser.use((0, cors_1.default)());
SingleUser.get("/users/:id", authMiddlerware_1.default, (req, res) => {
    res.status(200).send("This route is to get single user");
    try {
    }
    catch (error) {
        res.status(500).send({ Error: error.message });
    }
});
//# sourceMappingURL=SingleUserRouter.js.map