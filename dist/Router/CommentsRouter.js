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
CommentRouter.get("/comments/:id", authMiddlerware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const commentDocument = yield CommentsModel_1.CommentsModal.findOne({
            _id: id,
            owner: req.getUser._id,
        });
        if (!commentDocument) {
            return res.status(401).send({ Error: "no comment found" });
        }
        res.status(200).send(commentDocument);
    }
    catch (error) {
        res.status(404).send({ Error: error.message });
    }
}));
CommentRouter.get("/comments/id/me", authMiddlerware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const commentDocuments = yield CommentsModel_1.CommentsModal.find({
            owner: req.getUser._id,
        });
        if (!commentDocuments || commentDocuments.length === 0) {
            return res
                .status(404)
                .send({ Error: "No comments found for the user" });
        }
        res.status(200).send({ comments: commentDocuments });
    }
    catch (error) {
        res.status(500).send({ Error: error.message });
    }
}));
CommentRouter.get("/comments", authMiddlerware_1.default, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let matches = {
                completed: false,
            };
            if (req.query.completed) {
                matches.completed = req.query.completed == "true";
            }
            const commentsResults = yield CommentsModel_1.CommentsModal.find(matches, null, {
                limit: 2,
            });
            if (!commentsResults) {
                return res.status(400).send({ Errror: "failed to match" });
            }
            res.status(200).send(commentsResults);
        }
        catch (error) {
            res.status(500).send({ Error: error.message });
        }
    });
});
exports.default = CommentRouter;
//# sourceMappingURL=CommentsRouter.js.map