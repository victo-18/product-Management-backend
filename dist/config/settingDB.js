"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: '.env.local' });
const db = new sequelize_typescript_1.Sequelize(`${process.env.URL_CONETION_DB}`, {
    models: [__dirname + '/../models/**/*.ts'],
    logging: false, //desavilita los logs de sequelize para las pruebas
    dialectOptions: {
        ssl: {
            require: false
        }
    }
});
exports.default = db;
