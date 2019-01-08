"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const itemRouter_1 = __importDefault(require("./item/itemRouter"));
const userRouter_1 = __importDefault(require("./user/userRouter"));
const groupRouter_1 = __importDefault(require("./group/groupRouter"));
const authRouter_1 = __importDefault(require("./authRouter"));
const router = express_1.Router();
router.use('/item', itemRouter_1.default);
router.use('/user', userRouter_1.default);
router.use('/group', groupRouter_1.default);
router.use('/auth', authRouter_1.default);
router.use('/', (req, res) => {
    res.status(400);
    res.send('This api route is not implemented yet.');
});
exports.default = router;
//# sourceMappingURL=router.js.map