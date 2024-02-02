// netlify-functions/home.ts

import { Handler } from "@netlify/functions";
import fetch from "node-fetch";
import UAParser from "ua-parser-js";

interface CoinData {
  market_data: {
    fully_diluted_valuation: { usd: number };
    total_volume: { usd: number };
  };
}

interface UserAgentData {
  device: {
    type: string | undefined;
  };
}

interface NetlifyEvent {
  headers: {
    "user-agent": string;
  };
}

interface NetlifyContext {
  [key: string]: any;
}

const handler: Handler = async (
  event: NetlifyEvent,
  context: NetlifyContext
) => {
  const ua: UserAgentData = UAParser(event.headers["user-agent"]);
  const isPhone: boolean = ua.device.type === "mobile";
  const isTablet: boolean = ua.device.type === "tablet";
  const isDesktop: boolean = ua.device.type === undefined;
  const isDev: boolean = process.env.NODE_ENV !== "production";

  let cap: number;
  let volume: number;

  try {
    const fetched = await fetch(
      "https://api.coingecko.com/api/v3/coins/paal-ai"
    );
    const data: CoinData = await fetched.json();

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

export { handler };
