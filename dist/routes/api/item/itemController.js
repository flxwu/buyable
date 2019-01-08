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
    newPOST(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, description, price, amount, images } = req.body;
            const owner = req.user;
            // validate that user is logged in
            if (owner == null || owner._id == null) {
                res.status(401).json({ error: 'Please login to post new items!' });
            }
            // validate post body
            if (typeof name !== 'string' ||
                name.length > 50 ||
                (typeof description !== 'string' || description.length > 500) ||
                typeof price !== 'number' ||
                typeof amount !== 'number') {
                res.status(400).json({ error: 'Item form data invalid' });
            }
            const createItem = () => __awaiter(this, void 0, void 0, function* () {
                // TODO: deal with image blobs => upload to s3 and create array of urls
                const item = new item_1.ItemModel({
                    name,
                    description,
                    price,
                    amount,
                    owner: {
                        referenceId: owner._id
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
    GET(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.query._id;
            console.log(id);
            const item = yield item_1.ItemModel.findById(id);
            if (item) {
                res.status(200).json({ item });
            }
            else {
                res.status(404).json({ errors: ['NOT_FOUND'] });
            }
        });
    }
}
exports.default = Controller;
//# sourceMappingURL=itemController.js.map