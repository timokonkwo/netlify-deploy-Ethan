const express = require("express")
const path = require("path")
const app = express()
const port = process.env.port || 3000
const UAParser = require("ua-parser-js")

/* parcel bundler */
const Bundler = require("parcel-bundler")
if (process.env.NODE_ENV !== "production") {
  const file = ["app/index.ts", "styles/index.scss"]
  const options = {
    outDir: "./public",
    production: process.argv[2] === "build" ? true : false,
  }
  const bundler = new Bundler(file, options)
  app.use(bundler.middleware())
}

/* ua-parser */
const ua = function (req, res, next) {
  const ua = UAParser(req.headers["user-agent"])
  res.locals.isPhone = ua.device.type === "mobile"
  res.locals.isTablet = ua.device.type === "tablet"
  res.locals.isDesktop = ua.device.type === undefined
  res.locals.isDev = process.env.NODE_ENV !== "production"
  next()
}

app.use(express.static(path.join(__dirname, "public")))
app.use(ua)
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "pug")

const titles = {
  home: "PAAL AI | Create and Integrate Advanced Crypto & AI Bots",
}

app.get("/", async (req, res) => {
  let cap
  let volume
  try {
    const fetched = await fetch(
      "https://api.coingecko.com/api/v3/coins/paal-ai"
    )
    const data = await fetched.json()
    cap = data.market_data.fully_diluted_valuation.usd
    volume = data.market_data.total_volume.usd
  } catch {
    cap = 101414052
    volume = 20000000
  }
  res.render("pages/home", {
    title: titles["home"],
    cap,
    volume,
  })
})

app.get("*", async (req, res) => {
  res.redirect("/")
})

app.listen(port, () => {
  console.log(
    `\x1b[32m Server listening at\x1b[0m`,
    `\x1b[4mhttp://localhost:${port}\x1b[0m`
  )
})

module.exports = app
