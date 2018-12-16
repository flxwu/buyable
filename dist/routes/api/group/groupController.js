"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Controller {
    constructor() { }
    newPost(req, res, next) {
    }
    get(req, res, next) {
        res.status(200);
        res.json({ group: 'test' });
    }
}
exports.default = Controller;
//# sourceMappingURL=groupController.js.map