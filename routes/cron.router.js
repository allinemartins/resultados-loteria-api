const express = require("express")
const router = express.Router()

const jobs = require('../controllers/jobs.controller');

router.get("/", jobs.getJob);

module.exports = router