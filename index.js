// app.js

const express = require("express");
const path = require("path");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

const titles = {
  home: "PAAL AI | Create and Integrate Advanced Crypto & AI Bots",
};

app.get("/", (req, res) => {
  res.render("pages/home", {
    title: titles["home"],
  });
});

app.get("*", (req, res) => {
  res.redirect("/");
});

module.exports = app;
