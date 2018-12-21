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
const item_1 = require("../../../schemas/item");
class Controller {
    GET(req, res, next) {
        res.status(200);
        res.json({ item: 'test' });
    }
    newPOST(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, description, price, amount, images } = req.body;
            const owner = req.session.user;
            if (owner == null || owner._id == null) {
                res.status(401).json({ error: 'Please login to post new items!' });
            }
            const createItem = () => __awaiter(this, void 0, void 0, function* () {
                // TODO: deal with image blobs => upload to s3 and create array of urls
                const item = new item_1.ItemModel({
                    name: name,
                    description: description,
                    price: price,
                    amount: amount,
                    owner: {
                        user: owner._id
                    }
                });
                let result;
                try {
                    result = yield item.save();
                }
                catch (err) {
                    throw err;
                }
                return result;
            });
            try {
                const result = yield createItem();
                res.status(200).json({ item: result });
            }
            catch (error) {
                res.status(500).json({ error });
            }
        });
    }
    get(req, res, next) {
        item_1.ItemModel.findOne().then((r) => {
            res.status(200).json(r);
        });
    }
}
exports.default = Controller;
//# sourceMappingURL=itemController.js.map