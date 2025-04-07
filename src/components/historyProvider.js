import { resolutionGap } from "@/utils";

const api_root = "https://api.safubit.com/api/ohlc/klines";
const history = {};

export const RESOLUTION_VALUE = {
  1: "1m",
  3: "3m",
  5: "5m",
  15: "15m",
  30: "30m",
  60: "1h",
  120: "2h",
  240: "4h",
  360: "6h",
  480: "8h",
  720: "12h",
  "1W": "1w", // 1 minggu
  "3D": "3d", // 3 hari
  "1M": "1M", // 1 bulan
  "30M": "30M",
  "1D": "1d",
  // ... existing code ...
};

export default {
  getBars: async function (
    symbolInfo,
    resolution,
    from,
    to,
    first,
    limit,
    symbol,
    ht,
    poolId
  ) {
    // console.log("getBars called with:", {
    //   symbolInfo,
    //   resolution,
    //   from,
    //   to,
    //   first,
    //   limit,
    //   symbol,
    //   ht,
    //   poolId,
    // }); // Log parameters

    const url = `${api_root}?symbol=${encodeURIComponent(
      symbol
    )}-${encodeURIComponent(
      ht
    )}&limit=${limit}&interval=${resolution}&extra_key=SAFUPUMP-${poolId}`;
    // console.log("Fetching data from URL:", url); // Log URL

    try {
      const response = await fetch(url);
      const data = await response.json();

      // console.log("Data received from API:", data); // Log data received

      const bars = data.map((bar) => ({
        time: bar[0],
        open: parseFloat(bar[1]),
        high: parseFloat(bar[2]),
        low: parseFloat(bar[3]),
        close: parseFloat(bar[4]),
        volume: parseFloat(bar[5]),
      }));

      // console.log("Processed bars:", bars); // Log processed bars

      if (first) {
        const lastBar = bars[bars.length - 1];
        history[symbolInfo.name] = { lastBar };
      }

      return bars;
    } catch (error) {
      console.error("Error fetching data:", error); // Log fetch error
      return [];
    }
  },
};
