const express = require("express")
const router = express.Router()

const gamesController = require('../controllers/games.controller')

router.get("/", gamesController.getAllGames);
router.get("/:game", gamesController.getAllGameDraws);

module.exports = router