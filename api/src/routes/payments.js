const express = require("express");
const paymentsRouter = express.Router();
const { PaymentController } = require("../controllers/payments.controller");
const { checkSession } = require("../middlewares/session/session");

paymentsRouter.use(checkSession)
/**
 * @openapi
 * /api/payments/subscribe/{id}:
 *   post:
 *     tags:
 *       - Subscriptions
 *     summary: Crear suscripción utilizando Stripe.
 *     description: Crea una nueva suscripción utilizando Stripe para el usuario autenticado.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del chat al que se suscribirá el usuario.
 *     requestBody:
 *       description: Datos para crear una suscripción utilizando Stripe.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               suscriber_id:
 *                 type: string
 *                 description: ID del suscriptor (JWT token).
 *                 required: true
 *               chat_id:
 *                 type: string
 *                 description: ID del chat al que se suscribirá el usuario (params).
 *                 required: true
 *     responses:
 *       201:
 *         description: Sesión de pago creada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje indicando que la sesión de pago se ha creado exitosamente.
 *                 session:
 *                   type: object
 *                   description: Detalles de la sesión de pago creada.
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
 *         description: El usuario o chat no existe.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error indicando que el usuario o chat no existe.
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


paymentsRouter.post("/subscribe/:id", PaymentController.createSubscriptionStripe);

module.exports = paymentsRouter;
