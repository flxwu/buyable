"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.ItemSchema = new mongoose_1.Schema({
    name: String,
    price: Number,
    imageURL: String
});
exports.ItemSchema.pre('save', function (next) {
    let now = new Date();
    if (!this.createdAt) {
        this.createdAt = now;
    }
    next();
});
exports.User = mongoose_1.model('User', exports.ItemSchema);
//# sourceMappingURL=item.js.map