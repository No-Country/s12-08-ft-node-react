const express = require("express");
const commentsRouter = express.Router();
const { CommentController } = require("../controllers/comments.controller");
const { checkSession } = require("../middlewares/session/session");

//commentsRouter.get("/", CommentController.example);

commentsRouter.use(checkSession)

commentsRouter.delete("/:id", CommentController.delete);
commentsRouter.put("/:id", CommentController.editComment);
/**
 * @openapi
 * /api/comments/reaction/{commentId}:
 *   put:
 *     tags:
 *       - Comments
 *     summary: Modifica la reacción de un comentario.
 *     description: Modifica la reacción de un comentario específico.
 *     parameters:
 *       - name: commentId
 *         in: path
 *         required: true
 *         description: ID del comentario a modificar.
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
 *                 updatedComment:
 *                   type: object
 *                   description: Detalles del comentario actualizado.
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
 *         description: Comentario no encontrado.
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
commentsRouter.put("/reaction/:commentId", CommentController.putReactionComm);

module.exports = commentsRouter;
