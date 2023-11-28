const { User } = require('../db.js');
const BadRequest = require('../errorClasses/BadRequest.js');
const NotFound = require('../errorClasses/NotFound.js');
const {usersValidation, loginValidation} = require('../validations/users.validations.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const { cloudinary } = require("../config/cloudinary/index.js");
require("dotenv").config();

class UserController {

  static async createUser(req,res,next) {
    try {
      //validanciones por body
      const {error, value } = usersValidation.validate(req.body);
      if(error){
        throw new BadRequest(error.details[0].message);
      }

      // Obtener datos del cuerpo de la solicitud
      const { email, name, password, profile_picture, date_of_birth } = value;

      // Hash de la contraseña utilizando bcrypt
      const hashedPassword = await bcrypt.hash(password, 10);

      // Lógica para crear el usuario en la base de datos
      const newUser = await User.create({
        email,
        name,
        password: hashedPassword,
        profile_picture,
        date_of_birth,
      });

      // Enviar la respuesta con el nuevo usuario creado
      res.status(201).json({ message: 'Usuario creado exitosamente', user: newUser });
    } catch (err) {
      next(err);
    }
  }

  static async login(req,res,next) {
    try {
      const {error, value } = loginValidation.validate(req.body);

      if(error){
        throw new BadRequest(error.details[0].message);
      }

      const {email, password} = value

      const user = await User.findOne({where: {email}})

      if(!user){
        throw new NotFound("El usuario no existe")
      }

      const passwordMatch = await bcrypt.compare(password, user.password)

      if (!passwordMatch) {
        throw new BadRequest('Contraseña incorrecta' ); 
      }

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

      return res.status(201).json({ token: token, user: user });
    } catch (error) {
      next(error);
    }
  }


  static async editUser(req,res,next) {
    try {
      const { id } = req.params

      if(!id){
        throw new BadRequest('Se debe proporcionar un ID');
      }

      const { error, value } = usersValidation.validate(req.body);
      if( error ){
        throw new BadRequest(error.details[0].message);
      }
      const { email, name, password, profile_picture, date_of_birth } = value;

      const user = await User.findByPk( id )

      if(!user){
        throw new NotFound("El usuario no existe")
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      let routeImg = null

      if(profile_picture){
          const uploadResponse = await cloudinary.uploader.upload(profile_picture, {
            resource_type: "auto",
            folder: "pov",
          });
        
        routeImg = uploadResponse.secure_url;
      }
      

      user.set({
        email,
        name, 
        password: hashedPassword,
        profile_picture: routeImg,
        date_of_birth
      })
      
      const newUser = await user.save()

      return res.status(201).json({ message: 'Usuario editado exitosamente' , user: newUser });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = { UserController };