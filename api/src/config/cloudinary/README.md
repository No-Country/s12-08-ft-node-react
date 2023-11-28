# Guía uso de Cloudinary

## Configuración 
Para empezar a usar Cloudinary:

### Instalar el paquete:
```bash
npm install 
```
Ya está incluido en `package.json`


### Configuración:

```javascript
const cloudinary = require("cloudinary").v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = { cloudinary };
```

Ya está incluida en `/api/src/config/cloudinary/index.js`.


## Uso 
Ahora Cloudinary está configurado, podemos usarlo para subir y traer imágenes. Ejemplo con validación de `Joi`

```javascript
// controller.js

const { cloudinary } = require("../config/cloudinary/");
const { exampleSchema } = require("../validations/examples.validations.js");

class ExampleController {

    static async create(req, res, next) {
        // Joi validation
        const { error, value } = exampleSchema.validate(req.body);
        if (error) {
          throw new BadRequest(error.details[0].message);
        }
        
        // Upload Image to Cloudinary
        const uploadResponse = await cloudinary.uploader.upload(value.image, {
          resource_type: "auto",
          folder: "pov",
        });
        
        // Assign the Secure URL to the 'img' variable (adjust according to entity)
        value.img = uploadResponse.secure_url;
    
    }
}

```
### IMPORTANTE!
1- Esto son solo lineas de ejemplo, deberiamos tener un `create` mas completo (véase jwt, trycatch, transaction, etc...) <br>
2- En `uploadResponse.secure_url` está el LINK que le enviamos al frontend para las imágenes. <br> Por eso lo guardamos en `value.img` (objeto que usamos para crear):
`await Model.create({...value})` 




## .ENV

Hablar conmigo (Hernán) por las variables de entorno.