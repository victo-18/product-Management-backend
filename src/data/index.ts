import { exit} from "node:process"
import db from "../config/settingDB"

const clearDB =async()=>{
    try {
        await db.sync({force:true})
        console.log("The database was clear successfuly")
    } catch (error) {
        console.error('It has been an error before clrear db',error)
        exit(1)
    }
}
if(process.argv[2]==='--clear'){
    clearDB()
}