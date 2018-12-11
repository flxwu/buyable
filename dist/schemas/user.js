"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.UserSchema = new mongoose_1.Schema({
    name: String,
    items: Array
});
exports.User = mongoose_1.model('User', exports.UserSchema);
//# sourceMappingURL=user.js.map