const jobsController = {
    mainJob: async (request, res) => {
        try {
            const authHeader = request.headers.get('Authorization');

            if (!authHeader || authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
                return res.status(401).json({ error: 'Unauthorized' });
            }
            const data = `Hello Cron Job, Data: ${new Date()}`;
            console.error(data);
            return res.status(200).json({ success: true, data: data });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

module.exports = jobsController;
