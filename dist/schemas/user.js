"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const database_1 = require("../helpers/database");
const errors_1 = require("../helpers/errors");
exports.UserSchema = new mongoose_1.Schema({
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
    createdAt: String
});
exports.UserSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const isDuplicate = yield database_1.isUserDuplicate([this.username, this.email], ['username', 'email']);
        if (isDuplicate) {
            next(new errors_1.DuplicateError('Username or email already exists'));
        }
        else {
            const now = new Date();
            if (!this.createdAt) {
                this.createdAt = now.getTime();
            }
            next();
        }
    });
});
exports.UserSchema.methods.verifyPassword = function verifyPassword(password) {
    return __awaiter(this, void 0, void 0, function* () {
        const matches = yield bcrypt_1.default.compare(password, this.password);
        if (matches) {
            return true;
        }
        return false;
    });
};
exports.UserModel = mongoose_1.model('User', exports.UserSchema);
//# sourceMappingURL=user.js.map