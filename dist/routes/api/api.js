"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
router.use('/', (req, res) => {
    res.status(200);
    res.json('This is the api');
});
exports.default = router;
//# sourceMappingURL=api.js.map