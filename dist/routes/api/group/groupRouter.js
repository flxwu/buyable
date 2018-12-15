"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
const groupController_1 = __importDefault(require("./groupController"));
/**
 * POST New Product
 */
const groupController = new groupController_1.default();
router.post('/new', groupController.newPOST);
router.get('/', groupController.get);
exports.default = router;
//# sourceMappingURL=groupRouter.js.map