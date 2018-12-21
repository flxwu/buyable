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
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const express_session_1 = __importDefault(require("express-session"));
const mongoose_1 = __importDefault(require("mongoose"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = __importDefault(require("passport-local"));
const user_1 = require("./schemas/user");
const router_1 = __importDefault(require("./routes/api/router"));
const app = express_1.default();
const MongoStore = connect_mongo_1.default(express_session_1.default);
// Session Handling
const mongoURL = `mongodb://${process.env.MLAB_USER}:${process.env.MLAB_PASSWORD}@ds016108.mlab.com:16108/buyable-dev`;
app.use(express_session_1.default({
    secret: 'foo',
    store: new MongoStore({
        url: mongoURL
    }),
    resave: true,
    saveUninitialized: true
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
// MongoDB
mongoose_1.default.connect(mongoURL);
const db = mongoose_1.default.connection;
db.on('error', () => console.error('Error connecting to MLab MongoDB'));
const LocalStrategy = passport_local_1.default.Strategy;
passport_1.default.serializeUser((user, done) => {
    done(undefined, user._id);
});
passport_1.default.deserializeUser((id, done) => {
    user_1.UserModel.findById(id, (err, user) => {
        done(err, user);
    });
});
passport_1.default.use(new LocalStrategy(function (username, password, done) {
    user_1.UserModel.findOne({ username }, function (err, user) {
        return __awaiter(this, void 0, void 0, function* () {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false);
            }
            const pwCorrect = yield user.verifyPassword(password);
            if (!pwCorrect) {
                return done(null, false);
            }
            return done(null, user);
        });
    });
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(morgan_1.default('dev'));
app.use('/api', router_1.default);
app.use(express_1.default.static(__dirname + '/../client/build/'));
exports.default = app;
//# sourceMappingURL=app.js.map