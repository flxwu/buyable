"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const app_1 = __importDefault(require("./app"));
const port = process.env.PORT || 5000;
const server = app_1.default.listen(port, () => console.log('Server running at port %d | MODE: %s', port, app_1.default.get('env')));
exports.default = server;
//# sourceMappingURL=server.js.map