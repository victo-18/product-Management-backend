"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectionDB = connectionDB;
const express_1 = __importDefault(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = __importDefault(require("./config/swagger"));
const morgan_1 = __importDefault(require("morgan"));
const router_1 = __importDefault(require("./router"));
const settingDB_1 = __importDefault(require("./config/settingDB"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: '.env.local' });
//Creating connection to database
async function connectionDB() {
    try {
        await settingDB_1.default.authenticate();
        await settingDB_1.default.sync();
    }
    catch (error) {
        console.log("The databse connectios was refuce");
    }
}
const frontendUrl = process.env.FRONTEND_URL;
const allowedOrigins = [
    'http://localhost:3000',
    `${frontendUrl}`
];
connectionDB();
const server = (0, express_1.default)();
//enabling cors optios
const corsOption = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error('There is a cors errors'));
        }
        console.log(origin);
    }
};
server.use((0, cors_1.default)(corsOption));
//enabling json reading
server.use(express_1.default.json());
//enabling morgan
server.use((0, morgan_1.default)('dev'));
server.use("/api/product", router_1.default);
//expose rout to show api documentation
server.use("/jsdoc", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.default));
exports.default = server;
