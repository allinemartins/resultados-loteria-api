const gamesServices = require('./../services/games.services');

const jobsController = {
    mainJob: async (request, res) => {
        try {
            const authHeader = request.headers['authorization'];

            if (!authHeader || authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
                return res.status(401).json({ error: 'Unauthorized' });
            }

            const gservives = new gamesServices();
            const data = await gservives.getDraws();
            console.log(`Hello Cron Job, Data: ${new Date()}`);            
            return res.status(200).json({ success: true, data: data });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        } finally {
            process.exit(); // Exit the script
        }
    }
}

module.exports = jobsController;
