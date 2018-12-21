"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const item_1 = require("../../../schemas/item");
class Controller {
    newPOST(req, res, next) {
        const { name, description, images, price, groups } = req.body;
        const owner = req.session.profile.;
        const newItem = new item_1.Item({ name, description, price, groups, owner });
        newItem.save(err => err
            ? console.error('Error while saving:', err)
            : console.log('Successfully saved ', newItem.name));
    }
    GET(req, res, next) {
        res.status(200);
        res.json({ item: 'test' });
    }
}
exports.default = Controller;
//# sourceMappingURL=itemController.js.map