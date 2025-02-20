
import swaggerJSDoc from "swagger-jsdoc";

const options:swaggerJSDoc.Operation={
    swaggerDefinition:{
        openapi:'3.0.2',
        tags:[
            {
                name:'Product',
                desciption:'Api to product management '
            }
        ],
        info:{
            title:'REST API WITH NODE JS AND TYPESCRIPT',
            version:'1.0.0',
            description: 'API DOCS FOR PRODUCTS MANAGEMENT'
        }
    },
    apis:['./src/router.ts']
}
const swaggerSpec= swaggerJSDoc(options)
export default swaggerSpec