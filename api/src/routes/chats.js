const express = require("express");
const chatsRouter = express.Router();
const { ChatController } = require("../controllers/chats.controller");
const { MessageController } = require("../controllers/messages.controller");
const { checkSession } = require("../middlewares/session/session");

//chatsRouter.get("/", ChatController.example);


chatsRouter.use(checkSession)

/**
 * @openapi
 * /api/chats/chat:
 *   post:
 *     tags:
 *       - Chats
 *     summary: Crea un nuevo mensaje en el chat del usuario actual.
 *     description: Crea un mensaje con el contenido proporcionado y lo agrega al chat del usuario autenticado.
 *     requestBody:
 *       description: Datos del mensaje a crear.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *                 description: Contenido de texto del mensaje.
 *               image:
 *                 type: string
 *                 description: URL o base64 de una imagen asociada al mensaje.
 *               video:
 *                 type: string
 *                 description: URL o base64 de un video asociado al mensaje.
 *               gif:
 *                 type: string
 *                 description: URL o base64 de un gif asociado al mensaje.
 *               content:
 *                 type: string
 *                 description: Tipo del mensaje.
 *     responses:
 *       201:
 *         description: Mensaje creado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje indicando que el mensaje se ha creado exitosamente.
 *                 newMessage:
 *                   type: object
 *                   description: Detalles del nuevo mensaje creado.
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
 *                   description: Mensaje de error del servidor.
*/
chatsRouter.post("/chat", MessageController.create);


/**
 * @openapi
 * /api/chats/chat/{id}:
 *   put:
 *     tags:
 *       - Chats
 *     summary: Edita un mensaje específico en el chat del usuario actual.
 *     description: Edita un mensaje existente en el chat del usuario autenticado.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del mensaje que se va a editar.
 *     requestBody:
 *       description: Datos del mensaje a editar.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *                 description: Nuevo contenido de texto del mensaje.
 *               image:
 *                 type: string
 *                 description: Nueva URL o base64 de una imagen asociada al mensaje.
 *               video:
 *                 type: string
 *                 description: Nueva URL o base64 de un video asociado al mensaje.
 *               gif:
 *                 type: string
 *                 description: Nueva URL o base64 de un gif asociado al mensaje.
 *               content:
 *                 type: string
 *                 enum: [text, image, video, gif]
 *                 description: Tipo del mensaje. Puede ser 'text', 'image', 'video' o 'gif'.
 *     responses:
 *       201:
 *         description: Mensaje editado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje indicando que la edición se ha realizado exitosamente.
 *                 newMessage:
 *                   type: object
 *                   description: Detalles del mensaje editado.
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
 *         description: El mensaje no existe en el chat.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error indicando que el mensaje no existe en el chat.
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
chatsRouter.put("/chat/:id", MessageController.editMessage)

module.exports = chatsRouter;
