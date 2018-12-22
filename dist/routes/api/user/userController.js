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
const bcrypt_1 = __importDefault(require("bcrypt"));
const validate_js_1 = __importDefault(require("validate.js"));
const user_1 = require("../../../schemas/user");
const group_1 = require("../../../schemas/group");
class Controller {
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
                res.status(200).json({ user: createdUser });
            }
            catch (err) {
                res.status(500).json({ error: err.message });
            }
        });
    }
    GET(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.query.userId;
            user_1.UserModel.findById(userId, (err, doc) => {
                if (err) {
                    res.status(500).send(err);
                }
                else {
                    const userGroups = doc.groups;
                    const publicUserGroups = [];
                    for (const group of userGroups) {
                        const groupReferenceId = group.referenceId;
                        group_1.GroupModel.findById(groupReferenceId, (err, doc) => {
                            if (err) {
                                throw new Error('Error while finding group');
                            }
                            else {
                                const isPublic = doc.settings.public;
                                if (isPublic)
                                    publicUserGroups.push({ referenceId: groupReferenceId });
                            }
                        });
                    }
                    let filteredDoc = doc;
                    filteredDoc.groups = publicUserGroups;
                    res.status(200).json(filteredDoc);
                }
            });
        });
    }
}
exports.default = Controller;
//# sourceMappingURL=userController.js.map