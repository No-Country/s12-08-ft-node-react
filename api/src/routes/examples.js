const express = require("express");
const examplesRouter = express.Router();
const {checkSession} = require('../middlewares/session/session')
const { ExampleController } = require("../controllers/examples.controller");

/**
 * @openapi
 * /api/examples:
 *   get:
 *     tags:
 *       - Examples
 *     summary: Obtiene un ejemplo.
 *     description: Obtiene un ejemplo.
 *     responses:
 *       200:
 *         description: Ejemplo obtenido con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       500:
 *         description: Error del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
*/
examplesRouter.get("/", ExampleController.example);

module.exports = examplesRouter;
