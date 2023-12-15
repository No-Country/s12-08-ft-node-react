const { User } = require("../db.js");
const BadRequest = require("../errorClasses/BadRequest.js");
const NotFound = require("../errorClasses/NotFound.js");
const AlreadyExist = require("../errorClasses/AlreadyExist.js");
const {
  usersValidation,
  loginValidation,
  editUserValidation,
} = require("../validations/users.validations.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { cloudinary } = require("../config/cloudinary/index.js");
require("dotenv").config();
const Chat = require("../database/mongo/chats.model.js");
const mongoose = require("mongoose");
const { Op } = require("sequelize");
const stripe = require("../stripe.js");
const { Subscription } = require("../db.js");

class UserController {
  static async createUser(req, res, next) {
    try {
      //validanciones por body
      const { error, value } = usersValidation.validate(req.body);
      if (error) {
        throw new BadRequest(error.details[0].message);
      }
      const {
        email,
        name,
        username,
        password,
        profile_picture,
        date_of_birth,
      } = value;

      const user = await User.findOne({
        where: { [Op.or]: [{ email: email }, { username: username }] },
      });

      if (user) {
        throw new AlreadyExist("El usuario ya existe");
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
        description: "Chat de " + newUser.username,
      });

      const plan = await stripe.prices.create({
        currency: "usd",
        unit_amount: 500,
        recurring: {
          interval: "month",
        },
        product_data: {
          name: "Suscription to " + newUser.username,
          metadata: {
            user_id: newUser.id,
          },
        },
        metadata: {
          user_id: newUser.id,
        },
      });

      const customer = await stripe.customers.create({
        name: newUser.name,
        email: newUser.email,
        metadata: {
          user_id: newUser.id,
        },
      });

      delete newUser.dataValues.password;

      res.status(201).json({
        message: "Usuario creado exitosamente",
        user: newUser,
        chat: newChat,
        customer,
        plan,
      });
    } catch (err) {
      next(err);
    }
  }

  static async login(req, res, next) {
    try {
      const { error, value } = loginValidation.validate(req.body);

      if (error) {
        throw new BadRequest(error.details[0].message);
      }

      const { identifier, password } = value;

      const user = await User.findOne({
        where: { [Op.or]: [{ email: identifier }, { username: identifier }] },
        include: [
          {
            model: Subscription,
            as: "subscriptions",
            attributes: ["beneficiary_id"],
            required: false,
          },
        ]
      });

      if (!user) {
        throw new NotFound("El usuario no existe");
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        throw new BadRequest("Contraseña incorrecta");
      }

      const suscribers = await Subscription.findAll({
        where: { beneficiary_id: user.id },
        attributes: ["user_id"],
      });

      user.dataValues.suscribersCount =  suscribers.length,
      user.dataValues.suscribedToCount = user.subscriptions.length

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

      delete user.dataValues.password;

      return res.status(201).json({ token: token, user: user });
    } catch (error) {
      next(error);
    }
  }

  static async editUser(req, res, next) {
    try {
      const { user_id } = req;

      if (!user_id) {
        throw new BadRequest("Se debe proporcionar un ID");
      }

      const { error, value } = editUserValidation.validate(req.body);
      if (error) {
        throw new BadRequest(error.details[0].message);
      }

      const user = await User.findByPk(user_id);

      if (!user) {
        throw new NotFound("El usuario no existe");
      }

      if (value.email) {
        const emailExists = await User.findOne({
          where: {
            email: value.email,
            id: { [Op.ne]: user_id },
          },
        });
        if (emailExists) {
          throw new AlreadyExist(
            "El email ya está registrado por otro usuario"
          );
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
          throw new AlreadyExist(
            "El nombre de usuario ya está registrado por otro usuario"
          );
        }
      }

      if (value.password) {
        value.password = await bcrypt.hash(value.password, 10);
      }

      if (value.profile_picture) {
        const uploadResponse = await cloudinary.uploader.upload(
          profile_picture,
          {
            resource_type: "auto",
            folder: "pov",
          }
        );

        value.profile_picture = uploadResponse.secure_url;
      }

      user.set({
        ...value,
      });

      const newUser = await user.save();

      return res
        .status(201)
        .json({ message: "Usuario editado exitosamente", user: newUser });
    } catch (error) {
      next(error);
    }
  }

  static async AllUser(req, res, next) {
    try {
      const users = await User.findAll({
        attributes: { exclude: ["password"] },
      });

      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }

  static async oneUser(req, res, next) {
    const { profile } = req.query;

    try {
      const user = await User.findOne({
        where: { id: profile || req.user_id },
        include: [
          {
            model: Subscription,
            as: "subscriptions",
            attributes: ["beneficiary_id"],
            required: false,
          },
        ],
        attributes: {
          exclude: ["password"],
        },
      });

      const suscribers = await Subscription.findAll({
        where: { beneficiary_id: profile || req.user_id },
        attributes: ["user_id"],
      });

      const chat = await Chat.findOne({
        _id: profile || req.user_id,
      });

      res.status(200).json({
        ...user.toJSON(),
        suscribers,
        chat,
        suscribersCount: suscribers.length,
        suscribedToCount: user.subscriptions.length,
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteUser(req, res, next) {
    try {
      const userId = req.user_id;

      const user = await User.findByPk(userId);
      if (!user) {
        throw new NotFound("Usuario no encontrado");
      }

      await user.destroy();
      await Chat.deleteMany({ _id: userId });
      res.status(204).send("Usuario eliminado con éxito");
    } catch (error) {
      next(error);
    }
  }

  static async subs(req, res, next) {
    try {
      const userId = req.user_id;
      const userSubscriptions = await Subscription.findAll({
        where: { user_id: userId, status: true},
        attributes: ['beneficiary_id'],
      });

      const totalSubscriptions = userSubscriptions.length;
  
      const subscriptionsWithBeneficiaries = await Promise.all(userSubscriptions.map(async (subscription) => {
        const beneficiary = await User.findByPk(subscription.beneficiary_id, {
          attributes: ['id', 'name', 'username', 'profile_picture'],include: [
            {
              model: Subscription,
              as: "subscriptions",
              attributes: ["beneficiary_id"],
              required: false,
            },
          ]
        });
  
        const totalSubscriptions = beneficiary.subscriptions.length
        beneficiary.dataValues.totalSubscriptions = totalSubscriptions

        const beneficiaryChats = await Chat.find({ user_id: subscription.beneficiary_id })
  
        return {
          beneficiary,
          chat: beneficiaryChats,
        };
      }));
  
      res.status(200).json({
        totalSubscriptions,
        userSubscriptions: subscriptionsWithBeneficiaries,
      });
    } catch (err) {
      next(err);
    }
  }

  static async suggestion(req, res, next){
    console.log('suggestion')
    try {
      const suggestions = await User.findAll({limit: 10, attributes: ['id', 'name', 'username', 'profile_picture'], include: [
        {
          model: Subscription,
          as: "subscriptions",
          attributes: ["beneficiary_id"],
          required: false,
        },
      ]})

      const totalSubscriptions = 0 
      const suggestionWithChat = await Promise.all(suggestions.map(async (sugg) => {

        const totalSubscriptions = sugg.subscriptions.length
        sugg.dataValues.totalSubscriptions = totalSubscriptions
        const userChats = await Chat.find({ user_id: sugg.id })
  
        return {
          beneficiary: sugg,
          chat: userChats,
        };
      }));

      res.status(200).json({
        totalSubscriptions,
        userSubscriptions: suggestionWithChat,
      });
      
    } catch (error) {
      next(err);
    }
  }
}

module.exports = { UserController };
