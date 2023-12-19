const { Subscription } = require('../db');
const { Sequelize } = require("sequelize");

async function obtenerSuscripcionesVencidas() {
    try {
        const suscripcionesVencidas = await Subscription.findAll({
            where: {
                status: true,
                end_date: { [Sequelize.Op.lt]: new Date() },
            },
        });

        await Promise.all(suscripcionesVencidas.map(async (suscripcion) => {
            await suscripcion.update({ status: false });
        }));

    } catch (error) {
        console.error('Error al desactivar las suscripciones vencidas:', error);
    }
}


module.exports = {obtenerSuscripcionesVencidas};