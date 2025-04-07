import { useEffect } from "react";
import loadScript from "../utils/loadScript";
import historyProvider from "./historyProvider";

const supportedResolutions = [
  "1",
  "5",
  "10",
  "15",
  "30",
  "60",
  "120",
  "180",
  "240",
  "360",
  "480",
  "720",
  "1440",
  "3D",
  "1W",
  "1M",
];

export const RESOLUTION_VALUE = {
  1: "1m",
  5: "5m",
  10: "10m",
  15: "15m",
  30: "30m",
  60: "1h",
  120: "2h",
  180: "3h",
  240: "4h",
  360: "6h",
  480: "8h",
  720: "12h",
  1440: "24h",
  4320: "3d",
  10080: "1w",
  43200: "1M",
};

const config = {
  supported_resolutions: supportedResolutions,
};

class Datafeed {
  constructor(symbol, ht, poolId, theme) {
    this.symbol = symbol;
    this.ht = ht;
    this.poolId = poolId;
    this.theme = theme;

    // console.log(symbol, ht, poolId, theme);

    this.realPairs = new Map();
    this.syntheticPairs = new Map();
    this.subscribeUIDs = new Map();
    this.socket = new WebSocket("wss://stream.binance.com:9443/ws");
    this.stackOfCallbacks = {};

    this.socket.onopen = () => {
      console.log("WebSocket connection opened.");
    };

    this.socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    this.socket.onclose = () => {
      console.log("WebSocket connection closed.");
    };

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data && data.s && data.k && data.k.i) {
        const stream = `${data.s.toLowerCase()}@kline_${data.k.i}`;

        if (this.stackOfCallbacks[stream]) {
          this.stackOfCallbacks[stream](data);
        } else {
          console.error("No callback registered for stream:", stream);
        }
      } else {
        console.error("Required data is missing in the message:", data);
      }
    };
  }

  onReady(cb) {
    console.log("=====onReady running");
    setTimeout(() => cb(config), 0);
  }

  searchSymbols(userInput, exchange, symbolType, onResultReadyCallback) {
    console.log("====Search Symbols running");
  }

  resolveSymbol(symbolName, onSymbolResolvedCallback, onResolveErrorCallback) {
    console.log("======resolveSymbol running");
    const symbol_stub = {
      name: symbolName,
      description: "",
      type: "crypto",
      session: "24x7",
      ticker: symbolName,
      minmov: 1,
      pricescale: 1000000000000000,
      has_intraday: true,
      has_seconds: true,
      has_weekly_and_monthly: true,
      seconds_multipliers: ["1S", "5S", "15S"],
      supported_resolution: supportedResolutions,
      volume_precision: 18,
      exchange: "SAFUPUMP",
      // data_status: "streaming",
    };

    setTimeout(function () {
      onSymbolResolvedCallback(symbol_stub);
      // console.log("Resolving that symbol....", symbol_stub);
    }, 0);
  }

  getBars(
    symbolInfo,
    resolution,
    { from, countBack, to, firstDataRequest },
    onHistoryCallback,
    onErrorCallback
  ) {
    // console.log("=====getBars running with:", {
    //   symbolInfo,
    //   resolution,
    //   from,
    //   to,
    //   firstDataRequest,
    //   countBack,
    // }); // Log parameters

    // Batasi jumlah permintaan
    if (!firstDataRequest) {
      console.log(
        "Skipping getBars request as it's not the first data request"
      );
      onHistoryCallback([], { noData: true });
      return;
    }

    historyProvider
      .getBars(
        symbolInfo,
        resolution,
        from,
        to,
        firstDataRequest,
        countBack,
        this.symbol,
        this.ht,
        this.poolId
      )
      .then((bars) => {
        // console.log("Bars received:", bars); // Log bars received
        if (bars.length) {
          onHistoryCallback(bars, { noData: false });
        } else {
          onHistoryCallback(bars, { noData: true });
        }
      })
      .catch((err) => {
        console.log({ err });
        onErrorCallback(err);
      });
  }

  subscribeBars(
    symbolInfo,
    resolution,
    onRealtimeCallback,
    subscribeUID,
    onResetCacheNeededCallback
  ) {
    const stream = `${symbolInfo.name.toLowerCase()}@kline_${
      RESOLUTION_VALUE[resolution]
    }`;
    this.stackOfCallbacks[stream] = (data) => {
      const newBar = {
        time: new Date(data.k.t).getTime(),
        open: parseFloat(data.k.o),
        high: parseFloat(data.k.h),
        low: parseFloat(data.k.l),
        close: parseFloat(data.k.c),
        volume: parseFloat(data.k.v),
      };
      onRealtimeCallback(newBar);
    };
    this.subscribeUIDs.set(subscribeUID, stream);
    this.socket.send(
      JSON.stringify({
        method: "SUBSCRIBE",
        params: [stream],
        id: Math.floor(Math.random() * 100000),
      })
    );
  }

  unsubscribeBars(subscriberUID) {
    const stream = this.subscribeUIDs.get(subscriberUID);
    if (stream) {
      const requestId = Math.floor(Math.random() * 100000);
      this.socket.send(
        JSON.stringify({
          method: "UNSUBSCRIBE",
          params: [stream],
          id: requestId,
        })
      );
      this.subscribeUIDs.delete(subscriberUID);
      delete this.stackOfCallbacks[stream];
    }
  }

  calculateHistoryDepth(resolution, resolutionBack, intervalBack) {
    console.log("=====calculateHistoryDepth running");
    return resolution < 60
      ? { resolutionBack: "D", intervalBack: "1" }
      : undefined;
  }

  getMarks(symbolInfo, startDate, endDate, onDataCallback, resolution) {
    console.log("=====getMarks running");
  }

  getTimeScaleMarks(
    symbolInfo,
    startDate,
    endDate,
    onDataCallback,
    resolution
  ) {
    console.log("=====getTimeScaleMarks running");
  }

  getServerTime(cb) {
    console.log("=====getServerTime running");
  }
}

