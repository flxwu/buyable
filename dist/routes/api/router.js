"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const itemRouter_1 = __importDefault(require("./item/itemRouter"));
const userRouter_1 = __importDefault(require("./user/userRouter"));
const groupRouter_1 = __importDefault(require("./group/groupRouter"));
const timelineRouter_1 = __importDefault(require("./timeline/timelineRouter"));
const authRouter_1 = __importDefault(require("./authRouter"));
const experimentalRouter_1 = __importDefault(require("./experimentalRouter"));
const router = express_1.Router();
router.use('/item', itemRouter_1.default);
router.use('/user', userRouter_1.default);
router.use('/group', groupRouter_1.default);
router.use('/timeline', timelineRouter_1.default);
router.use('/auth', authRouter_1.default);
router.use('/beta', experimentalRouter_1.default);
router.use('/', (req, res) => {
    res.status(400);
    res.send('This api route is not implemented yet.');
});
exports.default = router;
//# sourceMappingURL=router.js.map