"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const shortid_1 = __importDefault(require("shortid"));
exports.GroupSchema = new mongoose_1.Schema({
    name: String,
    description: String,
    password: String,
    urlSuffix: String,
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
    if (!this.urlSuffix) {
        this.urlSuffix = shortid_1.default.generate();
    }
    next();
});
exports.GroupModel = mongoose_1.model('Group', exports.GroupSchema);
//# sourceMappingURL=group.js.map