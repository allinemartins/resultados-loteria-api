// cronJobs.js
const jobsController = require('../controllers/jobs.controller');

const mockRequest = {
  headers: {
    authorization: `Bearer ${process.env.CRON_SECRET}`,
  },
};

const mockResponse = {
  status: function (statusCode) {
    this.statusCode = statusCode;
    return this;
  },
  json: function (data) {
    console.log(data);
  },
};

jobsController.mainJob(mockRequest, mockResponse);
