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
const UserModel_1 = require("../Models/UserModel");
const authMiddlerware_1 = __importDefault(require("../middleware/authMiddlerware"));
const multer_1 = __importDefault(require("multer"));
const UserRouter = express_1.default.Router();
UserRouter.use(express_1.default.json());
UserRouter.use((0, cors_1.default)());
const upload = (0, multer_1.default)({
    // dest: "images",
    // limits: {
    //   fileSize: 1000000,
    // },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(.png|jpg|jpeg)$/)) {
            return cb(new Error("upload a pdff file"));
        }
        cb(null, true);
    },
});
UserRouter.post("/api/users/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = new UserModel_1.userModal(req.body);
        const savedUser = yield newUser.save();
        const token = yield newUser.generateToken();
        res.status(201).send({ savedUser, token });
    }
    catch (error) {
        res.status(500).send({ Error: error.message });
    }
}));
UserRouter.post("/api/users/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getUser = yield UserModel_1.userModal.getUsercredentials(req.body.username, req.body.password);
        if (!getUser) {
            return res.status(404).send({ Error: "error fetching user" });
        }
        const token = yield getUser.generateToken();
        res.status(200).send({ getUser, token });
    }
    catch (error) {
        res.status(400).send({ Error: error.message });
    }
}));
UserRouter.get("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allusers = yield UserModel_1.userModal.find({});
        if (!allusers) {
            return res.status(404).send("no users found");
        }
        res.status(200).send(allusers);
    }
    catch (error) {
        res.status(404).send({ Error: error.message });
    }
}));
UserRouter.get("/api/users/me", authMiddlerware_1.default, (req, res) => {
    res.status(200).send(req.getUser);
});
UserRouter.get("/api/users/:id", authMiddlerware_1.default, (req, res) => {
    res.status(200).send("This route is to get single user");
    try {
    }
    catch (error) {
        res.status(500).send({ Error: error.message });
    }
});
UserRouter.post("/api/users/logout", authMiddlerware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        req.getUser.tokens = req.getUser.tokens.filter((token) => token.token !== req.token);
        yield req.getUser.save();
        res.status(200).send("logged out successfully");
    }
    catch (error) {
        res.status(500).send({ Error: error.message });
    }
}));
UserRouter.post("/api/users/logoutAll", authMiddlerware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        req.getUser.tokens = [];
        yield req.getUser.save();
        res.status(200).send("Logged out from all the devices");
    }
    catch (error) {
        res.status(500).send({ Error: error.message });
    }
}));
UserRouter.delete("/api/users/me", authMiddlerware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.getUser instanceof UserModel_1.userModal) {
            const user = yield req.getUser.deleteOne();
            res.status(200).send({ message: "User successfully deleted", user });
        }
        else {
            res.status(401).send({ error: "Failed to delete user" });
        }
    }
    catch (error) {
        res.status(500).send({ error: error.message });
    }
}));
UserRouter.post("/upload", authMiddlerware_1.default, upload.single("upload"), function (req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        req.getUser.avatar = (_a = req.file) === null || _a === void 0 ? void 0 : _a.buffer;
        const savedUser = yield req.getUser.save();
        res.status(200).send({ Messagae: savedUser });
    });
}, (error, req, res, next) => {
    res.status(400).send({ Error: error.message });
});
UserRouter.get("/users/:id/avatar", authMiddlerware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield UserModel_1.userModal.findOne({ _id: req.params.id });
        console.log(user);
        if (!user || !user.avatar) {
            throw new Error("no image found");
        }
        res.set("Content-Type", "image/jpg");
        res.send(user.avatar);
    }
    catch (error) {
        res.status(404).send({ Error: error.message });
    }
}));
exports.default = UserRouter;
//# sourceMappingURL=UserRouter.js.map