import{Request,Response,NextFunction}from 'express'
import { check, validationResult } from 'express-validator';

//
export const handlerInputErrors = async (req: Request, res: Response, next: NextFunction) => {
  // Validando datos con express-validator
  await check('name')
    .exists().withMessage('The product name is required') // Verifica que exista
    .notEmpty().withMessage('The product name cannot be empty') // No debe estar vacío
    .run(req);

  await check('price')
    .exists().withMessage("The price is required") // Verifica que exista
    .notEmpty().withMessage("The price cannot be empty") // No debe estar vacío
    .isNumeric().withMessage("The price must be a number") // Debe ser numérico
    .custom(value => value > 0).withMessage("Invalid price, must be greater than 0") // Mayor a 0
    .run(req);

  // Obtener los errores de validación
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
       res.status(400).json({ errorMessage: errors.array() });
    return 
  }

  next();
};

export const checkingId = async(req:Request,res:Response,next:NextFunction)=>{
       await check('id').isNumeric().withMessage("The id is invalid").run(req)
       await check('id').notEmpty().withMessage("The id is required").run(req)
       let error = validationResult(req);
       if(!error.isEmpty()){
        res.status(400).json({errorMessage:error.array()})
        return
       }
       next()
}