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
const user_1 = require("../../../schemas/user");
const bcrypt_1 = __importDefault(require("bcrypt"));
const validate_js_1 = __importDefault(require("validate.js"));
class Controller {
    constructor() { }
    newPOST(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, email, forename, surname, password } = req.body;
            const createUser = () => __awaiter(this, void 0, void 0, function* () {
                console.log(yield validate_js_1.default.async(password, {
                    key1: { length: { minimum: 8 } },
                    key2: { length: { maximum: 72 } }
                }));
                // TODO: deal with image blob => upload to s3 and create array of urls
                const hashedPassword = yield bcrypt_1.default.hash(password, 10);
                const user = new user_1.UserModel({
                    username,
                    email,
                    forename,
                    surname,
                    password: hashedPassword
                });
                return yield user.save();
            });
            try {
                const createdUser = yield createUser();
                req.session.user = createdUser;
                res.status(200).json({ user: createdUser });
            }
            catch (err) {
                res.status(500).json({ error: err.message });
            }
        });
    }
    GET(req, res, next) {
        res.status(200);
        res.json({ user: 'test' });
    }
}
exports.default = Controller;
//# sourceMappingURL=userController.js.map