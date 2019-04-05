"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const https_1 = __importDefault(require("https"));
const http_1 = __importDefault(require("http"));
const fs_1 = __importDefault(require("fs"));
const privateKey = fs_1.default.readFileSync('localhost-certificate-key.pem');
const certificate = fs_1.default.readFileSync('localhost-certificate.pem');
const useHttps = Number(process.env.HTTPS) ? true : false;
const app_1 = __importDefault(require("./app"));
let server;
const port = process.env.PORT || 5000;
const startServer = () => __awaiter(this, void 0, void 0, function* () {
    const app = yield app_1.default();
    server = useHttps
        ? https_1.default
            .createServer({
            key: privateKey,
            cert: certificate
        }, app)
            .listen(port, () => console.log('\x1b[36m%s\x1b[0m', `Server running at port ${port} | MODE: ${app.get('env')} |`))
        : http_1.default
            .createServer(app)
            .listen(port, () => console.log('\x1b[36m%s\x1b[0m', `Server running at port ${port} | MODE: ${app.get('env')} |`, '\x1b[31mWARNING: HTTPS DISABLED\x1b[0m'));
});
startServer();
exports.default = server;
//# sourceMappingURL=server.js.map