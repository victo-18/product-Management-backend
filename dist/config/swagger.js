"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const options = {
    swaggerDefinition: {
        openapi: '3.0.2',
        tags: [
            {
                name: 'Product',
                desciption: 'Api to product management '
            }
        ],
        info: {
            title: 'REST API WITH NODE JS AND TYPESCRIPT',
            version: '1.0.0',
            description: 'API DOCS FOR PRODUCTS MANAGEMENT'
        }
    },
    apis: ['./src/router.ts']
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
exports.default = swaggerSpec;
