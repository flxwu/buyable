"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.UserSchema = new mongoose_1.Schema({
    _id: String,
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    forename: String,
    surname: String,
    items: Array,
    groups: Array,
    ownedGroups: Array,
});
exports.UserSchema.pre('save', function (next) {
    const now = new Date();
    if (!this.createdAt) {
        this.createdAt = now;
    }
    next();
});
exports.User = mongoose_1.model('User', exports.UserSchema);
//# sourceMappingURL=user.js.map