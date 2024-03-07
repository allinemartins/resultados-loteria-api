const express = require("express");
const app = express();

require('dotenv').config();

app.use(express.json());


const gamesRouter = require('./routes/games.router')

app.use("/api/lottery-results/games", gamesRouter);

app.listen(process.env.PORT, () => console.log(`Server is running on port ${process.env.PORT}`));