// api/cron.js
const cron = require('node-cron');

// Define the cron job
cron.schedule('* * * * *', () => {
  console.log('Cron job executed at every minutos!');
});
