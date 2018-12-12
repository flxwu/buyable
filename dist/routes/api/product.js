"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
/**
 * POST New Product
 */
router.post('/new', (req, res, next) => {
    const { user, product } = req.body;
    //TODO: Post to DB
});
exports.default = router;
//# sourceMappingURL=product.js.map