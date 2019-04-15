"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const router = express_1.Router();
router.get('/check', (req, res) => {
    const user = req.user;
    if (user && user._id) {
        res.status(200).json({ loggedIn: true });
    }
    else {
        res.status(200).json({ loggedIn: false });
    }
});
router.post('/login', passport_1.default.authenticate('local'), function (req, res) {
    const filteredUser = JSON.parse(JSON.stringify(req.user));
    delete filteredUser.password;
    res.status(200).json(filteredUser);
});
router.get('/logout', (req, res) => {
    req.logout();
    res.status(200).json({ message: 'LOGGED OUT' });
});
exports.default = router;
//# sourceMappingURL=authRouter.js.map