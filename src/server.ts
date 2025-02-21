import express from "express";
import  swaggerUi  from "swagger-ui-express";
import swaggerSpec from './config/swagger'
import morgan from 'morgan'
import router from "./router";
import db from "./config/settingDB";
import cors,{CorsOptions} from 'cors'
import dotenv from 'dotenv'
 dotenv.config({path:'.env.local'})
//Creating connection to database
export async function connectionDB() {
 try {
  await db.authenticate();
  await db.sync();
 } catch (error) {
  console.log("The databse connectios was refuce")
 }
}
const frontendUrl= process.env.FRONTEND_URL
connectionDB();
const server = express();
//enabling cors optios
const corsOption :CorsOptions ={
    origin:function (origin,callback){
        if(!origin||origin===`${frontendUrl}` ){
         callback(null,true)
        }else{
        callback(new Error('There is a cors errors'))
        }
        console.log(origin)
    }
}
server.use(cors(corsOption))
//enabling json reading
server.use(express.json())
//enabling morgan
server.use(morgan('dev'))
server.use("/api/product", router);
//expose rout to show api documentation
server.use("/jsdoc",swaggerUi.serve,swaggerUi.setup(swaggerSpec))
export default server;
