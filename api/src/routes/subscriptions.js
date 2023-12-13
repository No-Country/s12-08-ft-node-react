const express = require("express");
const subscriptionsRouter = express.Router();
const { SubscriptionController } = require("../controllers/subscriptions.controller");


/**
 * @openapi
 * /api/subscriptions/info/{id}:
 *  get:
 *    tags:
 *      - Subscriptions
 *    summary: Obtiene la información de las suscripciones de un usuario.
 *    description: Obtiene los detalles de las suscripciones de un usuario según el ID proporcionado.
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: ID del usuario para el que se desea obtener la información de las suscripciones.
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Detalles de las suscripciones del usuario encontrados exitosamente.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                userSubscriptions:
 *                  type: array
 *                  description: Detalles de las suscripciones del usuario.
 *                  items:
 *                    type: object
 *                    properties:
 *                      id:
 *                        type: string
 *                        description: ID de la suscripción.
 *                      user_id:
 *                        type: string
 *                        description: ID del usuario.
 *                      beneficiary_id:
 *                        type: string
 *                        description: ID del beneficiario del usuario.
 *                      start_date:
 *                        type: string
 *                        description: Fecha de inicio de la suscripción.
 *                      end_date:
 *                        type: string
 *                        description: Fecha de finalización de la suscripción.
 *                      status:
 *                        type: boolean
 *                        description: Estado de la suscripción (activo o inactivo).
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
 *        description: El usuario no tiene suscripciones o el usuario no existe.
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

subscriptionsRouter.get("/info/:id", SubscriptionController.infoSubs);

module.exports = subscriptionsRouter;
