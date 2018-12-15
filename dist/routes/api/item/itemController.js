"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Controller {
    constructor(DBItemModel) {
        this.DBItemModel = DBItemModel;
    }
    newPOST(req, res, next) {
    }
    get(req, res, next) {
        res.status(200);
        res.json({ item: 'test' });
    }
}
exports.default = Controller;
//# sourceMappingURL=itemController.js.map