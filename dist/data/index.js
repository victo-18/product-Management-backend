"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_process_1 = require("node:process");
const settingDB_1 = __importDefault(require("../config/settingDB"));
const clearDB = async () => {
    try {
        await settingDB_1.default.sync({ force: true });
        console.log("The database was clear successfuly");
    }
    catch (error) {
        console.error('It has been an error before clrear db', error);
        (0, node_process_1.exit)(1);
    }
};
if (process.argv[2] === '--clear') {
    clearDB();
}
