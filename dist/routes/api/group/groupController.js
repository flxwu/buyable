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
const group_1 = require("../../../schemas/group");
const item_1 = require("../../../schemas/item");
const constants_1 = __importDefault(require("../../../helpers/constants"));
const ROLES = constants_1.default.ROLES;
const bcrypt_1 = __importDefault(require("bcrypt"));
const groupUpdate_1 = __importDefault(require("../../../custom_validators/groupUpdate"));
const groupUpdateHandler_1 = __importDefault(require("../../../action_handlers/groupUpdateHandler"));
class GroupController {
    newPOST(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = [];
            const { name, pictureURL, description, permissions, settings } = req.body;
            let { password, urlSuffix } = req.body;
            urlSuffix = String(urlSuffix).replace(/[^a-z0-9]/gi, '');
            const owner = { referenceId: req.user._id };
            const ownerUser = {
                referenceId: req.user._id,
                role: constants_1.default.ROLES.OWNER
            };
            const users = [ownerUser];
            const items = [];
            // validate name
            if (name) {
                if (name.length < 3)
                    errors.push(constants_1.default.ERRORS.GROUP_ADD.NAME_TOO_SHORT);
                if (name.length > 100)
                    errors.push(constants_1.default.ERRORS.GROUP_ADD.NAME_TOO_LONG);
            }
            else {
                errors.push(constants_1.default.ERRORS.GROUP_ADD.NAME_MISSING);
            }
            // validate description
            if (description && description.length > 500)
                errors.push(constants_1.default.ERRORS.GROUP_ADD.DESCRIPTION_TOO_LONG);
            // validate password
            if (password) {
                if (password.length > 72) {
                    errors.push(constants_1.default.ERRORS.GROUP_ADD.PASSWORD_TOO_LONG);
                }
                else if (password.length < 8) {
                    errors.push(constants_1.default.ERRORS.GROUP_ADD.PASSWORD_TOO_SHORT);
                }
                else {
                    password = yield bcrypt_1.default.hash(password, 10);
                }
            }
            // validate urlsuffix
            if (urlSuffix) {
                if (urlSuffix.length < 3)
                    errors.push(constants_1.default.ERRORS.GROUP_ADD.URLSUFFIX_TOO_SHORT);
                if (urlSuffix.length > 50)
                    errors.push(constants_1.default.ERRORS.GROUP_ADD.URLSUFFIX_TOO_LONG);
            }
            else {
                errors.push(constants_1.default.ERRORS.GROUP_ADD.URLSUFFIX_MISSING);
            }
            const adminPermissions = [], sellerPermissions = [], buyerPermissions = [];
            // validate permissions
            // TODO: deeper validation -> right now user can add any permissions to any role!
            console.log(permissions);
            if (permissions) {
                if (permissions.admin) {
                    for (const permission in permissions.admin) {
                        if (constants_1.default.PERMISSIONS.GROUP.hasOwnProperty(permission)) {
                            if (permissions.admin[permission])
                                adminPermissions.push(permission);
                        }
                        else {
                            console.log(permission);
                            errors.push({
                                [constants_1.default.ERRORS.GROUP_ADD.PERMISSIONS_INVALID]: constants_1.default.ROLES.ADMIN
                            });
                            break;
                        }
                    }
                }
                else {
                    errors.push({
                        [constants_1.default.ERRORS.GROUP_ADD.PERMISSIONS_INVALID]: constants_1.default.ROLES.ADMIN
                    });
                }
                if (permissions.seller) {
                    for (const permission in permissions.seller) {
                        if (constants_1.default.PERMISSIONS.GROUP.hasOwnProperty(permission)) {
                            if (permissions.seller[permission])
                                sellerPermissions.push(permission);
                        }
                        else {
                            errors.push({
                                [constants_1.default.ERRORS.GROUP_ADD.PERMISSIONS_INVALID]: constants_1.default.ROLES.SELLER
                            });
                            break;
                        }
                    }
                }
                else {
                    errors.push({
                        [constants_1.default.ERRORS.GROUP_ADD.PERMISSIONS_INVALID]: constants_1.default.ROLES.SELLER
                    });
                }
                if (permissions.buyer) {
                    for (const permission in permissions.buyer) {
                        if (constants_1.default.PERMISSIONS.GROUP.hasOwnProperty(permission)) {
                            if (permissions.buyer[permission])
                                buyerPermissions.push(permission);
                        }
                        else {
                            errors.push({
                                [constants_1.default.ERRORS.GROUP_ADD.PERMISSIONS_INVALID]: constants_1.default.ROLES.BUYER
                            });
                            break;
                        }
                    }
                }
                else {
                    errors.push({
                        [constants_1.default.ERRORS.GROUP_ADD.PERMISSIONS_INVALID]: constants_1.default.ROLES.BUYER
                    });
                }
            }
            // validate settings
            try {
                // validate price limit
                if (settings.priceLimit != null) {
                    if (settings.priceLimit < 0)
                        errors.push(constants_1.default.ERRORS.GROUP_ADD.SETTINGS_MIN_PRICE_TOO_LOW);
                    if (settings.priceLimit > Number.MAX_SAFE_INTEGER)
                        errors.push(constants_1.default.ERRORS.GROUP_ADD.SETTINGS_MIN_PRICE_TOO_HIGH);
                    if (settings.priceLimit === 0)
                        settings.priceLimit = Number.MAX_SAFE_INTEGER;
                }
                else {
                    errors.push(constants_1.default.ERRORS.GROUP_ADD.SETTINGS_MIN_PRICE_INVALID);
                }
                // validate default role
                console.log(req.body);
                if (settings.defaultRole) {
                    if (!constants_1.default.ROLES.hasOwnProperty(settings.defaultRole) ||
                        settings.defaultRole === constants_1.default.ROLES.OWNER) {
                        errors.push(constants_1.default.ERRORS.GROUP_ADD.SETTINGS_DEFAULTROLE_INVALID);
                    }
                }
                else {
                    errors.push(constants_1.default.ERRORS.GROUP_ADD.SETTINGS_DEFAULTROLE_MISSING);
                }
            }
            catch (err) {
                errors.push(constants_1.default.ERRORS.GROUP_ADD.SETTINGS_INVALID);
            }
            // TODO: Validation
            // TODO: Upload image to s3 and create url
            const duplicate = yield group_1.GroupModel.findOne({ urlSuffix }).exec();
            console.log('Duplicate Group: ', duplicate);
            if (!duplicate && errors.length == 0) {
                try {
                    // TODO: write function that appends all permission dependencies to permission arrays and outsource
                    const defaultAdminPermissions = [constants_1.default.PERMISSIONS.GROUP.ADD_ITEM];
                    const defaultSellerPermissions = [];
                    const defaultBuyerPermissions = [];
                    // create permissions array
                    adminPermissions.push(...defaultAdminPermissions);
                    const newGroup = new group_1.GroupModel({
                        name,
                        description,
                        urlSuffix,
                        permissions: {
                            admin: adminPermissions,
                            seller: sellerPermissions,
                            buyer: buyerPermissions
                        },
                        settings: {
                            priceLimit: settings.priceLimit,
                            defaultRole: settings.defaultRole
                        },
                        pictureURL,
                        owner,
                        users,
                        items
                    });
                    yield newGroup.save();
                    res.status(201).json(newGroup);
                }
                catch (err) {
                    res.status(500).json({ error: err.message });
                }
            }
            else {
                if (duplicate)
                    errors.push(constants_1.default.ERRORS.GROUP_ADD.GROUP_EXISTS);
                res.status(500).json({ errors });
            }
        });
    }
    get(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            res.status(200);
            const { _id } = req.query;
            try {
                const group = yield group_1.GroupModel.findById(_id).exec();
                res.send(group);
            }
            catch (err) {
                res.status(404).json({ error: err.message });
            }
        });
    }
    update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // accepts only content-type: application/json!!!1
            // idea: deep object differences check-> create actions array (which only contains allowed actions)
            // and error array
            // if actions array.length > 0 and error.length === 0 perform the actions, then save object.
            // otherwise, send error array or do nothing
            const content_type = req.headers['content-type'];
            if (content_type && content_type.indexOf('application/json') === 0) {
                const group = req.body;
                const oldGroup = JSON.parse(JSON.stringify(yield group_1.GroupModel.findById(group._id)
                    .lean()
                    .exec()));
                let isMember = false, groupUser;
                const reqUserId = String(req.user._id);
                for (const user of oldGroup.users) {
                    if (user.referenceId === reqUserId)
                        isMember = true;
                    groupUser = user;
                }
                if (isMember) {
                    if (oldGroup && group) {
                        const { errors, actions } = yield groupUpdate_1.default(oldGroup, group);
                        if (errors.length === 0) {
                            if (actions.length > 0) {
                                // perform actions
                                const { errors, newGroup } = yield groupUpdateHandler_1.default(req.user, groupUser, oldGroup, actions);
                                if (!errors) {
                                    // success
                                    res.status(200).json({ group: newGroup });
                                }
                                else {
                                    // performing actions on object returned errors
                                    res.status(400).json({ errors });
                                }
                            }
                            else {
                                // objects submitted are equal
                                res.status(304).send('NOT MODIFIED');
                            }
                        }
                        else {
                            // group validation returned errors
                            res.status(500).json({ errors });
                        }
                    }
                    else {
                        // group (specified in req.body.urlSuffix or _id) doesn't exist
                        res.status(400).json({
                            errors: [constants_1.default.ERRORS.GROUP_UPDATE.GROUP_NOT_FOUND]
                        });
                    }
                }
                else {
                    // user is not in the group he's editing
                    res.status(401).json({ errors: ['NOT MEMBER OF GROUP'] });
                }
            }
            else {
                // content-type is not application json
                res.status(400).json({
                    errors: ['CONTENT-TYPE NOT APPLICATION/JSON']
                });
            }
        });
    }
    // try joining group
    joinPOST(req, res) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
}
exports.GroupController = GroupController;
class GroupItemsController {
    GET(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const SORT_BY = {
                NEWEST: 'new',
                OLDEST: 'old'
            };
            const groupId = req.query._id;
            const user = req.user;
            if (groupId == null)
                return res.status(400).json({ errors: ['NO GROUP SPECIFIED'] });
            if (user == null ||
                !user.groups.some(g => String(g.referenceId) === groupId))
                return res.status(401).json({ errors: ['UNAUTHORIZED'] });
            const start = Number(req.query.start) || 0;
            const end = Number(req.query.end) || 5;
            const sortBy = req.query.sort || SORT_BY.NEWEST;
            const group = yield group_1.GroupModel.findById(groupId);
            // Sort group items by sort criteria
            group.items = group.items.sort((i1, i2) => {
                switch (sortBy) {
                    case SORT_BY.NEWEST:
                        return Number(i2.addedAt) - Number(i1.addedAt);
                        break;
                    case SORT_BY.OLDEST:
                        return Number(i1.addedAt) - Number(i2.addedAt);
                        break;
                    default:
                        return Number(i2.addedAt) - Number(i1.addedAt);
                        break;
                }
            });
            const returnItemsReferenceIds = end === -1 || start === -1
                ? group.items.map(ref => ref.referenceId)
                : group.items.slice(start, end).map(ref => ref.referenceId);
            // from the item ids, get the item objects
            const groupItems = yield item_1.ItemModel.find({
                _id: {
                    $in: returnItemsReferenceIds
                }
            });
            res.status(200).json(groupItems);
        });
    }
    addPOST(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = req.user;
            const groupIds = req.body.groups.map(id => String(id));
            const itemIds = req.body.items.map(id => String(id));
            // TODO: validate IDs
            const groups = yield group_1.GroupModel.find({ _id: { $in: groupIds } });
            console.log(groupIds, groups);
            if (groupIds.every(id => groups.some(group => group._id == id &&
                group.users.some(user => {
                    return (String(user.referenceId) == req.user._id &&
                        [ROLES.OWNER, ROLES.ADMIN, ROLES.SELLER].some(role => role == user.role));
                }))) &&
                itemIds.every(item => req.user.items.some(userItem => userItem.referenceId == item))) {
                // update groups: add all items to groups
                groups.forEach(group => itemIds.forEach(id => {
                    if (!group.items.some(item => String(item.referenceId) == id)) {
                        group.items.push({
                            referenceId: String(id),
                            addedAt: Date.now(),
                            ownerRole: group.users.find(user => String(user.referenceId) == req.user._id).role
                        });
                    }
                }));
                for (const group of groups) {
                    yield group.save();
                }
                res.status(200).json({ groups: groups });
            }
            else {
                res.json({ errors: ['IDS_INVALID'] });
            }
        });
    }
}
exports.GroupItemsController = GroupItemsController;
//# sourceMappingURL=groupController.js.map