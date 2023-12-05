const express = require("express");
const messagesRouter = express.Router();
const { MessageController } = require("../controllers/messages.controller");
const { checkSession } = require("../middlewares/session/session");


messagesRouter.use(checkSession)
/**
 * @openapi
 * /api/chats/message:
 *   delete:
 *     tags:
 *       - Chats
 *     summary: Borra un mensaje específico del chat del usuario actual.
 *     description: Borra un mensaje existente en el chat del usuario autenticado.
 *     requestBody:
 *       description: Datos para borrar el mensaje.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *                 description: ID del usuario autenticado.
 *               chat_id:
 *                 type: string
 *                 description: ID del chat al que pertenece el mensaje.
 *               message_id:
 *                 type: string
 *                 description: ID del mensaje que se va a borrar.
 *     responses:
 *       201:
 *         description: Mensaje borrado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje indicando que el mensaje se ha borrado exitosamente.
 *                 deletedMessage:
 *                   type: object
 *                   description: Detalles del mensaje borrado.
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
 *       401:
 *         description: No es el propietario del mensaje.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error indicando que no es el propietario del mensaje.
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
messagesRouter.delete("/", MessageController.delete);

messagesRouter.put("/reaction", MessageController.putReaction);

module.exports = messagesRouter;
