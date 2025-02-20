import { Request, Response } from "express";
import Product from "../models/Product.models";


const getProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await Product.findAll({
      order: [["id", "DESC"]],
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });

    res.status(200).json({ data: product });
  } catch (error) {
    console.error(error);
  }
};
//
const getProductById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const productId = id;
  try {
    const product = await Product.findByPk(productId, {
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    if (!product) {
      res.status(404).json({ error: "Product not exist" });
      return;
    }
    res.status(200).json({ data: product });
  } catch (error) {
    console.error(error);
  }
};
//
const updataProduct = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const productId = id;
  const product = await Product.findByPk(productId, {
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
  res.status(200).json({message: "The product was successfully update" });
};
const crearProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    //Creating product in the database
     await Product.create(req.body);
    res.status(201).json({message:'The product has been successfully created' });
  } catch (error) {
    console.error("The register couldn't be created",error);
    res.status(400).json({error:'The product has not been successfully created' });
  }
};
// Audatinf product with putch
const updataAvailability = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const productId = id;

  try {
    const product = await Product.findByPk(productId, {
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
    res.status(200).json({message:"The product availability has been changed" });
  } catch (error) {
    console.error(error);
  }
};
//
const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const productId = id;
  try {
    const productDelete = await Product.findByPk(productId)
    if(!productDelete){
        res.status(404).json({error:"Product doesn't exist"})
        return
    }
   
    await productDelete?.destroy()
    res.status(200).json({message:'The product has been disposed of correctly'})
  } catch (error) {
    console.error("There is an error trying to delete de register")
  }
};
export {
  crearProduct,
  getProducts,
  getProductById,
  updataProduct,
  updataAvailability,
  deleteProduct,
};
