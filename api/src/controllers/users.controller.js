const { User } = require('../db.js');
const BadRequest = require('../errorClasses/BadRequest.js');
const NotFound = require('../errorClasses/NotFound.js');
const {usersValidation, loginValidation} = require('../validations/users.validations.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
require("dotenv").config();
const Chat = require('../database/mongo/chats.model.js');
const mongoose = require('mongoose');

class UserController {

  static async createUser(req,res,next) {
    try {
      //validanciones por body
      const {error, value } = usersValidation.validate(req.body);
      if(error){
        throw new BadRequest(error.details[0].message);
      }
      const { email, name, username, password, profile_picture, date_of_birth } = value;

      // Hash de la contraseña utilizando bcrypt
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await User.create({
        email,
        name,
        username,
        password: hashedPassword,
        profile_picture,
        date_of_birth,
      });

      const newChat = await Chat.create({
        _id: newUser.id,
        user_id: newUser.id, 
        name: newUser.name,
        description: "Chat de " + newUser.username
      });

      res.status(201).json({ message: 'Usuario creado exitosamente', user: newUser, chat: newChat });
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
}

module.exports = { UserController };