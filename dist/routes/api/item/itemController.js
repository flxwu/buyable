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
            const { name, description, price, amount, owner, images } = req.body;
            const createItem = () => __awaiter(this, void 0, void 0, function* () {
                // TODO: deal with image blobs => upload to s3 and create array of urls
                // TODO: add user to item from session
                const item = new item_1.ItemModel({
                    name: req.body.name,
                    description: req.body.description,
                    price: req.body.price,
                    amount: req.body.amount,
                    owner: {
                        user: req.body.user,
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