const express = require("express")
const router = express.Router()

const jobsController = require('../controllers/jobs.controller')

router.get("/", jobsController.mainJob);

module.exports = router