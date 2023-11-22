## Uso

### Importarlas y lanzarlas con un "throw" para generar el error que manejará el middleware correspondiente 



```javascript
// user service . js

const { BadRequest, NotFound, Unauthorized } = require("../../errorClasses");

// service
static async signUp(req,res,next){

    try{

        if("condicion para tirar error") throw new BadRequest("mensaje de error")

    }catch(error){
        next(error)

    }
}


```