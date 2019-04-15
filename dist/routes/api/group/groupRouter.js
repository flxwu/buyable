"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
const groupController_1 = require("./groupController");
const groupController = new groupController_1.GroupController();
const groupItemsController = new groupController_1.GroupItemsController();
router.post('/new', groupController.newPOST);
router.get('/', groupController.get);
router.patch('/', groupController.update);
router.get('/items', groupItemsController.GET);
router.post('/items/add', groupItemsController.addPOST);
exports.default = router;
//# sourceMappingURL=groupRouter.js.map