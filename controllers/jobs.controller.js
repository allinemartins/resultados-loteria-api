const gamesServices = require('./../services/games.services');
const statisticalServices = require('./../services/statistical.services');

const jobsController = {
    mainJob: async (request, response) => {
        try {
            const authHeader = request.headers['authorization'];

            if (!authHeader || authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
                return response.status(401).json({ error: 'Unauthorized' });
            }

            const gservives = new gamesServices();
            const data = await gservives.getDraws();
            //console.log(`Hello Cron Job, Data: ${new Date()}`);            
            return response.status(200).json({ success: true, data: data });
        } catch (error) {
            //console.error(error);
            return response.status(500).json({ error: 'Internal Server Error' });
        }
    },

    generationStatisticals: async (request, response) => {
        try {
            const authHeader = request.headers['authorization'];

            if (!authHeader || authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
                return response.status(401).json({ error: 'Unauthorized' });
            }

            const gservives = new gamesServices();
            const data = await gservives.getStatistical();
            console.log(`Hello Cron Job Statistical, Data: ${new Date()}`);            
            
            return response.status(200).json({ success: true, data: data });
        } catch (error) {
            console.error(error);
            return response.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

module.exports = jobsController;
