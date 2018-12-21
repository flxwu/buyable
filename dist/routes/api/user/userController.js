"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Controller {
    constructor() { }
<<<<<<< HEAD
    newPost(req, res, next) {
    }
    get(req, res, next) {
=======
    newPOST(req, res, next) {
    }
    GET(req, res, next) {
>>>>>>> c81dfa463e65cc75201dfc80ed255cd8a3f4e45d
        res.status(200);
        res.json({ user: 'test' });
    }
}
exports.default = Controller;
//# sourceMappingURL=userController.js.map