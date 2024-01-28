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
const CommentsModel_1 = require("../Models/CommentsModel");
const authMiddlerware_1 = __importDefault(require("../middleware/authMiddlerware"));
const CommentRouter = express_1.default.Router();
CommentRouter.use((0, express_1.default)());
CommentRouter.use((0, cors_1.default)());
CommentRouter.post("/comments", authMiddlerware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newComment = new CommentsModel_1.CommentsModal(Object.assign(Object.assign({}, req.body), { owner: req.getUser._id }));
        const results = yield newComment.save();
        res.status(201).send(results);
    }
    catch (error) {
        console.log({ Error: error.message });
    }
}));
exports.default = CommentRouter;
//# sourceMappingURL=CommentsRouter.js.map