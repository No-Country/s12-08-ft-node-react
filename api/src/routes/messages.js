const express = require("express");
const messagesRouter = express.Router();
const { MessageController } = require("../controllers/messages.controller");


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
 *           format: uuid
 *       - name: user_id
 *         in: query
 *         required: true
 *         description: ID del usuario.
 *         schema:
 *           type: string
 *           format: uuid
 *       - name: reaction
 *         in: query
 *         required: true
 *         description: Reacción a aplicar.
 *         schema:
 *           type: string
 *           enum: [love, sad, fun, interesting]
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


module.exports = messagesRouter;
