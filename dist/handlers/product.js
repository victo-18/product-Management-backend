"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updataAvailability = exports.updataProduct = exports.getProductById = exports.getProducts = exports.crearProduct = void 0;
const Product_models_1 = __importDefault(require("../models/Product.models"));
const getProducts = async (req, res) => {
    try {
        const product = await Product_models_1.default.findAll({
            order: [["id", "DESC"]],
            attributes: { exclude: ["createdAt", "updatedAt"] },
        });
        res.status(200).json({ data: product });
    }
    catch (error) {
        console.error(error);
    }
};
exports.getProducts = getProducts;
//
const getProductById = async (req, res) => {
    const { id } = req.params;
    const productId = id;
    try {
        const product = await Product_models_1.default.findByPk(productId, {
            attributes: { exclude: ["createdAt", "updatedAt"] },
        });
        if (!product) {
            res.status(404).json({ error: "Product not exist" });
            return;
        }
        res.status(200).json({ data: product });
    }
    catch (error) {
        console.error(error);
    }
};
exports.getProductById = getProductById;
//
const updataProduct = async (req, res) => {
    const { id } = req.params;
    const productId = id;
    const product = await Product_models_1.default.findByPk(productId, {
        attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    //Verificar que el producto exista
    if (!product) {
        res.status(404).json({ error: "Product not exist" });
        return;
    }
    //Actualizar el producto
    await product.update(req.body);
    await product.save();
    res.status(200).json({ message: "The product was successfully update" });
};
exports.updataProduct = updataProduct;
const crearProduct = async (req, res) => {
    try {
        //Creating product in the database
        await Product_models_1.default.create(req.body);
        res.status(201).json({ message: 'The product has been successfully created' });
    }
    catch (error) {
        console.error("The register couldn't be created", error);
        res.status(400).json({ error: 'The product has not been successfully created' });
    }
};
exports.crearProduct = crearProduct;
// Audatinf product with putch
const updataAvailability = async (req, res) => {
    const { id } = req.params;
    const productId = id;
    try {
        const product = await Product_models_1.default.findByPk(productId, {
            attributes: { exclude: ["createdAt", "updatedAt"] },
        });
        //Verificar que el producto exista
        if (!product) {
            res.status(404).json({ error: "Product not exist" });
            return;
        }
        //Actualizar el producto
        product.availability = !product.dataValues.availability;
        await product.save();
        res.status(200).json({ message: "The product availability has been changed" });
    }
    catch (error) {
        console.error(error);
    }
};
exports.updataAvailability = updataAvailability;
//
const deleteProduct = async (req, res) => {
    const { id } = req.params;
    const productId = id;
    try {
        const productDelete = await Product_models_1.default.findByPk(productId);
        if (!productDelete) {
            res.status(404).json({ error: "Product doesn't exist" });
            return;
        }
        await productDelete?.destroy();
        res.status(200).json({ message: 'The product has been disposed of correctly' });
    }
    catch (error) {
        console.error("There is an error trying to delete de register");
    }
};
exports.deleteProduct = deleteProduct;
