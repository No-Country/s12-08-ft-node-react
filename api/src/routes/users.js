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
 * /api/users/:
 *  get:
 *    tags:
 *      - Users
 *    summary: Obtiene los detalles de un usuario.
 *    description: Obtiene los detalles de un usuario basado en el ID proporcionado.
 *    parameters:
 *      - in: query
 *        name: third_user_id
 *        required: false
 *        description: ID del usuario deseado obtener (diferente al usuario logueado, este parametro no debe enviarse si se quiere acceder al propio usuario).
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Usuario encontrado exitosamente.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: UUID
 *                  description: ID del usuario.
 *                name:
 *                  type: string
 *                  description: Nombre del usuario.
 *                email:
 *                  type: string
 *                  description: Correo electrónico del usuario.
 *                profile_picture:
 *                  type: string
 *                  description: Imagen de perfil del usuario.
 *                date_of_birth:
 *                  type: string
 *                  description: Fecha de nacimiento del usuario.
 *                beneficiary_id:
 *                  type: string
 *                  description: ID del beneficiario del usuario.
 *                suscribers:
 *                 type: array
 *                 description: Lista de usuarios que están suscritos al usuario.
 *                chat:
 *                 type: object
 *                 description: Detalles del chat del usuario.
 *                suscribersCount:
 *                 type: integer
 *                 description: Número de usuarios que están suscritos al usuario.
 *                suscribedToCount:
 *                 type: integer
 *                 description: Número de usuarios a los que el usuario está suscrito.
 *      400:
 *        description: Error en la solicitud debido a datos incorrectos.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                 type: string
 *                 description: Mensaje de error.
 *      404:
 *        description: El usuario no existe.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                 type: string
 *                 description: Mensaje de error.
 *      500:
 *        description: Error del servidor.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                 type: string
 *                 description: Mensaje de error.
 */
usersRouter.get("/:third_user_id?", UserController.oneUser);

/**
 * @openapi
 * /api/users/acc:
 *   delete:
 *     tags:
 *       - Users
 *     summary: Elimina un usuario
 *     description: Elimina la cuenta del usuario autenticado.
 *     responses:
 *       204:
 *         description: Usuario eliminado exitosamente.
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

usersRouter.delete("/acc", UserController.deleteUser);

/**
 * @openapi
 * /api/users/subscribed:
 *  get:
 *    tags:
 *      - Users
 *    summary: Obtiene los detalles de los usuarios suscritos.
 *    description: Obtiene los detalles de los usuarios a los que el usuario actual está suscrito.
 *    responses:
 *      200:
 *        description: Detalles de los usuarios suscritos encontrados exitosamente.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                userSubscriptions:
 *                  type: array
 *                  description: Detalles de los usuarios suscritos.
 *                  items:
 *                    type: object
 *                    properties:
 *                      beneficiary:
 *                        type: object
 *                        description: Datos del usuario.
 *                      chat:
 *                        type: object
 *                        description: Datos del chat del usuario.
 *      400:
 *        description: Error en la solicitud debido a datos incorrectos.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: Mensaje de error.
 *      404:
 *        description: El usuario no existe.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: Mensaje de error.
 *      500:
 *        description: Error del servidor.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: Mensaje de error.
 */

usersRouter.get("/subscribed", UserController.subs);


/**
 * @openapi
 * /api/users/suggestions:
 *  get:
 *    tags:
 *      - Users
 *    summary: Obtiene los detalles de los usuarios sugeridos.
 *    description: Obtiene los detalles de los usuarios sugeridos para el usuario actual.
 *    responses:
 *      200:
 *        description: Detalles de los usuarios sugeridos encontrados exitosamente.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                userSubscriptions:
 *                  type: array
 *                  description: Detalles de los usuarios sugeridos.
 *                  items:
 *                    type: object
 *                    properties:
 *                      beneficiary:
 *                        type: object
 *                        description: Datos del usuario.
 *                      chat:
 *                        type: object
 *                        description: Datos del chat del usuario.
 *      400:
 *        description: Error en la solicitud debido a datos incorrectos.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: Mensaje de error.
 *      404:
 *        description: El usuario no existe.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: Mensaje de error.
 *      500:
 *        description: Error del servidor.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: Mensaje de error.
*/
usersRouter.get("/suggestions", UserController.suggestion);


module.exports = usersRouter;
