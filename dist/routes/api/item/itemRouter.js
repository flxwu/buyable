"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
const itemController_1 = __importDefault(require("./itemController"));
/**
 * POST New Product
 */
const itemController = new itemController_1.default();
router.post('/new', itemController.newPOST);
router.get('/', itemController.GET);
exports.default = router;
//# sourceMappingURL=itemRouter.js.map