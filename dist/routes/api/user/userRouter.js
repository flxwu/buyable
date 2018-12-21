"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
const userController_1 = __importDefault(require("./userController"));
/**
 * POST New Product
 */
const userController = new userController_1.default();
router.post('/new', userController.newPOST);
router.get('/', userController.GET);
exports.default = router;
//# sourceMappingURL=userRouter.js.map