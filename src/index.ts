import server from "./server";
import dotenv from 'dotenv'


dotenv.config({path:'.env.local'})
const PORT = Number(process.env.PORT) || 3000;


server.listen( PORT, ()=>{
 console.log("server escuchando en el puerto",PORT)
})