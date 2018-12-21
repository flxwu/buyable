"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
router.use('/login', (req, res) => {
    //TODO: store profile into session
});
router.use('/logout', (req, res) => {
    req.session.profile = {};
    res.status(200);
    res.send('Successfully logged out');
});
exports.default = router;
//# sourceMappingURL=authRouter.js.map