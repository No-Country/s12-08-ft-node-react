const express = require("express");
const messagesRouter = express.Router();
const { MessageController } = require("../controllers/messages.controller");
const { checkSession } = require("../middlewares/session/session");
const { checkSubscription } = require("../middlewares/subscriptions/subscriptions");

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
messagesRouter.delete("/:id", MessageController.delete);
/**
 * @openapi
 * /api/message/reaction/{messageId}:
 *   put:
 *     tags:
 *       - Messages
 *     summary: Modifica la reacción de un mensaje.
 *     description: Modifica la reacción de un mensaje específico.
 *     parameters:
 *       - name: messageId
 *         in: path
 *         required: true
 *         description: ID del mensaje a modificar.
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Datos del la reaccion
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *                 description: ID del usuario que hace la reacccion.
 *               reaction:
 *                 type: string
 *                 description: Reaccion a agregar.
 *                 enum:
 *                  - love
 *                  - sad
 *                  - fun
 *                  - interesting
 *     responses:
 *       '200':
 *         description: Reacción actualizada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje indicando el éxito de la actualización.
 *                 updatedMessage:
 *                   type: object
 *                   description: Detalles del mensaje actualizado.
 *       '400':
 *         description: Error en la solicitud debido a datos incorrectos.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error.
 *       '404':
 *         description: Mensaje no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error.
 *       '500':
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
messagesRouter.put("/reaction/:messageId", MessageController.putReaction);

/**
 * @openapi
 * /api/message/chat/{id}:
 *   get:
 *     tags:
 *       - Messages
 *     summary: Obtiene los Mensajes de un chat especifico.
 *     description: Obtiene los Mensajes de un chat.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del chat.
 *       - in: query
 *         name: page
 *         description: Pagina con cantidad de Mensajes (cada 20) del chat.
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Mensajes obtenidos exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 messages:
 *                   type: object
 *                   description: Mensajes ascociados al chat.
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
 *         description: El chat no existe o el usuario no está disponible.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error indicando que el chat no existe o el usuario no está disponible.
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
messagesRouter.get("/chat/:id", checkSubscription,MessageController.getByChat)


module.exports = messagesRouter;
