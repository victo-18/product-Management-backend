import { Sequelize } from "sequelize-typescript";
import dotenv from 'dotenv'
 dotenv.config({path:'.env.local'})
const db = new Sequelize(
  `${process.env.URL_CONETION_DB}`,{
    models:[__dirname + '/../models/**/*'],
    logging:false, //desavilita los logs de sequelize para las pruebas
    dialectOptions:{
        ssl:{
            require:false
        }
    }
  }
);
export default db 