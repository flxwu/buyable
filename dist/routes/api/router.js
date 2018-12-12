"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_1 = __importDefault(require("./product"));
const router = express_1.Router();
router.use('/', (req, res) => {
    res.status(200);
    res.json('This is the api');
});
router.use('/product', product_1.default);
exports.default = router;
//# sourceMappingURL=router.js.map