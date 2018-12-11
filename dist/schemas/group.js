"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.GroupSchema = new mongoose_1.Schema({
    name: String,
    items: Array,
    users: Array,
    admin: Object,
    settings: Object
});
exports.GroupSchema.pre('save', function (next) {
    let now = new Date();
    if (!this.createdAt) {
        this.createdAt = now;
    }
    next();
});
exports.User = mongoose_1.model('User', exports.GroupSchema);
//# sourceMappingURL=group.js.map