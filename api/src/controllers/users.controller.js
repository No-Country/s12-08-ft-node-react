const { User } = require('../db');
const usersValidation = require('../validations/users.validations.js');
const validations = require('../validations/users.validations.js');
const BadRequest = require('../errorClasses/BadRequest.js');

class UserController {
  static async creatUser(req,res,next) {
    try {
      //validanciones por body
      const {error, value } = usersValidation.validate(req.body);
      if(error){
        throw new BadRequest(error.details[0].message);
      }

      // Obtener datos del cuerpo de la solicitud
      const { email, name, password, role, profile_picture, date_of_birth } = req.body;

      // Hash de la contraseña utilizando bcrypt
      const hashedPassword = await bcrypt.hash(password, 10);

      // Lógica para crear el usuario en la base de datos
      const newUser = await User.create({
        email,
        name,
        password: hashedPassword,
        role,
        profile_picture,
        date_of_birth,
      });

      // Enviar la respuesta con el nuevo usuario creado
      res.status(201).json({ message: 'Usuario creado exitosamente', user: newUser });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = { UserController };