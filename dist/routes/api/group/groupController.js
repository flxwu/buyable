"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const group_1 = require("../../../schemas/group");
class Controller {
    newPOST(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, description, urlSuffix, permissions, settings, pictureURL, items } = req.body;
            const owner = { referenceId: req.user._id };
            const users = [owner];
            // TODO: Validation
            // TODO: Upload image to s3 and create url
            const duplicate = yield group_1.GroupModel.findOne({ urlSuffix }).exec();
            if (!duplicate) {
                try {
                    const newGroup = new group_1.GroupModel({
                        name,
                        description,
                        urlSuffix,
                        permissions,
                        settings,
                        pictureURL,
                        owner,
                        users,
                        items
                    });
                    yield newGroup.save();
                    res.status(201).json({
                        group: {
                            name,
                            description,
                            urlSuffix,
                            permissions,
                            settings,
                            pictureURL,
                            owner,
                            users,
                            items
                        }
                    });
                }
                catch (err) {
                    res.status(500).json({ error: err.message });
                }
            }
            else {
                res.status(500).json({ error: 'Group already exists' });
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
}
exports.default = Controller;
//# sourceMappingURL=groupController.js.map