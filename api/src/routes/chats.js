const express = require("express");
const chatsRouter = express.Router();
const { MessageController } = require("../controllers/messages.controller");
const { CommentController } = require("../controllers/comments.controller")
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
 * /api/chats/chat/{id}/comment:
 *   post:
 *     tags:
 *       - Chats
 *     summary: Crea un nuevo comentario en un mensaje específico del chat del usuario actual.
 *     description: Crea un comentario con el contenido proporcionado y lo agrega al mensaje especificado en el chat del usuario autenticado.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del mensaje al que se agregará el comentario.
 *     requestBody:
 *       description: Datos del comentario a crear.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *                 description: Contenido de texto del comentario.
 *               image:
 *                 type: string
 *                 description: URL o base64 de una imagen asociada al comentario.
 *               video:
 *                 type: string
 *                 description: URL o base64 de un video asociado al comentario.
 *               gif:
 *                 type: string
 *                 description: URL o base64 de un gif asociado al comentario.
 *               content:
 *                 type: string
 *                 enum: [text, image, video, gif]
 *                 description: Tipo del comentario. Puede ser 'text', 'image', 'video' o 'gif'.
 *     responses:
 *       201:
 *         description: Comentario creado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje indicando que el comentario se ha creado exitosamente.
 *                 comment:
 *                   type: object
 *                   description: Detalles del nuevo comentario creado.
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
chatsRouter.post("/chat/:id/comment" , CommentController.create)

module.exports = chatsRouter;
