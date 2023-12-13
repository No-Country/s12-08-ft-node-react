const express = require("express");
const chatsRouter = express.Router();
const { MessageController } = require("../controllers/messages.controller");
const { CommentController } = require("../controllers/comments.controller")
const { ChatController } = require("../controllers/chats.controller")
const { checkSession } = require("../middlewares/session/session");


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
 *         description: Mensaje creado exitosamente. Y io.emit del mensaje creado
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
 *              user_photo: 
 *                 type: string
 *                 description: Foto de la persona creadora del comentario
 *              username:
 *                 type: string
 *                 description: Nombre de usuario, de la persona creadora del comentario
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

/**
 * @openapi
 * /api/chats:
 *   put:
 *     tags:
 *       - Chats
 *     summary: Edita la información del chat del usuario actual.
 *     description: Edita la información existente en el chat del usuario autenticado.
 *     requestBody:
 *       description: Datos del chat a editar.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nuevo nombre del chat (opcional).
 *               description:
 *                 type: string
 *                 description: Nueva descripción del chat (opcional).
 *               img:
 *                 type: string
 *                 description: base64 en Data URI de una imagen asociada al chat (opcional).
 *     responses:
 *       201:
 *         description: Chat editado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje indicando que la edición se ha realizado exitosamente.
 *                 newChat:
 *                   type: object
 *                   description: Detalles del chat editado.
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
chatsRouter.put("/", ChatController.editChat)


/**
 * @openapi
 * /api/chats/chat/{id}:
 *   get:
 *     tags:
 *       - Chats
 *     summary: Obtiene un chat específico con sus mensajes y comentarios asociados.
 *     description: Obtiene un chat existente con sus mensajes y comentarios asociados para el usuario autenticado.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del chat que se va a obtener.
 *       - in: query
 *         name: page
 *         description: Pagina con cantidad de mensajes (cada 20) del usuario.
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Chat obtenido exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   description: Detalles del usuario asociado al chat.
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: ID del usuario.
 *                     name:
 *                       type: string
 *                       description: Nombre del usuario.
 *                     username:
 *                       type: string
 *                       description: Nombre de usuario del usuario.
 *                     profile_picture:
 *                       type: string
 *                       description: URL o base64 de la imagen de perfil del usuario.
 *                 chat:
 *                   type: object
 *                   description: Detalles del chat obtenido con sus mensajes y comentarios asociados.
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
chatsRouter.get("/chat/:id", ChatController.getChatWithMessages)

module.exports = chatsRouter;
