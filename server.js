const coin = require("./functionsCoin");
const socket = require("./index");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require("body-parser");
const cors = require("cors");
app.use(bodyParser.json());
app.use(cors());
coin.startGame();
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Welcome to coin dice game!");
});

app.post("/api/v1/coin", (req, res) => {
  try {
    //  const {amt,side,userId} = req.body;
    const isbettingAccepted = coin.acceptBetting(req.body);
    if (!isbettingAccepted) return res.status(401).json("Betting time is off");
    res.status(201).json(req.body);
  } catch (err) {
    res.status(404).json(err);
  }
});
// app.post("/api/v1/");

app.listen(port, () => {
  console.log(`REST End point app listening on port ${port}`);
});
