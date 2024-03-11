const jobsController = {
    getJob: async (req, res) => {
        try {
            if (req.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
                return res.status(401).end('Unauthorized');
            }

            res.status(200).end('Hello Cron!');

        } catch (error) {
            res.status(500).end(`Error: ${error}`);
        }
    }

}

module.exports = jobsController
