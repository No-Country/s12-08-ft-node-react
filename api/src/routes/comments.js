const express = require("express");
const commentsRouter = express.Router();
const { CommentController } = require("../controllers/comments.controller");
const { checkSession } = require("../middlewares/session/session");

//commentsRouter.get("/", CommentController.example);

commentsRouter.use(checkSession)


/**
 * @openapi
 * /api/comments/{id}:
 *   delete:
 *     tags:
 *       - Comments
 *     summary: Elimina un comentario específico.
 *     description: Elimina un comentario específico del usuario autenticado.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del comentario que se va a eliminar.
 *     responses:
 *       201:
 *         description: Comentario eliminado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje indicando que la eliminación se ha realizado exitosamente.
 *                 comment:
 *                   type: object
 *                   description: Detalles del comentario eliminado.
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
 *         description: No autorizado para eliminar el comentario.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error indicando que no estás autorizado para eliminar el comentario.
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
commentsRouter.delete("/:id", CommentController.delete);


/**
 * @openapi
 * /api/comments/{id}:
 *   put:
 *     tags:
 *       - Comments
 *     summary: Edita un comentario específico.
 *     description: Edita un comentario específico del usuario autenticado.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del comentario que se va a editar.
 *     requestBody:
 *       description: Datos del comentario a editar.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 enum: [image, video, text, gif]
 *                 description: Tipo de contenido del comentario. Puede ser 'image', 'video', 'text' o 'gif'.
 *               text:
 *                 type: string
 *                 description: Nuevo contenido de texto del comentario (requerido si el contenido es 'text').
 *               image:
 *                 type: string
 *                 description: Nueva URL o base64 de una imagen asociada al comentario (requerido si el contenido es 'image').
 *               video:
 *                 type: string
 *                 description: Nueva URL o base64 de un video asociado al comentario (requerido si el contenido es 'video').
 *               gif:
 *                 type: string
 *                 description: Nueva URL o base64 de un gif asociado al comentario (requerido si el contenido es 'gif').
 *     responses:
 *       201:
 *         description: Comentario editado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje indicando que la edición se ha realizado exitosamente.
 *                 comment:
 *                   type: object
 *                   description: Detalles del comentario editado.
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
 *         description: No autorizado para editar el comentario.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error indicando que no estás autorizado para editar el comentario.
 *       404:
 *         description: El comentario no existe.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error indicando que el comentario no existe.
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
commentsRouter.put("/:id", CommentController.editComment);

/**
 * @openapi
 * /api/comments/reaction/{commentId}:
 *   put:
 *     tags:
 *       - Comments
 *     summary: Actualiza la reacción de un comentario.
 *     description: Actualiza la reacción de un comentario específico del usuario autenticado.
 *     parameters:
 *       - in: path
 *         name: commentId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del comentario que se va a actualizar la reacción.
 *     requestBody:
 *       description: Datos para actualizar la reacción del comentario.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reaction:
 *                 type: string
 *                 description: Nueva reacción del usuario al comentario.
 *                 enum: [love, sad, fun, interesting]
 *                 required: true
 *     responses:
 *       200:
 *         description: Reacción actualizada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje indicando que la actualización se ha realizado exitosamente.
 *                 updatedComment:
 *                   type: object
 *                   description: Detalles del comentario actualizado con las reacciones.
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
 *         description: El comentario no existe.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error indicando que el comentario no existe.
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
commentsRouter.put("/reaction/:commentId", CommentController.putReactionComm);
/**
 * @openapi
 * /api/comments/byMessage/{id}:
 *   get:
 *     tags:
 *       - Comments
 *     summary: Obtiene los comentarios de un chat especifico.
 *     description: Obtiene los comentarios de un mensaje especifico sin incluir el primero.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del mensaje.
 *       - in: query
 *         name: page
 *         description: Pagina con cantidad de comentarios (cada 10) del mensajes.
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Comentarios obtenido exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 comments:
 *                   type: object
 *                   description: Comentarios ascociados al mensaje.
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
commentsRouter.get("/byMessage/:id", CommentController.getByChat);

module.exports = commentsRouter;
