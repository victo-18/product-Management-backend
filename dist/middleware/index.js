"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkingId = exports.handlerInputErrors = void 0;
const express_validator_1 = require("express-validator");
//
const handlerInputErrors = async (req, res, next) => {
    // Validando datos con express-validator
    await (0, express_validator_1.check)('name')
        .exists().withMessage('The product name is required') // Verifica que exista
        .notEmpty().withMessage('The product name cannot be empty') // No debe estar vacío
        .run(req);
    await (0, express_validator_1.check)('price')
        .exists().withMessage("The price is required") // Verifica que exista
        .notEmpty().withMessage("The price cannot be empty") // No debe estar vacío
        .isNumeric().withMessage("The price must be a number") // Debe ser numérico
        .custom(value => value > 0).withMessage("Invalid price, must be greater than 0") // Mayor a 0
        .run(req);
    // Obtener los errores de validación
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errorMessage: errors.array() });
        return;
    }
    next();
};
exports.handlerInputErrors = handlerInputErrors;
const checkingId = async (req, res, next) => {
    await (0, express_validator_1.check)('id').isNumeric().withMessage("The id is invalid").run(req);
    await (0, express_validator_1.check)('id').notEmpty().withMessage("The id is required").run(req);
    let error = (0, express_validator_1.validationResult)(req);
    if (!error.isEmpty()) {
        res.status(400).json({ errorMessage: error.array() });
        return;
    }
    next();
};
exports.checkingId = checkingId;
