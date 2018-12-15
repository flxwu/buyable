"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Controller {
    constructor() { }
    newPOST(req, res, next) {
    }
    GET(req, res, next) {
        res.status(200);
        res.json({ user: 'test' });
    }
}
exports.default = Controller;
//# sourceMappingURL=userController.js.map