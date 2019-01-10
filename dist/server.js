"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const https_1 = __importDefault(require("https"));
const fs_1 = __importDefault(require("fs"));
const privateKey = fs_1.default.readFileSync('localhost-certificate-key.pem');
const certificate = fs_1.default.readFileSync('localhost-certificate.pem');
const app_1 = __importDefault(require("./app"));
const port = process.env.PORT || 5000;
const server = https_1.default
    .createServer({
    key: privateKey,
    cert: certificate
}, app_1.default)
    .listen(port, () => console.log('Server running at port %d | MODE: %s', port, app_1.default.get('env')));
exports.default = server;
//# sourceMappingURL=server.js.map