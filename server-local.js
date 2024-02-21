// app.js

const app = require("./express/server");
const path = require("path");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

const titles = {
  home: "PAAL AI | Create and Integrate Advanced Crypto & AI Bots",
};

app.get("/", (req, res) => {
  res.render("pages/home", {
    title: titles["home"],
    cap: 101414052,
    volume: 20000000
  });
});

app.get("*", (req, res) => {
  res.redirect("/");
});


module.exports = app;
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});