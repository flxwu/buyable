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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const validator_1 = __importDefault(require("validator"));
const yup = __importStar(require("yup"));
const user_1 = require("../../../schemas/user");
const group_1 = require("../../../schemas/group");
const database_1 = require("../../../helpers/database");
const yupSchemas_1 = require("../../../helpers/yupSchemas");
class Controller {
    newPOST(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, email, forename, surname, password } = req.body;
            const createUser = () => __awaiter(this, void 0, void 0, function* () {
                // Validation
                if (!validator_1.default.isLength(username, { min: 3 }))
                    throw new Error('uts');
                if (!validator_1.default.isLength(username, { max: 50 }))
                    throw new Error('utl');
                if (!validator_1.default.isEmail(email))
                    throw new Error('ie');
                if (!validator_1.default.isLength(password, { min: 3 }))
                    throw new Error('pts');
                if (!validator_1.default.isLength(password, { max: 50 }))
                    throw new Error('ptl');
                // TODO: deal with image blob => upload to s3 and create array of urls
                const hashedPassword = yield bcrypt_1.default.hash(password, 10);
                try {
                    const user = new user_1.UserModel({
                        username,
                        email,
                        forename,
                        surname,
                        password: hashedPassword
                    });
                    return yield user.save();
                }
                catch (err) {
                    throw new Error('ise');
                }
            });
            try {
                const createdUser = yield createUser();
                res.status(200).json({ user: createdUser });
            }
            catch (err) {
                let status, message;
                switch (err.message) {
                    case 'ie':
                        status = 400;
                        message = 'Invalid Email address';
                        break;
                    case 'uts':
                        status = 400;
                        message = 'Username too short';
                        break;
                    case 'utl':
                        status = 400;
                        message = 'Username too long';
                        break;
                    case 'pts':
                        status = 400;
                        message = 'Password too short';
                        break;
                    case 'ptl':
                        status = 400;
                        message = 'Password too long';
                        break;
                    default:
                        status = 500;
                        message = 'Internal server error';
                }
                res.status(status).json({ error: message });
            }
        });
    }
    GET(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.query._id;
            user_1.UserModel.findById(userId, (err, doc) => {
                if (err) {
                    res.status(500).send(err);
                }
                else {
                    const userGroups = doc.groups;
                    const ownedGroups = doc.ownedGroups;
                    const publicUserGroups = [];
                    const publicOwnedUserGroups = [];
                    for (const group of userGroups) {
                        const groupReferenceId = group.referenceId;
                        group_1.GroupModel.findById(groupReferenceId, (err, doc) => {
                            if (err) {
                                throw new Error('Error while finding group');
                            }
                            else {
                                const isPublic = doc.settings.public;
                                // add to "groups", if it's an ownedGroup also add it to "ownedGroups"
                                if (isPublic) {
                                    publicUserGroups.push({ referenceId: groupReferenceId });
                                    if (ownedGroups.find(g => g.referenceId === groupReferenceId))
                                        publicOwnedUserGroups.push({ referenceId: groupReferenceId });
                                }
                            }
                        });
                    }
                    const filteredDoc = doc;
                    filteredDoc.groups = publicUserGroups;
                    filteredDoc.ownedGroups = publicOwnedUserGroups;
                    res.status(200).json(filteredDoc);
                }
            });
        });
    }
    PATCH(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const sessionUser = req.user;
            const reqUser = req.body;
            if (String(sessionUser._id) !== reqUser._id)
                return res.status(401).json({ errors: ['NOT_AUTHORIZED'] });
            try {
                yupSchemas_1.User.validateSync(reqUser);
            }
            catch (err) {
                if (err instanceof yup.ValidationError)
                    return res.status(400).json({ errors: ['Invalid Inputs'] });
            }
            if (sessionUser.username !== reqUser.username) {
                const userAlreadyRegistered = yield database_1.isUserDuplicate(reqUser.username, 'username');
                if (userAlreadyRegistered)
                    return res
                        .status(400)
                        .json({ errors: ['Username already registered'] });
            }
            if (sessionUser.email !== reqUser.email) {
                const userAlreadyRegistered = yield database_1.isUserDuplicate(reqUser.email, 'email');
                if (userAlreadyRegistered)
                    return res.status(400).json({ errors: ['Email already registered'] });
            }
            /* Delete immutable attributes */
            delete reqUser._id;
            delete reqUser.createdAt;
            /* Check for password update */
            const isMatch = yield bcrypt_1.default.compare(sessionUser.password, reqUser.password);
            if (!isMatch)
                reqUser.password = yield bcrypt_1.default.hash(reqUser.password, 10);
            /* Update Document */
            const updatedDoc = yield user_1.UserModel.findByIdAndUpdate(sessionUser._id, reqUser);
            res.json(updatedDoc);
        });
    }
}
exports.default = Controller;
//# sourceMappingURL=userController.js.map