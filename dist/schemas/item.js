"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.ItemSchema = new mongoose_1.Schema({
    _id: String,
    name: {
        type: String,
        required: true
    },
    description: String,
    price: {
        type: Number,
        required: true,
    },
    imageURLs: Array,
    amount: {
        type: Number,
        required: true
    },
    groups: Array,
    owner: {
        type: Object,
        required: true
    }
});
exports.ItemSchema.pre('save', function (next) {
    const now = new Date();
    if (!this.createdAt) {
        this.createdAt = now;
    }
    next();
});
exports.Item = mongoose_1.model('User', exports.ItemSchema);
//# sourceMappingURL=item.js.map