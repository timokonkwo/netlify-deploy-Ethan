// netlify-functions/home.js

const fetch = require("node-fetch");
const UAParser = require("ua-parser-js");

exports.handler = async (event, context) => {
  const ua = UAParser(event.headers["user-agent"]);
  const isPhone = ua.device.type === "mobile";
  const isTablet = ua.device.type === "tablet";
  const isDesktop = ua.device.type === undefined;
  const isDev = process.env.NODE_ENV !== "production";

  let cap;
  let volume;

  try {
    const fetched = await fetch(
      "https://api.coingecko.com/api/v3/coins/paal-ai"
    );
    const data = await fetched.json();
    cap = data.market_data.fully_diluted_valuation.usd;
    volume = data.market_data.total_volume.usd;
  } catch {
    cap = 101414052;
    volume = 20000000;
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      isPhone,
      isTablet,
      isDesktop,
      isDev,
      cap,
      volume,
    }),
  };
};
