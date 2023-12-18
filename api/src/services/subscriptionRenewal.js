const cron = require('node-cron');
const { Subscription } = require('../database/sql/subscriptions.model');

async function obtenerSuscripcionesVencidas() {
    try {
        await Subscription.update({ status: false }, {
            where: {
                status: true,
                end_date: { [Sequelize.Op.lt]: new Date() },
            },
        });

    } catch (error) {
        console.error('Error al desactivar las suscripciones vencidas:', error);
        next(error)
    }
}

cron.schedule('* * * * *', () => {
    console.log('Ejecutando tarea diaria para desactivar suscripciones vencidas...');
    obtenerSuscripcionesVencidas();
});

