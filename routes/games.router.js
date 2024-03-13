const express = require("express")
const router = express.Router()

const gamesController = require('../controllers/games.controller')

router.get("/games", gamesController.getAllGames);
router.get("/games/:game", gamesController.getAllGameDraws);
router.get("/statistical/:game", gamesController.getStatisticalGame);

module.exports = router