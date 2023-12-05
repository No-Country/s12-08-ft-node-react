const express = require("express");
const authRouter = express.Router();
const { UserController } = require("../controllers/users.controller");


/**
 * @openapi
 * /api/auth/sign-up:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Crea un nuevo usuario.
 *     description: Crea un nuevo usuario con la información proporcionada.
 *     requestBody:
 *       description: Datos del nuevo usuario.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Dirección de correo electrónico del nuevo usuario.
 *               username:
 *                 type: string
 *                 description: Username del nuevo usuario.
 *               name:
 *                 type: string
 *                 description: Nombre del nuevo usuario.
 *               password:
 *                 type: string
 *                 description: Contraseña del nuevo usuario.
 *               date_of_birth:
 *                 type: string
 *                 description: Fecha de nacimiento del nuevo usuario en formato YYYY-MM-DD.
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje indicando que el usuario se ha creado exitosamente.
 *                 user:
 *                   type: object
 *                   description: Detalles del nuevo usuario.
 *       400:
 *         description: Error en la solicitud debido a datos incorrectos.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error.
 *       500:
 *         description: Error del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error.
*/
authRouter.post("/sign-up", UserController.createUser);


/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Inicia sesión de usuario.
 *     description: Inicia sesión de usuario con credenciales proporcionadas.
 *     requestBody:
 *       description: Datos de inicio de sesión del usuario.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               identifier:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Inicio de sesión exitoso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 user:
 *                   type: object
 *       400:
 *         description: Error en la solicitud debido a datos incorrectos.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: El usuario no existe.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Error del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
*/
authRouter.post("/login", UserController.login);


module.exports = authRouter;
