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
Object.defineProperty(exports, "__esModule", { value: true });
const dbConnect_1 = require("./database/dbConnect");
const dbConnect_2 = require("./database/dbConnect");
const app_1 = require("./app");
(0, dbConnect_1.dbConnection)();
const port = process.env.PORT || 5000;
app_1.app.listen(port, () => {
    console.log("listening on port ", port);
});
process.on("SIGINT", () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, dbConnect_2.closeDatabaseConnection)();
    process.exit(0);
}));
//# sourceMappingURL=index.js.map