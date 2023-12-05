const express = require("express");
const usersRouter = express.Router();
const {checkSession} = require('../middlewares/session/session')
const { UserController } = require("../controllers/users.controller");

usersRouter.use(checkSession)

/**
 * @openapi
 * /api/users/edit:
 *   put:
 *     tags:
 *       - Users
 *     summary: Edita el usuario actual.
 *     description: Edita el usuario actual con la información proporcionada.
 *     requestBody:
 *       description: Datos actualizados del usuario.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Nueva dirección de correo electrónico del usuario.
 *               name:
 *                 type: string
 *                 description: Nuevo nombre del usuario.
 *               username:
 *                 type: string
 *                 description: Nuevo username del usuario.
 *               password:
 *                 type: string
 *                 description: Nueva contraseña del usuario.
 *               profile_picture:
 *                 type: string
 *                 description: Nueva imagen de perfil del usuario en formato base64.
 *               date_of_birth:
 *                 type: string
 *                 description: Nueva fecha de nacimiento del usuario en formato YYYY-MM-DD.
 *     responses:
 *       200:
 *         description: Usuario editado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje indicando que el usuario se ha editado exitosamente.
 *                 user:
 *                   type: object
 *                   description: Detalles del usuario editado.
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
 *       404:
 *         description: El usuario no existe.
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
usersRouter.put("/edit" , UserController.editUser)


/**
 * @openapi
 * /api/users/allUser:
 *   get:
 *     tags:
 *       - Users
 *     summary: Obtiene la lista de todos los usuarios.
 *     description: Obtiene una lista de todos los usuarios registrados en el sistema, excluyendo la contraseña de cada usuario.
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Error del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error del servidor.
*/
usersRouter.get("/allUser", UserController.AllUser);

/**
 * @openapi
 * /api/users/{id}:
 *   get:
 *     tags:
 *       - Users
 *     summary: Obtiene los detalles de un usuario específico.
 *     description: Obtiene los detalles de un usuario específico y su chat asociado, excluyendo la contraseña del usuario.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario del cual se desean obtener los detalles.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detalles del usuario obtenidos exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   description: Detalles del usuario.
 *                 chat:
 *                   type: object
 *                   description: Detalles del chat asociado al usuario.
 *       404:
 *         description: El usuario no existe.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error indicando que el usuario no existe.
 *       500:
 *         description: Error del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error del servidor.
*/
usersRouter.get("/:id", UserController.oneUser);

module.exports = usersRouter;
