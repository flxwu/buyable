"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
router.get('/check', (req, res) => {
    const user = req.session.user;
    if (user && user._id) {
        res.status(200).json({ loggedIn: true });
    }
    else {
        res.status(200).json({ loggedIn: false });
    }
});
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