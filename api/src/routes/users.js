const express = require("express");
const usersRouter = express.Router();
const {checkSession} = require('../middlewares/session/session')
const { UserController } = require("../controllers/users.controller");

usersRouter.use(checkSession)

/**
 * @openapi
 * /api/users/edit/{id}:
 *   put:
 *     tags:
 *       - Users
 *     summary: Edita un usuario existente.
 *     description: Edita un usuario existente con la información proporcionada.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario que se va a editar.
 *         schema:
 *           type: string
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
 *       201:
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
usersRouter.put("/edit/:id" , UserController.editUser)

module.exports = usersRouter