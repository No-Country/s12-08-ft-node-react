const { User } = require('../db.js');
const BadRequest = require('../errorClasses/BadRequest.js');
const NotFound = require('../errorClasses/NotFound.js');
const AlreadyExist = require('../errorClasses/AlreadyExist.js');
const {usersValidation, loginValidation,editUserValidation} = require('../validations/users.validations.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const { cloudinary } = require("../config/cloudinary/index.js");
require("dotenv").config();
const Chat = require('../database/mongo/chats.model.js');
const mongoose = require('mongoose');
const { Op } = require('sequelize');

class UserController {

  static async createUser(req,res,next) {
    try {
      //validanciones por body
      const {error, value } = usersValidation.validate(req.body);
      if(error){
        throw new BadRequest(error.details[0].message);
      }
      const { email, name, username, password, profile_picture, date_of_birth } = value;

      const user = await User.findOne({ where: { [Op.or]: [
        { email: email },
        { username: username }
      ]}})

      if(user){
        throw new AlreadyExist("El usuario ya existe")
      }

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

      delete newUser.dataValues.password

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

      const { identifier,password } = value

      const user = await User.findOne({ where: { [Op.or]: [
        { email: identifier },
        { username: identifier }
      ]}});


      if(!user){
        throw new NotFound("El usuario no existe")
      }

      const passwordMatch = await bcrypt.compare(password, user.password)

      if (!passwordMatch) {
        throw new BadRequest('Contraseña incorrecta' ); 
      }

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

      delete user.dataValues.password

      return res.status(201).json({ token: token, user: user });
    } catch (error) {
      next(error);
    }
  }


  static async editUser(req,res,next) {
    try {
      const { user_id } = req

      if(!user_id){
        throw new BadRequest('Se debe proporcionar un ID');
      }

      const { error, value } = editUserValidation.validate(req.body);
      if( error ){
        throw new BadRequest(error.details[0].message);
      }

      const user = await User.findByPk( user_id )

      if(!user){
        throw new NotFound("El usuario no existe")
      }


      if (value.email) {
        const emailExists = await User.findOne({
          where: {
            email: value.email,
            id: { [Op.ne]: user_id }, 
          },
        });
        if (emailExists) {
          throw new AlreadyExist("El email ya está registrado por otro usuario");
        }
      }

      if (value.username) {
        const usernameExists = await User.findOne({
          where: {
            username: value.username,
            id: { [Op.ne]: user_id },
          },
        });

        if (usernameExists) {
          throw new AlreadyExist("El nombre de usuario ya está registrado por otro usuario");
        }
      }
        

      if(value.password){
        value.password = await bcrypt.hash(password, 10);
      }
      

      if(value.profile_picture){
          const uploadResponse = await cloudinary.uploader.upload(profile_picture, {
            resource_type: "auto",
            folder: "pov",
          });
        
        value.profile_picture = uploadResponse.secure_url;
      }
      

      user.set({
        ...value
      })
      
      const newUser = await user.save()

      return res.status(201).json({ message: 'Usuario editado exitosamente' , user: newUser });
    } catch (error) {
      next(error);
    }
  }

  static async AllUser(req, res, next){
    try {
      const users = await User.findAll({
        attributes: { exclude: ['password'] } 
      });

      res.status(200).json(users);
    } catch (error) {
    next(error);  
    }
  }

  static async oneUser(req, res, next){
    try {
      const { id } = req.params;
      const user = await User.findOne({
        where: { id: id },
        attributes: { exclude: ['password'] } 
      });
      const userChat = await Chat.findOne({ _id: id });

      res.status(200).json({ user: user, chat: userChat });
    } catch (error) {
      next(error)
      
    }
  }
}

module.exports = { UserController };