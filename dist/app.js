"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const express_session_1 = __importDefault(require("express-session"));
const mongoose_1 = __importDefault(require("mongoose"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const app = express_1.default();
const MongoStore = connect_mongo_1.default(express_session_1.default);
// Session Handling
const mongoURL = `mongodb://flxwu:${process.env.MLAB_PASSWORD}@ds016108.mlab.com:16108/buyable-dev`;
app.use(express_session_1.default({
    secret: 'foo',
    store: new MongoStore({
        url: mongoURL
    }),
    resave: true,
    saveUninitialized: true
}));
// MongoDB
mongoose_1.default.connect(mongoURL);
const db = mongoose_1.default.connection;
db.on('error', () => console.error('Error connecting to MLab MongoDB'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(morgan_1.default('dev'));
app.use(express_1.default.static(__dirname + '/../client/build/'));
exports.default = app;
//# sourceMappingURL=app.js.map