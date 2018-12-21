"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.GroupSchema = new mongoose_1.Schema({
    password: String,
    description: String,
    owner: Object,
    permissions: Object,
    settings: Object,
    pictureURL: String,
    items: Array,
    users: Array,
});
exports.GroupSchema.pre('save', function (next) {
    const now = new Date();
    if (!this.createdAt) {
        this.createdAt = now;
    }
    next();
});
exports.GroupModel = mongoose_1.model('Group', exports.GroupSchema);
//# sourceMappingURL=group.js.map