const TradingViewChart = ({ symbol, ht, poolId, theme }) => {
  useEffect(() => {
    const setupTradingView = async () => {
      const datafeed = new Datafeed(symbol, ht, poolId, theme);

      const widget = new window.TradingView.widget({
        symbol: `${symbol}-${ht}`,
        interval: "30",
        exchange: "SAFUPUMP",
        container: "tv_chart_container",
        library_path: "/charting_library/charting_library/",
        locale: "en",
        volume_precision: 10,
        timezone: "UTC",
        datafeed: datafeed,
        autosize: true,
        theme: theme === "dark" ? "Dark" : "Dark",
        disabled_features: ["use_localstorage_for_settings", "study_templates"],
        enabled_features: ["seconds_resolution"],
        studies_overrides: {
          "volume.volume": {
            visible: true,
          },
        },
      });

      let positionLine = null;
      let positionLineRed = null;

      widget.onChartReady(() => {
        datafeed.subscribeBars(
          {
            name: `${symbol}-${ht}`,
          },
          "30",
          (newBar) => {
            const adjustedPrice = newBar.close * 1.02;
            const adjustedPriceRed = newBar.close * 0.98;
            if (!positionLine) {
              positionLine = widget
                .chart()
                .createPositionLine()
                .setText("2%")
                .setBodyBackgroundColor("#03A66D")
                .setBodyBorderColor("rgba(12, 181, 91, 0.8)")
                .setBodyTextColor("rgba(255, 255, 255, 1)")
                .setQuantity("")
                .setLineColor("green")
                .setLineLength(3);
            }
            if (!positionLineRed) {
              positionLineRed = widget
                .chart()
                .createPositionLine()
                .setText("-2%")
                .setBodyBackgroundColor("rgba(255, 0, 0, 0.8)")
                .setBodyBorderColor("rgba(255, 0, 0, 0.8)")
                .setBodyTextColor("rgba(255, 255, 255, 1)")
                .setQuantity("")
                .setLineColor("red")
                .setLineLength(3);
            }
            positionLine.setPrice(adjustedPrice);
            positionLineRed.setPrice(adjustedPriceRed);
          },
          "uniqueId",
          () => console.log("Reset cache needed")
        );
      });
    };

    Promise.all([
      loadScript(
        "/charting_library/charting_library/charting_library.standalone.js",
        "tradingview-library"
      ),
      loadScript(
        "/charting_library/datafeeds/udf/dist/polyfills.js",
        "datafeeds-polyfills"
      ),
      loadScript(
        "/charting_library/datafeeds/udf/dist/bundle.js",
        "datafeeds-bundle"
      ),
    ])
      .then(setupTradingView)
      .catch((error) => console.error("Script loading failed:", error));
  }, [symbol, ht, poolId, theme]);

  return (
    <div id="tv_chart_container" style={{ height: "500px", width: "100%" }} />
  );
};

export default TradingViewChart;
